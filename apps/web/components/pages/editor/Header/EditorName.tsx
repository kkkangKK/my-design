"use client";

import { useWorkStore } from "@/stores/work";

interface EditorNameProps {
  className?: string;
}

const EditorName: React.FC<EditorNameProps> = () => {
  const { workName } = useWorkStore();
  return <div className="w-1/3 flex justify-center text-xl font-bold">作品：{workName}</div>;
};

export default EditorName;
