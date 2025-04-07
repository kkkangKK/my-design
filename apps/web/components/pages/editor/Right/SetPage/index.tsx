"use client";

import ColorPicker from "@/components/shared/ColorPicker";
import UploadBackground from "@/components/shared/UploadBackground";
import { UseElementStore } from "@/stores/element";
import { useSocketStore } from "@/stores/socket";
import { useEffect, useRef, useState } from "react";

function SetPage() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [childStyle, setChildStyle] = useState({});
  const { socket } = useSocketStore();

  useEffect(() => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.offsetHeight;
      setChildStyle({ maxHeight: `${parentHeight}px`, overflowY: "auto" });
    }
  }, []);

  const { setPageBackgroundStyle, pageBackgroundStyle } = UseElementStore();

  //上传图片的回调函数
  const handleOssUrl = (url: string) => {
    const pageBackgroundStyle = UseElementStore.getState().pageBackgroundStyle;
    setPageBackgroundStyle({ ...pageBackgroundStyle, backgroundImage: `url(${url})` });
    if (!socket) return;
    socket.emit("deltaUpdate", {
      delta: { url },
      type: "backgroundImgUpdate",
      elements: UseElementStore.getState().Elements,
      pageBackgroundStyle,
    });
  };

  const handleChangeColor = (e: any) => {
    const pageBackgroundStyle = UseElementStore.getState().pageBackgroundStyle;
    setPageBackgroundStyle({ ...pageBackgroundStyle, backgroundColor: e });
    if (!socket) return;
    socket.emit("deltaUpdate", {
      delta: { value: e },
      type: "backgroundColorUpdate",
      elements: UseElementStore.getState().Elements,
      pageBackgroundStyle,
    });
  };

  const handleChangeAdopt = (e: any) => {
    const pageBackgroundStyle = UseElementStore.getState().pageBackgroundStyle;
    setPageBackgroundStyle({ ...pageBackgroundStyle, backgroundSize: e.target.value });
    if (!socket) return;
    socket.emit("deltaUpdate", {
      delta: { value: e.target.value },
      type: "backgroundAdoptUpdate",
      elements: UseElementStore.getState().Elements,
      pageBackgroundStyle,
    });
  };

  return (
    <div
      className="h-full"
      ref={parentRef}
    >
      <div
        style={childStyle}
        className="overflow-x-hidden"
      >
        <div className="py-1 px-6 ">
          <div className="flex justify-between items-center my-4">
            <label
              htmlFor="color"
              className="block mb-1 w-1/3 text-sm text-red-400 font-semibold"
            >
              背景颜色：
            </label>
            <ColorPicker
              toColor={pageBackgroundStyle.backgroundColor}
              changeColor={(e) => handleChangeColor(e)}
            />
          </div>

          <div className="flex justify-between items-center my-4">
            <label
              htmlFor="fontFamily"
              className="block mb-1 w-1/3 text-sm text-red-400 font-semibold"
            >
              适应方式：
            </label>
            <select
              id="fontFamily"
              value={pageBackgroundStyle.backgroundSize}
              onChange={(e) => handleChangeAdopt(e)}
              className="select select-bordered w-2/3"
            >
              <option value={"100% 100%"}>自动填充</option>
              <option value={"cover"}>自动覆盖</option>
              <option value={"contain"}>自动缩放</option>
            </select>
          </div>

          <UploadBackground
            className="mt-8 flex justify-between gap-3 items-center my-4"
            handleOssUrl={handleOssUrl}
            img={pageBackgroundStyle.backgroundImage.replace(/url\(|\)/g, "")}
          />
        </div>
      </div>
    </div>
  );
}

export default SetPage;
