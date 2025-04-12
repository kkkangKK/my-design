"use client";

import GlobalDrawer from "@/components/layouts/common/GlobalDrawer";
import { useTemplate } from "@/hooks/useTemplate";
import { copyWork } from "@/http/work";
import { cn } from "@/lib/utils";
import { useWorkStore } from "@/stores/work";

import CollaborateDialog from "./CollaborateDialog";
import PreviewDialog from "./PreviewDialog";
import PublishDialog from "./PublishDialog";
import SaveDialog from "./SaveDialog";

interface EditorFeatureProps {
  className?: string;
}

const EditorFeature: React.FC<EditorFeatureProps> = ({ className }) => {
  const { currentWorkId, setWork, setWorkName } = useWorkStore();
  const isAuthor = useTemplate();

  const handleCopy = async () => {
    try {
      if (!currentWorkId) return;
      const res = await copyWork(currentWorkId);
      setWork(res.data.data.workId);
      setWorkName(res.data.data.title);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <nav className={cn("w-1/3 h-full flex items-center justify-end gap-5", className)}>
      {isAuthor && (
        <div className="flex items-center gap-2">
          <CollaborateDialog>
            <button className="cursor-pointer bg-[#f87171] relative items-center justify-center flex gap-2 rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#3D7FFF]/90 text-white h-7 px-3">
              <span className="icon-[carbon--collaborate] text-lg"></span>
              实时协作
            </button>
          </CollaborateDialog>
          <PreviewDialog>
            <button className="cursor-pointer bg-[#f87171] relative items-center justify-center flex gap-2 rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#3D7FFF]/90 text-white h-7 px-3">
              <span className="icon-[carbon--account] text-lg"></span>
              预览
            </button>
          </PreviewDialog>
          <SaveDialog>
            <button className="cursor-pointer bg-[#f87171] relative items-center justify-center flex gap-2 rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#3D7FFF]/90 text-white h-7 px-3">
              <span className="icon-[carbon--save] text-lg"></span>
              保存
            </button>
          </SaveDialog>

          <PublishDialog>
            <button className="cursor-pointer bg-[#f87171] relative items-center justify-center flex gap-2 rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#3D7FFF]/90 text-white h-7 px-3">
              <span className="icon-[carbon--ibm-elo-publishing] text-lg"></span>
              发布
            </button>
          </PublishDialog>
        </div>
      )}

      {!isAuthor && (
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="cursor-pointer bg-[#f87171] relative items-center justify-center flex gap-2 rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#3D7FFF]/90 text-white h-7 px-3"
          >
            <span className="icon-[carbon--document-requirements] text-lg"></span>
            使用模板
          </button>
        </div>
      )}
      <GlobalDrawer className="w-8 h-8" />
    </nav>
  );
};

export default EditorFeature;
