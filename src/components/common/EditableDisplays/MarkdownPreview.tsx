import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

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
  const { theme } = useTheme();

  if (global.window?.document && theme) {
    window.document.documentElement.setAttribute('data-color-mode', theme);
  }

  return (
    <ReactMarkdownPreview source={value} className="bg-theme-background" />
  );
};

export default MarkdownPreview;
