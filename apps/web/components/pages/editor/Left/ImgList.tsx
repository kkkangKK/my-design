import { uploadFile } from "@/http/oss";
import { UseElementStore } from "@/stores/element";
import { ElementDataType } from "@/types/element-type";
import imgTemplate from "@/utils/template/imgTemplate";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function ImgList() {
  const { setCurrentElement, addElement, setIsElement } = UseElementStore();

  const handleClick = (event: any) => {
    console.log(event.target.innerHTML);
    console.log(event.target.style.cssText);
    const targetStyle = event.target.style.cssText;
    const styleObject = parseStyleStringToObject(targetStyle);
    console.log(styleObject);
    const id = uuidv4();
    const element: ElementDataType = {
      props: styleObject,
      id: id,
      type: "img",
      isHidden: false,
      isLocked: false,
      layerName: "图层",
    };
    addElement(element);
    setCurrentElement(id);
    setIsElement(true);
  };

  // 将kebab-case转换为camelCase的函数
  const kebabCaseToCamelCase = (str: string): string => {
    return str.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
  };

  // 将CSS样式字符串转换为对象
  const parseStyleStringToObject = (cssText: string): { [key: string]: any } => {
    const styles = cssText.split(";");
    const styleObject: { [key: string]: any } = {};

    styles.forEach((style) => {
      if (style.trim()) {
        // 使用正则表达式分割键值对
        const match = style.trim().match(/^([^:]+):(.+)$/);
        if (match) {
          const key = match[1].trim(); // 获取键
          const value = match[2].trim(); // 获取值
          const camelCaseKey = kebabCaseToCamelCase(key); // 转换为驼峰命名

          // 可能需要额外的处理来去除值两端的空格或引号等
          if (camelCaseKey) {
            styleObject[camelCaseKey] = value.trim().replace(/"/g, "").replace(/'/g, "");
          }
        }
      }
    });

    return styleObject;
  };

  const [loading, setLoading] = useState(false);
  const [imgList, setImgList] = useState(imgTemplate);
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJpgOrPng) {
      console.log("You can only upload JPG/PNG file!");
      return;
    }
    if (!isLt2M) {
      console.log("Image must smaller than 2MB!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadFile(formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.msg !== "ok") {
        throw new Error("Network response was not ok");
      }

      const style = {
        width: "100px",
        height: "100px",
        backgroundImage: `url('${response.data.data.url}?t=${Date.now()}')`,
        backgroundSize: "100% 100%",
      };
      setImgList((prev) => [...prev, { style: style }]);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 mt-4">
        {imgList.map((item: any) => (
          <button
            key={item.style.backgroundImage}
            onClick={(e) => handleClick(e)}
            style={item.style}
            className="mx-auto my-2"
          ></button>
        ))}
      </div>
      {loading ? (
        <div className="mx-auto mt-2 flex justify-center items-center">
          <LoadingOutlined />
        </div>
      ) : null}
      <div className="mx-auto mt-10 flex justify-center items-center relative">
        <button className="cursor-pointer bg-[#3D7FFF] items-center justify-center flex gap-2 rounded-lg text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#3D7FFF]/90 text-white h-10 px-8 py-2">
          <span className="font-bold icon-[carbon--upload]"></span>
          上传素材
        </button>
        <input
          type="file"
          className="w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer"
          onChange={handleFileChange}
          accept="image/jpeg, image/png"
        />
      </div>
    </div>
  );
}

export default ImgList;
