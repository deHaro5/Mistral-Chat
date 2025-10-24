// app/components/CodeBlock.tsx
"use client";
import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/light';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';
import cpp from 'react-syntax-highlighter/dist/esm/languages/hljs/cpp';
import csharp from 'react-syntax-highlighter/dist/esm/languages/hljs/csharp';
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import ruby from 'react-syntax-highlighter/dist/esm/languages/hljs/ruby';
import go from 'react-syntax-highlighter/dist/esm/languages/hljs/go';
import rust from 'react-syntax-highlighter/dist/esm/languages/hljs/rust';
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import shell from 'react-syntax-highlighter/dist/esm/languages/hljs/shell';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import scss from 'react-syntax-highlighter/dist/esm/languages/hljs/scss';
import markdown from 'react-syntax-highlighter/dist/esm/languages/hljs/markdown';
import yaml from 'react-syntax-highlighter/dist/esm/languages/hljs/yaml';
import dockerfile from 'react-syntax-highlighter/dist/esm/languages/hljs/dockerfile';
import CopyIcon from './CopyIcon';

// Register common languages
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('c++', cpp);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('c#', csharp);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('ruby', ruby);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('rust', rust);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('sh', shell);
SyntaxHighlighter.registerLanguage('shell', shell);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('xml', xml);
SyntaxHighlighter.registerLanguage('html', xml);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('yml', yaml);
SyntaxHighlighter.registerLanguage('dockerfile', dockerfile);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('py', python);

// Custom theme matching the chat colors (for hljs)
const customTheme = {
  'hljs': {
    display: 'block',
    overflowX: 'auto',
    padding: '1em',
    color: '#e5e5e5',
    background: '#222222',
  },
  'hljs-comment': { color: '#6a9955' },
  'hljs-quote': { color: '#6a9955' },
  'hljs-keyword': { color: '#ff8c42', fontWeight: 'bold' },
  'hljs-selector-tag': { color: '#ff8c42' },
  'hljs-literal': { color: '#ff8c42' },
  'hljs-name': { color: '#ff8c42' },
  'hljs-variable': { color: '#9cdcfe' },
  'hljs-template-variable': { color: '#9cdcfe' },
  'hljs-string': { color: '#ce9178' },
  'hljs-regexp': { color: '#d16969' },
  'hljs-link': { color: '#ce9178' },
  'hljs-title': { color: '#4ec9b0' },
  'hljs-section': { color: '#dcdcaa', fontWeight: 'bold' },
  'hljs-type': { color: '#4ec9b0' },
  'hljs-class': { color: '#4ec9b0' },
  'hljs-number': { color: '#b5cea8' },
  'hljs-tag': { color: '#ff8c42' },
  'hljs-attribute': { color: '#9cdcfe' },
  'hljs-attr': { color: '#9cdcfe' },
  'hljs-built_in': { color: '#4ec9b0' },
  'hljs-builtin-name': { color: '#4ec9b0' },
  'hljs-params': { color: '#9cdcfe' },
  'hljs-meta': { color: '#569cd6' },
  'hljs-function': { color: '#dcdcaa' },
  'hljs-title.function_': { color: '#dcdcaa' },
  'hljs-deletion': { color: '#ce9178' },
  'hljs-addition': { color: '#b5cea8' },
  'hljs-symbol': { color: '#4fc1ff' },
  'hljs-bullet': { color: '#4fc1ff' },
  'hljs-emphasis': { fontStyle: 'italic' },
  'hljs-strong': { fontWeight: 'bold' },
};

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  node?: any;
  [key: string]: any;
}

export default function CodeBlock({ children, className, node, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  // Check if it's inline code by checking if className starts with "language-"
  const isCodeBlock = className && className.startsWith('language-');
  
  // Extract language from className (format: language-xxx)
  const match = /language-(\w+)/.exec(className || '');
  let language = match ? match[1] : '';
  const normalized = (language || '').toLowerCase();
  const isShell = normalized === 'bash' || normalized === 'sh' || normalized === 'shell';
  if (isShell) language = '';
  const highlightLanguage = isShell ? 'bash' : (normalized || 'text');
  
  // Get the text content for copying
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    if (React.isValidElement(node) && node.props.children) {
      return getTextContent(node.props.children);
    }
    return '';
  };
  
  const textContent = getTextContent(children);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // If it's inline code, render without the copy button
  if (!isCodeBlock) {
    return <code className={className} {...props}>{children}</code>;
  }

  // Block code with copy button and syntax highlighting
  return (
    <div className={`code-block-wrapper ${isShell ? 'no-title' : ''}`}>
      <div className="code-block-header">
        {language && <span className="code-language pixel">{language}</span>}
        <button
          className={`code-copy-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          aria-label="Copy code"
          title="Copy code"
        >
          {copied ? (
            <span className="copy-checkmark">✓</span>
          ) : (
            <CopyIcon size={14} />
          )}
        </button>
      </div>
      <div className="code-block-content">
        <SyntaxHighlighter
          language={highlightLanguage}
          style={customTheme}
          customStyle={{
            margin: 0,
            padding: '1em',
            background: '#222222',
            borderRadius: 0,
            fontSize: '13px',
            lineHeight: '1.6',
            maxHeight: 'none',
            height: 'auto',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
            }
          }}
          PreTag="pre"
        >
          {textContent}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

