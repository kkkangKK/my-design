"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useWorkStore } from "@/stores/work";
import { takeScreenshot } from "@/utils/others/takeScreenshot";
import Image from "next/image";
import { useEffect, useState } from "react";

function DialogDemo({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentWorkId, workName } = useWorkStore();

  // 拼接完整 URL（后期改为域名）
  const fullUrl = `http://192.168.176.23:3001/page/${currentWorkId || ""}`;
  // const fullUrl = `http://127.0.0.1:3001/page/${currentWorkId || ""}`;

  const [imgUrl, setImgUrl] = useState("");
  const getTheImg = async () => {
    const img = await takeScreenshot();
    console.log("--", img);
    if (img) {
      setImgUrl(img);
    }
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      getTheImg();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div
          className="mockup-phone"
          style={{ width: 375, height: 667 }}
        >
          <div className="mockup-phone-display">
            <Image
              className="w-full h-full object-cover rounded-[36px]"
              src={imgUrl}
              alt="封面"
              width={0}
              height={0}
              sizes="100vh"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium w-full">海报链接</div>
          <div className="flex gap-2">
            <input
              type="text"
              value={fullUrl}
              placeholder="生成作品后显示链接"
              className="input w-[80%] h-[40px]"
              disabled
            />
            <Button
              className="bg-red-400 text-white w-[20%] h-[40px]"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(fullUrl);
                  alert("链接已复制到剪贴板");
                } catch (err) {
                  alert("复制失败，请手动复制");
                }
              }}
            >
              复制链接
            </Button>
          </div>
        </div>
        <Button
          className="bg-red-400 text-white"
          onClick={async () => {
            if (!imgUrl) return;

            try {
              // 获取图片数据
              const response = await fetch(imgUrl);
              if (!response.ok) throw new Error("获取图片失败");

              // 转换为Blob对象
              const blob = await response.blob();

              // 创建Object URL
              const objectUrl = URL.createObjectURL(blob);

              // 创建下载链接
              const a = document.createElement("a");
              a.href = objectUrl;
              a.download = `作品-${workName || "未命名"}.png`;
              document.body.appendChild(a);
              a.click();

              // 清理
              document.body.removeChild(a);
              setTimeout(() => URL.revokeObjectURL(objectUrl), 100);
            } catch (error) {
              console.error("下载图片失败:", error);
              alert("下载图片失败，请重试");
            }
          }}
        >
          下载图片
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default DialogDemo;
