import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  node: {
    language?: string;
    code: string;
  };
}

const CodeBlock = (props: CodeBlockProps) => {
  const { node } = props;
  if (!node || !node.code) {
    return null;
  }

  return (
    <SyntaxHighlighter language={node.language || 'text'} style={atomDark}>
      {node.code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
