"use client";

import BaseButton from "@/components/base/BaseButton";
import ProjectCard from "@/components/shared/ProjectCard";
import { getUserInfo } from "@/http/user";
import { useUserStore } from "@/stores/user";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserInfosProps {
  isMyself: boolean;
}

const UserInfos: React.FC<UserInfosProps> = (params) => {
  const router = useRouter();
  const t = useTranslations();
  const { userId } = useUserStore();

  const Info = {
    avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp", //默认头像
    username: "", //非空
    nickname: "---", //默认昵称
    email: "---", //默认邮箱
    phone: "", //非空
  };
  const [userInfo, setUserInfo] = useState(Info);

  const getUserData = async (id: string) => {
    const res = await getUserInfo(id);
    setUserInfo(() => ({
      avatar: res.data.data?.avatar || Info.avatar,
      username: res.data.data?.username || Info.username,
      nickname: res.data.data?.nickname || Info.nickname,
      email: res.data.data?.email || Info.email,
      phone: res.data.data?.phone || Info.phone,
    }));
  };
  useEffect(() => {
    if (userId !== null) {
      getUserData(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isCopied, setIsCopied] = useState(false);

  // 复制当前 URL 到剪贴板
  const copyToClipboard = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
    } catch (err) {
      console.error("复制失败:", err);
      alert("无法自动复制，请手动复制地址栏链接");
    }
  };

  // 3秒后自动重置复制状态
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="flex flex-wrap justify-between w-full py-8">
      <div className="flex flex-col justify-between items-center flex-1 w-full h-full pl-5">
        <div className="w-full flex flex-col gap-8">
          <div className="flex gap-8 h-20 w-full m-15">
            <Image
              src={userInfo.avatar}
              className="rounded-full w-20 h-20  group-hover:scale-105 transition-transform duration-300"
              alt={"avatar"}
              width={100}
              height={100}
            />
            <div className="h-full flex flex-col justify-center gap-1">
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300/80">
                {userInfo.nickname}
              </h3>
              <p className="text-sm text-gray-600/80 dark:text-gray-400/70">{userInfo.username}</p>
            </div>
          </div>
          <div className="flex justify-start  gap-7">
            <span className="text-sm text-gray-600/80 dark:text-gray-400/70">{userInfo.email}</span>
            <span className="text-sm text-gray-600/80 dark:text-gray-400/70">|</span>
            <span className="text-sm text-gray-600/80 dark:text-gray-400/70">{userInfo.phone}</span>
          </div>
          {params.isMyself ? (
            <div className="flex justify-start gap-5">
              <BaseButton onClick={() => router.push("../settings")}>
                <div className="flex items-center gap-1">
                  <span className="icon-[carbon--edit]"></span>
                  <span>{t("editPersonalInformation")}</span>
                </div>
              </BaseButton>
              <BaseButton onClick={copyToClipboard}>
                {isCopied ? (
                  <>
                    <div className="flex items-center gap-1">
                      <span className="icon-[carbon--checkmark-outline]"></span>
                      <span>已复制</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1">
                      <span className="icon-[carbon--copy-link]"></span>
                      <span>分享个人链接</span>
                    </div>
                  </>
                )}
              </BaseButton>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 justify-end pr-5 items-center w-full h-full">
        <ProjectCard />
      </div>
    </div>
  );
};

export default UserInfos;
