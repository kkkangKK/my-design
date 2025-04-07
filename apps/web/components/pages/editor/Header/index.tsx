import BaseLogo from "@/components/base/BaseLogo";

import EditorFeature from "./EditorFeature";
import EditorName from "./EditorName";

interface EditorHeaderProps {}

const EditorHeader: React.FC<EditorHeaderProps> = () => {
  return (
    <header
      id="editor-header"
      className="max-h-[15vh] backdrop-blur-[10px] transition-colors w-full h-16 flex justify-between items-center dark:bg-[#001529] shadow-black/10 dark:shadow-slate-100/20 bg-[linear-gradient(to_right,white_0%,rgba(250,113,113,0.3)_50%,white_100%)] px-8 shadow"
    >
      <BaseLogo
        size="large"
        title="logo"
      />
      <EditorName name="未命名作品" />
      <EditorFeature />
    </header>
  );
};

export default EditorHeader;
