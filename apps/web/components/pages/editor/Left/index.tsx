"use client";

import Tab from "@/components/shared/Tab";

import GraphList from "./GraphList";
import ImgList from "./ImgList";
import TextList from "./TextList";

import "@/styles/base/hiddenScroll.css";

import { useTemplate } from "@/hooks/useTemplate";
import { UseElementStore } from "@/stores/element";
import { useSocketStore } from "@/stores/socket";
import { useEffect } from "react";

function Left() {
  const tabs = [
    { id: 0, label: "文本", content: <TextList /> },
    { id: 1, label: "图片", content: <ImgList /> },
    { id: 2, label: "形状", content: <GraphList /> },
  ];

  const { setCurrentElement, addElement, setIsElement } = UseElementStore();
  const { socket } = useSocketStore();
  const isAuthor = useTemplate();

  useEffect(() => {
    if (!socket) {
      console.log("socket is null");
      return;
    } else {
      console.log("socket is connected");
      socket.on("remoteUpdate", (body: any) => {
        if (body.type === "add") {
          addElement(body.delta.element);
          setCurrentElement(body.delta.id);
          setIsElement(true);
        }
      });
    }
  }, [socket]);

  return (
    <div
      id="editor-left"
      className="bg-red-50 w-1/5 overflow-auto hiddenScrollbar"
    >
      {isAuthor && <Tab tabs={tabs} />}
    </div>
  );
}

export default Left;
