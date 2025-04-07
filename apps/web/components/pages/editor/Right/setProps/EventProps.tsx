import { UseElementStore } from "@/stores/element";
import { useSocketStore } from "@/stores/socket";
import { useEffect, useState } from "react";

function EventProps() {
  const [clickURL, setClickURL] = useState<string>("");

  const { updateElement, currentElement, getElement } = UseElementStore();
  const { socket } = useSocketStore();

  const reset = () => {
    setClickURL("");
  };

  const handleChange = (e: any) => {
    setClickURL(e.target.value);
    updateElement(currentElement, undefined, undefined, e.target.value);

    if (!socket) return;
    socket.emit("deltaUpdate", {
      delta: {
        currentElement: currentElement,
        url: e.target.value,
      },
      type: "eventUpdate",
      elements: UseElementStore.getState().Elements,
      pageBackgroundStyle: UseElementStore.getState().pageBackgroundStyle,
    });
  };

  useEffect(() => {
    reset();
    const res = getElement(currentElement);
    const resUrl = res?.url;
    setClickURL(resUrl);
  }, [currentElement, getElement]);

  return (
    <div className="py-1 px-6 ">
      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="fontSize"
          className="text-red-400 font-semibold block mb-1 w-1/3"
        >
          点击跳转：
        </label>
        <input
          type="text"
          id="fontSize"
          value={clickURL}
          onChange={(e) => handleChange(e)}
          placeholder="输入跳转URL"
          className="input input-bordered w-2/3"
        />
      </div>
    </div>
  );
}

export default EventProps;
