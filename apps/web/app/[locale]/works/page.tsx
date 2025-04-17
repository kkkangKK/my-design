"use client";

import BaseCard from "@/components/base/BaseCard";
import BaseLayout from "@/components/layouts/BaseLayout";
import AuthGuard from "@/components/shared/AuthGuard";
import Banner from "@/components/shared/Banner";
import CustomPagination from "@/components/shared/CustomPagination";
import BaseList from "@/components/shared/ShowLists";
import { CreateWorkResponse } from "@/http/types/work";
import { getWorkList } from "@/http/work";
import { useWorkStore } from "@/stores/work";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function Main() {
  const { setWork } = useWorkStore();
  const [workList, setWorkList] = useState<CreateWorkResponse[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [totalPage, setTotalPage] = useState(0);
  const [title, setTitle] = useState("");

  const router = useRouter();

  const getList = useCallback(async (pageIndex: number, pageSize: number, title?: string) => {
    try {
      const res = await getWorkList({ pageIndex, pageSize, title });
      setWorkList(res.data.data?.list || []);
      setPageIndex(pageIndex);
      setPageSize(pageSize);
      setTotalPage(Math.ceil(res.data.data?.count / pageSize));
    } catch (error) {
      console.log("getWorkList Error:", error);
    }
  }, []);

  useEffect(() => {
    getList(1, pageSize, title);
  }, [title, pageSize, getList]);

  const renderPoster = (item: any) => {
    router.push("/editor");
    setWork(item.workId);
  };

  return (
    <BaseLayout>
      <Banner
        className="h-[30vh] bg-sky-500/20 rounded-lg text-center text-white font-bold text-4xl"
        img_url="/decorate/banner-2.png"
      />
      <BaseList
        title="All Works List ✨"
        onSearch={(e: any) => setTitle(e)}
      >
        {workList.map((item) => (
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
      </BaseList>
      {workList.length === 0 ? (
        <div className="flex items-center justify-center backdrop-blur-3xl hover:brightness-90 transition-all cursor-pointer group dark:bg-gradient-to-tl dark:from-gray-900/80 dark:to-gray-950/80 dark:hover:from-gray-800/80 dark:hover:to-gray-950/80 border-r-2 border-t-2 dark:border-gray-900/80 border-solid overflow-hidden relative dark:backdrop-blur-xl bg-gray-300/30 dark:bg-gray-300/10 rounded-xl h-full p-5 card">
          暂无内容
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
    </BaseLayout>
  );
}

export default Main;
