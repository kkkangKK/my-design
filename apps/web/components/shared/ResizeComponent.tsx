import { UseElementStore } from "@/stores/element";
import React, { useEffect, useRef, useState } from "react";

import "@/styles/base/resize-box.css";

import { useSocketStore } from "@/stores/socket";

type directionType = "top-left" | "top-right" | "bottom-left" | "bottom-right";

//现在的位置=鼠标移动距离+原来的位置

function ResizeComponent({
  item,
}: Readonly<{
  item: any;
}>) {
  const { setCurrentElement, setIsElement, updateElement, setCurrentSize } = UseElementStore();

  const { socket } = useSocketStore();

  // 原始的编辑框height，width，top，left, +4和-2是算上边框的2px宽度的border
  let initHeight = item.props.height
    ? parseInt(item.props.height.replace(/(px|rem)/g, ""), 10) + 4
    : 0;
  let initWidth = item.props.width
    ? parseInt(item.props.width.replace(/(px|rem)/g, ""), 10) + 4
    : 0;
  let initTop = item.props.top ? parseInt(item.props.top.replace(/(px|rem)/g, ""), 10) - 2 : 0;
  let initLeft = item.props.left ? parseInt(item.props.left.replace(/(px|rem)/g, ""), 10) - 2 : 0;

  const tempSize = {
    height: initHeight,
    width: initWidth,
    top: initTop,
    left: initLeft,
  };

  const resizeBoxRef = useRef<HTMLDivElement>(null);
  const contentBoxRef = useRef<HTMLDivElement>(null);

  const calculateSize = (direction: directionType, e: MouseEvent, position: any) => {
    const { clientX, clientY } = e;
    const { right, bottom, left, top } = position;
    //画布元素
    const container = document.getElementById("mid-container") as HTMLDivElement;
    const editor_header = document.getElementById("editor-header") as HTMLDivElement;
    const editor_left = document.getElementById("editor-left") as HTMLDivElement;
    console.log(editor_header.offsetHeight, editor_left.offsetWidth);
    // console.log('///////',container.offsetTop,clientY)
    // console.log('///////',container.offsetLeft,clientX)
    const rightWidth = clientX - left;
    const leftWidth = right - clientX;
    const bottomHeight = clientY - top;
    const topHeight = bottom - clientY;
    const topOffset = clientY - container.offsetTop - editor_header.offsetHeight;
    const leftOffset = clientX - container.offsetLeft - editor_left.offsetWidth;
    switch (direction) {
      case "top-left":
        return {
          width: leftWidth,
          height: topHeight,
          left: leftOffset,
          top: topOffset,
        };
      case "top-right":
        return {
          width: rightWidth,
          height: topHeight,
          top: topOffset,
        };
      case "bottom-left":
        return {
          width: leftWidth,
          height: bottomHeight,
          left: leftOffset,
        };
      case "bottom-right":
        return {
          width: rightWidth,
          height: bottomHeight,
        };
      default:
        break;
    }
  };

  const handleMouseDown = (direction: directionType, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentElement(item.id);
    const { left, top, bottom, right } = resizeBoxRef.current!.getBoundingClientRect();
    // 监听mousemove和mouseup事件
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const size = calculateSize(direction, moveEvent, { left, top, bottom, right });
      const { style } = resizeBoxRef.current!;
      if (size) {
        style.width = size.width + "px";
        style.height = size.height + "px";
        if (size.left) {
          style.left = size.left + "px";
        }
        if (size.top) {
          style.top = size.top + "px";
        }

        tempSize.width = Math.floor(size.width) - 4;
        tempSize.height = Math.floor(size.height) - 4;
        tempSize.left = size.left ? size.left + 2 : initLeft + 2;
        tempSize.top = size.top ? size.top + 2 : initTop + 2;
      }
    };

    const handleMouseUp = () => {
      const style = {
        left: tempSize.left + "px",
        top: tempSize.top + "px",
        width: tempSize.width + "px",
        height: tempSize.height + "px",
      };
      updateElement(item.id, style);
      setCurrentSize(style.height, style.width);

      // 移除mousemove和mouseup事件监听器
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      if (!socket) return;
      socket.emit("deltaUpdate", {
        delta: { style, elementId: item.id },
        type: "updateSize",
        elements: UseElementStore.getState().Elements,
        pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
      });
    };

    // 绑定事件监听器到document，以便在移动时也能触发
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    //把编辑框移到元素位置
    if (resizeBoxRef.current) {
      //border的宽度为2px
      resizeBoxRef.current.style.height = `${initHeight}px`;
      resizeBoxRef.current.style.width = `${initWidth}px`;
      resizeBoxRef.current.style.left = `${initLeft}px`;
      resizeBoxRef.current.style.top = `${initTop}px`;
    }
  }, [initHeight, initLeft, initTop, initWidth]);

  useEffect(() => {
    if (!socket) {
      console.log("socket is null--updateSize");
      return;
    } else {
      console.log("socket is connected--updateSize");
      socket.on("remoteUpdate", (body: any) => {
        if (body.type === "updateSize") {
          updateElement(body.delta.elementId, body.delta.style);
          setCurrentSize(body.delta.style.height, body.delta.style.width);
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
      className="draggable-item"
      id="basic-element"
      ref={resizeBoxRef}
    >
      <div
        id="basic-element"
        ref={contentBoxRef}
        onClick={handleClick}
        style={{
          // position: "absolute",
          ...item.props,
          width: "100%",
          height: "100%",
        }}
      >
        {item.type === "text" && item.text}
      </div>
      <button
        className="resize-handle top-left"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => handleMouseDown("top-left", e)}
      />
      <button
        className="resize-handle top-right"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => handleMouseDown("top-right", e)}
      />
      <button
        className="resize-handle bottom-left"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => handleMouseDown("bottom-left", e)}
      />
      <button
        className="resize-handle bottom-right"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => handleMouseDown("bottom-right", e)}
      />
    </div>
  );
}

export default ResizeComponent;
