"use client";

import SetLayer from "@/components/pages/editor/Right/setLayer";
import SetPage from "@/components/pages/editor/Right/SetPage";
import SetProps from "@/components/pages/editor/Right/setProps";
import Tab from "@/components/shared/Tab";
import { UseElementStore } from "@/stores/element";
import { useSocketStore } from "@/stores/socket";
import { useEffect } from "react";

function Right(props: any) {
  const {
    isElement,
    isCurrentLocked,
    updateElement,
    setElements,
    setIsCurrentLocked,
    setPageBackgroundStyle,
  } = UseElementStore();
  const { socket } = useSocketStore();

  const tabs = [
    { id: 0, label: "属性设置", content: isElement && !isCurrentLocked ? <SetProps /> : null },
    { id: 1, label: "图层设置", content: <SetLayer /> },
    { id: 2, label: "页面设置", content: <SetPage /> },
  ];

  useEffect(() => {
    if (!socket) {
      console.log("socket is null");
      return;
    } else {
      console.log("socket is connected");
      socket.on("remoteUpdate", (body: any) => {
        if (body.type === "propsUpdate") {
          updateElement(body.delta.currentElement, body.delta.style, body.delta.textValue);
        }
        if (body.type === "eventUpdate") {
          updateElement(body.delta.currentElement, undefined, undefined, body.delta.url);
        }
        if (body.type === "zIndexUpdate") {
          setElements(body.delta.list);
        }
        if (body.type === "isHiddenUpdate") {
          updateElement(body.delta.id, undefined, undefined, undefined, body.delta.value);
        }
        if (body.type === "isLockedUpdate") {
          setIsCurrentLocked(body.delta.value);
          updateElement(
            body.delta.id,
            undefined,
            undefined,
            undefined,
            undefined,
            body.delta.value,
          );
        }
        if (body.type === "inlineNameUpdate") {
          updateElement(
            body.delta.id,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            body.delta.innerValue,
          );
        }
        if (body.type === "backgroundImgUpdate") {
          const pageBackgroundStyle = UseElementStore.getState().pageBackgroundStyle;
          setPageBackgroundStyle({
            ...pageBackgroundStyle,
            backgroundImage: `url(${body.delta.url})`,
          });
        }
        if (body.type === "backgroundColorUpdate") {
          const pageBackgroundStyle = UseElementStore.getState().pageBackgroundStyle;
          setPageBackgroundStyle({ ...pageBackgroundStyle, backgroundColor: body.delta.value });
        }
        if (body.type === "backgroundAdoptUpdate") {
          const pageBackgroundStyle = UseElementStore.getState().pageBackgroundStyle;
          setPageBackgroundStyle({ ...pageBackgroundStyle, backgroundSize: body.delta.value });
        }
      });
    }
  }, [socket]);

  return (
    <div className="bg-red-50 w-1/5 h-full flex">
      <Tab tabs={tabs} />
    </div>
  );
}

export default Right;
