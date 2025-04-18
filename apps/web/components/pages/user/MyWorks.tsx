"use client";

import BaseButton from "@/components/base/BaseButton";
import BaseCard from "@/components/base/BaseCard";
import BaseGrid from "@/components/base/BaseGrid";
import BaseSearch from "@/components/base/BaseSearch";
import CustomPagination from "@/components/shared/CustomPagination";
import { getTemplateList } from "@/http/template";
import { CreateWorkResponse } from "@/http/types/work";
import { getWorkList } from "@/http/work";
import { useWorkStore } from "@/stores/work";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MyWorksProps {
  isMyself: boolean;
}

const MyWorks: React.FC<MyWorksProps> = (params) => {
  const router = useRouter();
  const { setWork } = useWorkStore();

  const [mode, setMode] = useState<"work" | "template">("template");
  const [renderList, setRenderList] = useState<CreateWorkResponse[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [totalPage, setTotalPage] = useState(0);
  const [title, setTitle] = useState("");

  const getList = async (pageIndex: number, pageSize: number, title?: string) => {
    try {
      const res =
        mode == "work"
          ? await getWorkList({ pageIndex, pageSize, title })
          : await getTemplateList({ pageIndex, pageSize, title });
      setRenderList(res.data.data?.list || []);
      setPageIndex(pageIndex);
      setPageSize(pageSize);
      setTotalPage(Math.ceil(res.data.data?.count / pageSize));
    } catch (error) {
      console.log("getList Error:", error);
    }
  };

  useEffect(() => {
    getList(1, pageSize, title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, mode]);

  const renderPoster = (item: any) => {
    router.push("/editor");
    setWork(item.workId);
  };

  return (
    <div className="w-full mt-8 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <ul className="flex items-center gap-2">
          <BaseButton
            isStatic={mode == "template" ? true : false}
            onClick={() => {
              setMode("template");
            }}
          >
            My Templates
          </BaseButton>
          {params.isMyself ? (
            <BaseButton
              isStatic={mode == "work" ? true : false}
              onClick={() => {
                setMode("work");
              }}
            >
              My Works
            </BaseButton>
          ) : null}
        </ul>
        <BaseSearch onSearch={(e: any) => setTitle(e)}></BaseSearch>
      </div>
      <BaseGrid>
        {renderList.map((item) => (
          <BaseCard
            key={item.workId}
            title={item.title}
            description={item.desc}
            imgUrl={
              item.coverImg ||
              "https://cimg.co/news/100430/248406/polina-kondrashova-fhrwah2hmnm-unsplash.jpg"
            }
            onClick={() => renderPoster(item)}
          />
        ))}
      </BaseGrid>
      {renderList.length === 0 ? (
        <div className="flex items-center justify-center backdrop-blur-3xl hover:brightness-90 transition-all cursor-pointer group dark:bg-gradient-to-tl dark:from-gray-900/80 dark:to-gray-950/80 dark:hover:from-gray-800/80 dark:hover:to-gray-950/80 border-r-2 border-t-2 dark:border-gray-900/80 border-solid overflow-hidden relative dark:backdrop-blur-xl bg-gray-300/30 dark:bg-gray-300/10 rounded-xl h-full p-5 card">
          暂无作品
        </div>
      ) : (
        <CustomPagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          title={title}
          totalPage={totalPage}
          getList={getList}
        />
      )}
    </div>
  );
};

export default MyWorks;
