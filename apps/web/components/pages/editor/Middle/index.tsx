"use client";

import BaseTooltips from "@/components/base/BaseTooltip";
import Dialog from "@/components/pages/editor/Middle/Dialog";
import ChangePosition from "@/components/shared/ChangePosition";
import ContextMenu from "@/components/shared/ContextMenu";
import ResizeComponent from "@/components/shared/ResizeComponent";
import useGetScreenRatio from "@/hooks/useGetScreenRatio";
import useHotKey from "@/hooks/useHotKey";
import { getWork } from "@/http/work";
import { UseElementStore } from "@/stores/element";
import { useSocketStore } from "@/stores/socket";
import { useWorkStore } from "@/stores/work";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import SnowBackground from "./SnowBackground";

function Middle(props: any) {
  const {
    Elements,
    setIsElement,
    setPageBackgroundStyle,
    setElements,
    currentElement,
    setCurrentElement,
    pageBackgroundStyle,
    redo,
    undo,
    deleteElement,
    setPastedElement,
    setCopyElement,
    ifRedo,
    ifUndo,
  } = UseElementStore();
  const { currentWorkId, setWorkName } = useWorkStore();
  const { socket } = useSocketStore();

  useHotKey();
  const ratio = useGetScreenRatio();

  const actionItem = [
    {
      hotkey: "ctrl+c",
      text: "复制图层",
      action: () => {
        setCopyElement(currentElement);
        if (!socket) return; //关于这个文件里的图层相关的socket的useEffect已写在useHotKet.ts里了
        socket.emit("deltaUpdate", {
          delta: { currentElement },
          type: "copyElement",
          elements: UseElementStore.getState().Elements,
          pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
        });
      },
    },
    {
      hotkey: "ctrl+v",
      text: "粘贴图层",
      action: () => {
        const id = uuidv4();
        setPastedElement(id);
        if (!socket) return;
        socket.emit("deltaUpdate", {
          delta: { elementId: id },
          type: "pastedElement",
          elements: UseElementStore.getState().Elements,
          pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
        });
      },
    },
    {
      hotkey: "delete",
      text: "删除图层",
      action: () => {
        deleteElement(currentElement);
        if (!socket) return;
        socket.emit("deltaUpdate", {
          delta: { currentElement },
          type: "deleteElement",
          elements: UseElementStore.getState().Elements,
          pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
        });
      },
    },
    {
      hotkey: "esc",
      text: "取消选中",
      action: () => {
        setCurrentElement("");
        if (!socket) return;
        socket.emit("deltaUpdate", {
          delta: null,
          type: "setSelectNull",
          elements: UseElementStore.getState().Elements,
          pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
        });
      },
    },
  ];

  const getTheWork = async () => {
    if (currentWorkId) {
      const res = await getWork(currentWorkId);
      console.log("res", res);
      setWorkName(res.data.data.title);
      setElements(res.data.data.content.Elements ?? []);
      setPageBackgroundStyle({ ...res.data.data.content.pageBackgroundStyle });
    } else {
      setElements([]);
      //设置默认背景样式
      setPageBackgroundStyle({
        backgroundColor: "",
        backgroundImage: ``,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      });
    }
  };

  useEffect(() => {
    getTheWork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickBackground = () => {
    setIsElement(false);
    setCurrentElement("");
    if (!socket) return;
    socket.emit("deltaUpdate", {
      delta: { isClickElement: false },
      type: "clickBackground",
      elements: UseElementStore.getState().Elements,
      pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
    });
  };

  const clickUndo = () => {
    undo();
    if (!socket) return;
    socket.emit("deltaUpdate", {
      delta: null,
      type: "undoUpdate",
      elements: UseElementStore.getState().Elements,
      pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
    });
  };

  const clickRedo = () => {
    redo();
    if (!socket) return;
    socket.emit("deltaUpdate", {
      delta: null,
      type: "redoUpdate",
      elements: UseElementStore.getState().Elements,
      pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
    });
  };

  useEffect(() => {
    if (!socket) {
      console.log("socket is null--");
      return;
    } else {
      console.log("socket is connected--");
      socket.on("remoteUpdate", (body: any) => {
        if (body.type === "clickBackground") {
          setIsElement(body.delta.isClickElement);
          setCurrentElement("");
        }
      });
    }
  }, [socket]);

  return (
    <SnowBackground onClick={() => clickBackground()}>
      <h3 className={`text-red-800 ${ratio > 1 ? "absolute top-10" : "mt-6 font-semibold"}`}>
        海报区域
      </h3>

      <div className="absolute right-8 top-14 flex flex-row">
        <BaseTooltips
          tooltipText={"快捷键提示"}
          position={"top"}
        >
          <Dialog>
            <button className={`mx-1 text-3xl hover:text-red-800 text-red-500`}>
              <span className="icon-[carbon--help]"></span>
            </button>
          </Dialog>
        </BaseTooltips>
        <BaseTooltips
          tooltipText={"回退"}
          position={"top"}
        >
          <button
            className={`mx-1 text-3xl ${!ifUndo && "hover:text-red-800 text-red-500"} ${ifUndo && "text-gray-400"}`}
            disabled={ifUndo}
            onClick={() => clickUndo()}
          >
            {/* <span className="icon-[carbon--previous-outline] bg-red-600"></span> */}
            <span className="icon-[carbon--previous-outline]"></span>
          </button>
        </BaseTooltips>
        <BaseTooltips
          tooltipText={"前进"}
          position={"top"}
        >
          <button
            className={`mx-1 text-3xl ${!ifRedo && "hover:text-red-800 text-red-500"} ${ifRedo && "text-gray-400"}`}
            disabled={ifRedo}
            onClick={() => clickRedo()}
          >
            <span className="icon-[carbon--next-outline]"></span>
          </button>
        </BaseTooltips>
      </div>

      <div
        id="mid-container"
        // className={`bg-white mt-5 ${ratio > 1 ? "scale-[0.8]" : ""}`}
        className={`bg-white mt-5`}
        style={{
          ...pageBackgroundStyle,
          width: "375px",
          height: "667px",
          position: "relative",
          overflow: "auto",
        }}
      >
        <ContextMenu item={actionItem} />

        {Elements.map((item: any) =>
          item.id == currentElement ? (
            <div
              key={item.id}
              className={` ${item.isHidden ? "invisible" : ""}`}
            >
              <ResizeComponent item={item} />
            </div>
          ) : (
            <div
              key={item.id + "-"}
              className={` ${item.isHidden ? "invisible" : ""}`}
            >
              <ChangePosition item={item} />
            </div>
          ),
        )}
      </div>
    </SnowBackground>
  );
}

export default Middle;
