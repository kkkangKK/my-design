"use client";

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
  const { currentWorkId } = useWorkStore();

  // 拼接完整 URL（后期改为域名）
  // const fullUrl = `https://192.168.31.176:3001/page/${currentWorkId || ""}`;
  const fullUrl = `http://127.0.0.1:3001/page/${currentWorkId || ""}`;

  const [imgUrl, setImgUrl] = useState("");
  const getTheImg = async () => {
    const img = await takeScreenshot();
    if (img) {
      setImgUrl(img);
    }
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    getTheImg();
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
          <label className="text-sm font-medium">海报链接</label>
          <input
            type="text"
            value={fullUrl}
            placeholder="生成作品后显示链接"
            className="input w-full"
            disabled
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogDemo;
