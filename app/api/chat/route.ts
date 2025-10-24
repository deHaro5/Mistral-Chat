import { NextRequest } from "next/server";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

const MISTRAL_URL = "https://api.mistral.ai/v1/chat/completions";
const SSE_HEADERS = {
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
  Connection: "keep-alive",
};

function sseLine(obj: any, event = "chunk") {
  return `event: ${event}\ndata: ${JSON.stringify(obj)}\n\n`;
}

function* extractPieces(payload: any) {
  try {
    const choice = payload?.choices?.[0];
    const content =
      choice?.delta?.content ??
      choice?.message?.content ??
      choice?.content ??
      null;

    if (!content) return;

    if (Array.isArray(content)) {
      for (const c of content) {
        if (c?.type === "thinking") {
          const arr = c?.thinking ?? [];
          for (const t of arr) {
            const txt = t?.text ?? "";
            if (txt) yield { kind: "thinking", text: txt };
          }
        } else if (c?.type === "text" && c?.text) {
          yield { kind: "answer", text: c.text };
        }
      }
    } else if (typeof content === "string") {
      yield { kind: "answer", text: content };
    }
  } catch {
    // ignore unknown chunk shapes
  }
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) return new Response("Missing MISTRAL_API_KEY", { status: 500 });

  const { messages, useReasoning, normalModel } = (await req.json()) as {
    messages: ChatMessage[];
    useReasoning: boolean;
    normalModel?: string;
  };

  const model = useReasoning
    ? "magistral-medium-latest"
    : normalModel || "mistral-small-latest";

  const body: any = {
    model,
    messages,
    stream: true,
  };
  if (useReasoning) {
    body.prompt_mode = "reasoning";
  }

  const upstream = await fetch(MISTRAL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify(body),
  });

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    return new Response(
      `Upstream error ${upstream.status}: ${text || upstream.statusText}`,
      { status: 500 }
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buf = "";

      function write(line: string) {
        controller.enqueue(encoder.encode(line));
      }

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });

          let idx: number;
          while ((idx = buf.indexOf("\n\n")) !== -1) {
            const packet = buf.slice(0, idx).trim();
            buf = buf.slice(idx + 2);

            const dataLine = packet
              .split("\n")
              .find((l) => l.startsWith("data:"));
            if (!dataLine) continue;

            const json = dataLine.replace(/^data:\s*/, "");
            if (json === "[DONE]") {
              write(sseLine({}, "done"));
              controller.close();
              return;
            }

            let payload: any = null;
            try {
              payload = JSON.parse(json);
            } catch {
              continue;
            }

            for (const piece of extractPieces(payload)) {
              write(sseLine(piece, "chunk"));
            }
          }
        }
        write(sseLine({}, "done"));
        controller.close();
      } catch (err: any) {
        write(sseLine({ error: err?.message || "stream error" }, "error"));
        controller.error(err);
      }
    },
  });

  return new Response(stream, { headers: SSE_HEADERS });
}


