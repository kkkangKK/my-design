"use client";

import BaseCard from "@/components/base/BaseCard";
import MoreButton from "@/components/shared/MoreButton";
import BaseList from "@/components/shared/ShowLists";
import { getTemplateList } from "@/http/template";
import { CreateWorkResponse } from "@/http/types/work";
import { useWorkStore } from "@/stores/work";
import { Link } from "@/utils/i18n/routing";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface TemplateListProps {}

const TemplateList: React.FC<TemplateListProps> = () => {
  const t = useTranslations();
  const router = useRouter();
  const { setWork } = useWorkStore();

  const [templateList, setTemplateList] = useState<CreateWorkResponse[]>([]);

  const getList = async (pageIndex?: number, pageSize?: number, title?: string) => {
    try {
      const res = await getTemplateList({ pageIndex, pageSize, title });
      setTemplateList(res.data.data?.list || []);
    } catch (error) {
      console.log("getTemplateList Error:", error);
    }
  };

  useEffect(() => {
    getList(1, 8);
  }, []);

  const renderPoster = (item: any) => {
    router.push("/editor");
    setWork(item.workId);
  };

  return (
    <div className="w-full mt-10">
      <BaseList
        hasSearch={false}
        title={t("template-list")}
      >
        {templateList.map((item) => (
          <BaseCard
            key={item.workId}
            title={item.title}
            description={item.desc}
            copied_count={item.copiedCount}
            tags={item.tags}
            isTemplate={true}
            imgUrl={
              item.coverImg ||
              "https://cimg.co/news/100430/248406/polina-kondrashova-fhrwah2hmnm-unsplash.jpg"
            }
            onClick={() => renderPoster(item)}
          />
        ))}
      </BaseList>
      {templateList.length === 0 ? (
        <div className="flex items-center justify-center backdrop-blur-3xl hover:brightness-90 transition-all cursor-pointer group dark:bg-gradient-to-tl dark:from-gray-900/80 dark:to-gray-950/80 dark:hover:from-gray-800/80 dark:hover:to-gray-950/80 border-r-2 border-t-2 dark:border-gray-900/80 border-solid overflow-hidden relative dark:backdrop-blur-xl bg-gray-300/30 dark:bg-gray-300/10 rounded-xl h-full p-5 card">
          暂无内容
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <Link href={"/templates"}>
            <MoreButton className="mt-5">{t("discover-more")}</MoreButton>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TemplateList;
