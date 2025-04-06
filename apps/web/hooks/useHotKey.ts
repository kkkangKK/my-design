import { UseElementStore } from "@/stores/element";
import { useSocketStore } from "@/stores/socket";
import hotkeys, { HotkeysEvent, KeyHandler } from "hotkeys-js";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useBindHotKey = (keys: string, callback: KeyHandler) => {
  useEffect(() => {
    hotkeys(keys, callback);

    return () => {
      hotkeys.unbind(keys, callback);
    };
  }, [callback, keys]);
};

const wrap = (callback: KeyHandler) => {
  const wrapperFn = (e: KeyboardEvent, event: HotkeysEvent) => {
    e.preventDefault();
    callback(e, event);
  };
  return wrapperFn;
};

const useHotKey = () => {
  const {
    currentElement,
    deleteElement,
    setCurrentElement,
    setPastedElement,
    setCopyElement,
    setMoveElement,
    undo,
    redo,
  } = UseElementStore();

  const { socket } = useSocketStore();

  useBindHotKey("ctrl+c, command+c", () => {
    setCopyElement(currentElement);
    if (!socket) return;
    socket.emit("deltaUpdate", {
      delta: { currentElement },
      type: "copyElement",
      elements: UseElementStore.getState().Elements,
      pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
    });
  });
  useBindHotKey("ctrl+v, command+v", () => {
    const id = uuidv4();
    setPastedElement(id);
    if (!socket) return;
    socket.emit("deltaUpdate", {
      delta: { elementId: id },
      type: "pastedElement",
      elements: UseElementStore.getState().Elements,
      pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
    });
  });
  useBindHotKey("backspace, delete", () => {
    deleteElement(currentElement);
    if (!socket) return;
    socket.emit("deltaUpdate", {
      delta: { currentElement },
      type: "deleteElement",
      elements: UseElementStore.getState().Elements,
      pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
    });
  });
  useBindHotKey("esc", () => {
    setCurrentElement("");
    if (!socket) return;
    socket.emit("deltaUpdate", {
      delta: null,
      type: "setSelectNull",
      elements: UseElementStore.getState().Elements,
      pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
    });
  });
  useBindHotKey(
    "up",
    wrap(() => {
      setMoveElement(currentElement, "Up", 1);
      if (!socket) return;
      socket.emit("deltaUpdate", {
        delta: { currentElement },
        type: "moveUp-1px",
        elements: UseElementStore.getState().Elements,
        pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
      });
    }),
  );
  useBindHotKey(
    "down",
    wrap(() => {
      setMoveElement(currentElement, "Down", 1);
      if (!socket) return;
      socket.emit("deltaUpdate", {
        delta: { currentElement },
        type: "moveDown-1px",
        elements: UseElementStore.getState().Elements,
        pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
      });
    }),
  );
  useBindHotKey(
    "left",
    wrap(() => {
      setMoveElement(currentElement, "Left", 1);
      if (!socket) return;
      socket.emit("deltaUpdate", {
        delta: { currentElement },
        type: "moveLeft-1px",
        elements: UseElementStore.getState().Elements,
        pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
      });
    }),
  );
  useBindHotKey(
    "right",
    wrap(() => {
      setMoveElement(currentElement, "Right", 1);
      if (!socket) return;
      socket.emit("deltaUpdate", {
        delta: { currentElement },
        type: "moveRight-1px",
        elements: UseElementStore.getState().Elements,
        pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
      });
    }),
  );
  useBindHotKey("shift+up", () => {
    setMoveElement(currentElement, "Up", 10);
    if (!socket) return;
    socket.emit("deltaUpdate", {
      delta: { currentElement },
      type: "moveUp-10px",
      elements: UseElementStore.getState().Elements,
      pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
    });
  });
  useBindHotKey("shift+down", () => {
    setMoveElement(currentElement, "Down", 10);
    if (!socket) return;
    socket.emit("deltaUpdate", {
      delta: { currentElement },
      type: "moveDown-10px",
      elements: UseElementStore.getState().Elements,
      pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
    });
  });
  useBindHotKey("shift+left", () => {
    setMoveElement(currentElement, "Left", 10);
    if (!socket) return;
    socket.emit("deltaUpdate", {
      delta: { currentElement },
      type: "moveLeft-10px",
      elements: UseElementStore.getState().Elements,
      pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
    });
  });
  useBindHotKey("shift+right", () => {
    setMoveElement(currentElement, "Right", 10);
    if (!socket) return;
    socket.emit("deltaUpdate", {
      delta: { currentElement },
      type: "moveRight-10px",
      elements: UseElementStore.getState().Elements,
      pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
    });
  });
  useBindHotKey("ctrl+z", () => {
    undo();
    if (!socket) return;
    socket.emit("deltaUpdate", {
      delta: null,
      type: "undoUpdate",
      elements: UseElementStore.getState().Elements,
      pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
    });
  });
  useBindHotKey("ctrl+shift+x", () => {
    redo();
    if (!socket) return;
    socket.emit("deltaUpdate", {
      delta: null,
      type: "redoUpdate",
      elements: UseElementStore.getState().Elements,
      pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
    });
  });

  useEffect(() => {
    if (!socket) {
      console.log("socket is null--");
      return;
    } else {
      console.log("socket is connected--");
      socket.on("remoteUpdate", (body: any) => {
        if (body.type === "copyElement") {
          setCopyElement(body.delta.currentElement);
        }
        if (body.type === "pastedElement") {
          setPastedElement(body.delta.elementId);
        }
        if (body.type === "deleteElement") {
          deleteElement(body.delta.currentElement);
        }
        if (body.type === "setSelectNull") {
          setCurrentElement("");
        }
        if (body.type === "moveUp-1px") {
          setMoveElement(body.delta.currentElement, "Up", 1);
        }
        if (body.type === "moveDown-1px") {
          setMoveElement(body.delta.currentElement, "Down", 1);
        }
        if (body.type === "moveLeft-1px") {
          setMoveElement(body.delta.currentElement, "Left", 1);
        }
        if (body.type === "moveRight-1px") {
          setMoveElement(body.delta.currentElement, "Right", 1);
        }
        if (body.type === "moveUp-10px") {
          setMoveElement(body.delta.currentElement, "Up", 10);
        }
        if (body.type === "moveDown-10px") {
          setMoveElement(body.delta.currentElement, "Down", 10);
        }
        if (body.type === "moveLeft-10px") {
          setMoveElement(body.delta.currentElement, "Left", 10);
        }
        if (body.type === "moveRight-10px") {
          setMoveElement(body.delta.currentElement, "Right", 10);
        }
        if (body.type === "undoUpdate") {
          undo();
        }
        if (body.type === "redoUpdate") {
          redo();
        }
      });
    }
  }, [socket]);
};

export default useHotKey;
