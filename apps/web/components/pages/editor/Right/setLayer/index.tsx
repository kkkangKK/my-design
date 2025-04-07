import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UseElementStore } from "@/stores/element";
import { getParentElement } from "@/utils/others/getParentElement";
import { arrayMove } from "@/utils/others/helper";
import { useEffect, useRef, useState } from "react";

import "@/styles/base/hiddenScroll.css";

import { useSocketStore } from "@/stores/socket";

import InlineEdit from "./InlineEdit";

function SetLayer() {
  const { Elements, updateElement, setIsCurrentLocked, setCurrentElement, setElements } =
    UseElementStore();
  const { socket } = useSocketStore();
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [childStyle, setChildStyle] = useState({});

  useEffect(() => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.offsetHeight;
      setChildStyle({ maxHeight: `${parentHeight}px`, overflowY: "auto" });
    }
  }, []);

  const handleChange = (id: string, key: string, value: boolean) => {
    if (key === "isHidden") {
      updateElement(id, undefined, undefined, undefined, value);
      if (!socket) return;
      socket.emit("deltaUpdate", {
        delta: {
          id,
          value,
        },
        type: "isHiddenUpdate",
        elements: UseElementStore.getState().Elements,
        pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
      });
    } else if (key === "isLocked") {
      setIsCurrentLocked(value);
      updateElement(id, undefined, undefined, undefined, undefined, value);
      if (!socket) return;
      socket.emit("deltaUpdate", {
        delta: {
          id,
          value,
        },
        type: "isLockedUpdate",
        elements: UseElementStore.getState().Elements,
        pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
      });
    }
  };

  const data = {
    currentDragId: "",
    currentDragIndex: -1,
  };
  const [dragData, setDragData] = useState(data);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: string, index: number) => {
    setDragData({ ...dragData, currentDragId: id, currentDragIndex: index });
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const currentEle = getParentElement(e.target as HTMLElement, "parentItem");
    if (currentEle?.dataset?.index) {
      const moveIndex = Number(currentEle.dataset.index);
      let list = Elements;
      list = arrayMove(list, dragData.currentDragIndex, moveIndex);
      setElements(list);
      if (!socket) return;
      socket.emit("deltaUpdate", {
        delta: { list },
        type: "zIndexUpdate",
        elements: UseElementStore.getState().Elements,
        pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
      });
    }

    setDragData({ ...dragData, currentDragId: "" });
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="h-full"
      ref={parentRef}
    >
      <div
        style={childStyle}
        className={`overflow-x-hidden border-t-0 border-b border-l border-r border-[#d2d4d7] hiddenScrollbar`}
        onDrop={(e) => onDrop(e)}
        onDragOver={(e) => onDragOver(e)}
      >
        {Elements.map((item, index) => (
          <div
            key={item.id}
            className={`${item.id == dragData.currentDragId ? "border-red-300 bg-red-300 text-white" : "border-gray-300 border-solid"} parentItem flex justify-around w-full h-14 relative  ${
              index === Elements.length - 1 ? "" : "border-b"
            }`}
            style={{ zIndex: 10 }}
            draggable
            onDragStart={(event) => onDragStart(event, item.id, index)}
            data-index={index}
            onMouseDown={() => {
              setCurrentElement(item.id);
            }}
          >
            <div className="w-1/6 flex justify-center m-2 rounded-btn border border-gray-400">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      className="text-xl"
                      onClick={() => handleChange(item.id, "isHidden", !item.isHidden)}
                    >
                      {item.isHidden ? (
                        <span className="icon-[carbon--view-off]"></span>
                      ) : (
                        <span className="icon-[carbon--view]"></span>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.isHidden ? "隐藏" : "显示"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="w-1/6 flex justify-center m-2 rounded-btn border border-gray-300">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      className="text-xl"
                      onClick={() => handleChange(item.id, "isLocked", !item.isLocked)}
                    >
                      {item.isLocked ? (
                        <span className="icon-[carbon--locked]"></span>
                      ) : (
                        <span className="icon-[carbon--unlocked]"></span>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.isLocked ? "锁定" : "解锁"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <InlineEdit
              value={item.layerName}
              id={item.id}
            />
            <div className="w-1/6 flex justify-center m-2 rounded-btn border border-gray-300">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button className="text-xl">
                      <span className="icon-[carbon--drag-vertical]"></span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>拖动排序</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SetLayer;
