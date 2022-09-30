import dynamic from 'next/dynamic';

import '@uiw/react-markdown-preview/markdown.css';

const ReactMarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview'),
  { ssr: false }
);

interface MarkDownDisplayWrapperProps {
  value: string;
}

const MarkdownPreview = (props: MarkDownDisplayWrapperProps) => {
  const { value } = props;

  if (global.window?.document) {
    window.document.documentElement.setAttribute('data-color-mode', 'light');
  }

  return <ReactMarkdownPreview source={value} />;
};

export default MarkdownPreview;
