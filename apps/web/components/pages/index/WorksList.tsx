"use client";

import BaseCard from "@/components/base/BaseCard";
import MoreButton from "@/components/shared/MoreButton";
import BaseList from "@/components/shared/ShowLists";
import { useToken } from "@/hooks/useToken";
import { CreateWorkResponse } from "@/http/types/work";
import { getWorkList } from "@/http/work";
import { useWorkStore } from "@/stores/work";
import { Link } from "@/utils/i18n/routing";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface WorksListProps {}

const WorksList: React.FC<WorksListProps> = () => {
  const t = useTranslations();
  const router = useRouter();
  const [token] = useToken();

  const [workList, setWorkList] = useState<CreateWorkResponse[]>([]);
  const { setWork } = useWorkStore();

  const getList = async (pageIndex?: number, pageSize?: number, title?: string) => {
    try {
      const res = await getWorkList({ pageIndex, pageSize, title });
      setWorkList(res.data.data?.list || []);
    } catch (error) {
      console.log("getWorkList Error:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getList(1, 8);
    }
  }, [token]);

  const renderPoster = (item: any) => {
    router.push("/editor");
    setWork(item.workId);
  };

  return token ? (
    <div className="w-full mt-10">
      <BaseList
        hasSearch={false}
        title={t("works-list")}
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
        <div className="w-full flex items-center justify-center">
          <Link href={"/works"}>
            <MoreButton className="mt-5">{t("discover-more")}</MoreButton>
          </Link>
        </div>
      )}
    </div>
  ) : null;
};

export default WorksList;
