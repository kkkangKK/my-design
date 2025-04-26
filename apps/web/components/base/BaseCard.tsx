import { addClickCount } from "@/http/click";
import { useUserStore } from "@/stores/user";
import Image from "next/image";

interface BaseCardProps {
  title?: string;
  description?: string;
  imgUrl: string;
  tags?: string[];
  copied_count?: number;
  isTemplate?: boolean;
  onClick?: () => void;
}

const BaseCard: React.FC<BaseCardProps> = ({
  title = "暂无标题",
  imgUrl,
  tags = [],
  description = "暂无描述",
  copied_count = 0,
  isTemplate = false,
  onClick,
}) => {
  const { userId } = useUserStore();
  const handleButtonClick = () => {
    if (userId) {
      addClickCount({ userId, tags });
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="relative col-span-1 flex items-end w-full h-[535px] rounded-2xl 2xl:rounded-3xl bg-center bg-cover bg-no-repeat hover:scale-95 overflow-hidden transition-transform duration-300">
      <Image
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={imgUrl}
        alt={title}
        height={535}
        width={302}
      />
      <div className="block flex-1 h-[95px] px-4 glass">
        <div className="flex justify-between items-center">
          <h4 className="text-base font-bold text-[#6b7280] dark:text-[#161616] py-4 truncate max-w-[90%] 2xl:max-w-none">
            {title}
          </h4>
          <div className="flex justify-between items-center gap-1">
            <div className="flex justify-between items-center gap-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[#f6f0f1] dark:text-[#161616] bg-[#f65a73] dark:bg-[#374151] rounded-md px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            {isTemplate && (
              <div className="flex justify-between items-center gap-1">
                <span className="text-lg text-red-600 icon-[carbon--face-activated]"></span>
                <span className="text-xs text-[#6b7280]">{copied_count}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between font-bold text-xs">
          <div className="flex flex-col">
            <span className="text-[#6b7280] dark:text-[#646464]">{description}</span>
          </div>
          <button
            onClick={handleButtonClick}
            className="text-[#6b7280] dark:text-[#161616] hover:bg-rose-500 dark:hover:bg-[#E730CA] dark:hover:text-white border border-[#6b7280] rounded-full dark:border-[#161616] border-solid hover:border-rose-500 dark:hover:border-[#E730CA] w-16 h-6 transition-colors"
          >
            查看详情
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseCard;
