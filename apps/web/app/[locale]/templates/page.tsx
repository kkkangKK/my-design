"use client";

import BaseButton from "@/components/base/BaseButton";
import BaseCard from "@/components/base/BaseCard";
import BaseLayout from "@/components/layouts/BaseLayout";
import Banner from "@/components/shared/Banner";
import CustomPagination from "@/components/shared/CustomPagination";
import BaseList from "@/components/shared/ShowLists";
import { getRecommendationList } from "@/http/recommendation";
import { getTemplateList } from "@/http/template";
import { CreateWorkResponse } from "@/http/types/work";
import { useUserStore } from "@/stores/user";
import { useWorkStore } from "@/stores/work";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Main() {
  const { setWork } = useWorkStore();
  const { userId } = useUserStore();
  const [workList, setWorkList] = useState<CreateWorkResponse[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [totalPage, setTotalPage] = useState(0);
  const [title, setTitle] = useState("");

  const router = useRouter();

  const getList = async (pageIndex: number, pageSize: number, title?: string) => {
    try {
      const res = await getTemplateList({ pageIndex, pageSize, title });
      setWorkList(res.data.data?.list || []);
      setPageIndex(pageIndex);
      setPageSize(pageSize);
      setTotalPage(Math.ceil(res.data.data?.count / pageSize));
    } catch (error) {
      console.log("getTemplateList Error:", error);
    }
  };

  useEffect(() => {
    getList(1, pageSize, title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const renderPoster = (item: any) => {
    router.push("/editor");
    setWork(item.workId);
  };

  const [mode, setMode] = useState<"hot" | "like">("hot");

  const switchGetListMode = async (mode: "hot" | "like") => {
    setMode(mode);
    if (userId && mode === "like") {
      const res = await getRecommendationList(userId);
      setWorkList(res.data.data);
    } else {
      getList(1, 16, "");
    }
  };

  return (
    <BaseLayout>
      <Banner className="h-[30vh] bg-sky-500/20 rounded-lg text-center text-white font-bold text-4xl" />
      <div className="flex justify-end gap-4 mt-5">
        <BaseButton
          isStatic={mode == "hot" ? true : false}
          onClick={() => switchGetListMode("hot")}
        >
          热门推荐
        </BaseButton>
        <BaseButton
          isStatic={mode == "like" ? true : false}
          onClick={() => switchGetListMode("like")}
        >
          猜你喜欢
        </BaseButton>
      </div>
      <BaseList
        title="Template Market 🛒"
        onSearch={(e: any) => setTitle(e)}
      >
        {workList.map((item) => (
          <BaseCard
            key={item.workId}
            title={item.title}
            tags={item.tags}
            description={item.desc}
            copied_count={item.copiedCount}
            isTemplate={true}
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
      ) : mode === "hot" ? (
        <CustomPagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          title={title}
          totalPage={totalPage}
          getList={getList}
        />
      ) : null}
    </BaseLayout>
  );
}

export default Main;
