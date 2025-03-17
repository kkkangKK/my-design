import { UseElementStore } from "@/stores/element";
import { ElementDataType } from "@/types/element-type";
import imgTemplate from "@/utils/template/imgTemplate";
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

  return (
    <div className="grid grid-cols-2 mt-4">
      {imgTemplate.map((item: any) => (
        <button
          key={item.style.backgroundImage}
          onClick={(e) => handleClick(e)}
          style={item.style}
          className="mx-auto my-2"
        ></button>
      ))}
    </div>
  );
}

export default ImgList;
