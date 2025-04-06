import { UseElementStore } from "@/stores/element";
import { useSocketStore } from "@/stores/socket";
import React, { useEffect, useRef } from "react";

//现在的位置=鼠标移动距离+原来的位置

function ChangePosition({
  item,
}: Readonly<{
  item: any;
}>) {
  const { setCurrentElement, setIsElement, updateElement, setCurrentPosition } = UseElementStore();

  const { socket } = useSocketStore();

  let top = item.props.top ? parseInt(item.props.top.replace(/(px|rem)/g, ""), 10) : 0;
  let left = item.props.left ? parseInt(item.props.left.replace(/(px|rem)/g, ""), 10) : 0;

  const position = { x: left, y: top };
  const draggableRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // 阻止默认行为（如选择文本）
    e.preventDefault();
    // 记录初始鼠标位置
    const initialMouseX = e.clientX;
    const initialMouseY = e.clientY;

    // 监听mousemove和mouseup事件
    const handleMouseMove = (moveEvent: MouseEvent) => {
      // 更新元素位置
      left = moveEvent.clientX - initialMouseX + position.x;
      top = moveEvent.clientY - initialMouseY + position.y;

      if (draggableRef.current) {
        draggableRef.current.style.left = `${moveEvent.clientX - initialMouseX + position.x}px`;
        draggableRef.current.style.top = `${moveEvent.clientY - initialMouseY + position.y}px`;
      }
    };

    const handleMouseUp = () => {
      position.x = left;
      position.y = top;

      const style = {
        left: position.x + "px",
        top: position.y + "px",
      };
      updateElement(item.id, style);
      setCurrentPosition(position.x, position.y);

      // 移除mousemove和mouseup事件监听器
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      if (!socket) return;
      socket.emit("deltaUpdate", {
        delta: { style, elementId: item.id },
        type: "updatePosition",
        elements: UseElementStore.getState().Elements,
        pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
      });
    };

    // 绑定事件监听器到document，以便在移动时也能触发
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (!socket) {
      console.log("socket is null--");
      return;
    } else {
      console.log("socket is connected--");
      socket.on("remoteUpdate", (body: any) => {
        if (body.type === "updatePosition") {
          const deltaLeft = parseInt(body.delta.style.left.replace(/(px|rem)/g, ""), 10);
          const deltaTop = parseInt(body.delta.style.top.replace(/(px|rem)/g, ""), 10);
          updateElement(body.delta.elementId, body.delta.style);
          setCurrentPosition(deltaLeft, deltaTop);
          setIsElement(true);
        }
      });
    }
  }, [socket]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setCurrentElement(item.id);
    setIsElement(true);
    if (item.url) {
      let urlToOpen = item.url;
      if (!/^https?:\/\//i.test(urlToOpen)) {
        urlToOpen = `http://${urlToOpen}`;
      }
      window.open(urlToOpen);
    }
  };

  return (
    <div
      ref={draggableRef}
      id="basic-element"
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      style={{
        cursor: "grab",
        position: "absolute",
        ...item.props,
      }}
    >
      {item.type === "text" && item.text}
    </div>
  );
}

export default ChangePosition;
