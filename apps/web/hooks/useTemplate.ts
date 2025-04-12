import { getWork } from "@/http/work";
import { useUserStore } from "@/stores/user";
import { useWorkStore } from "@/stores/work";
import { useEffect, useState } from "react";

//用于判断当前用户是否为作品的作者，模板编辑页面的权限判断
export const useTemplate = () => {
  const { userId } = useUserStore();
  const { currentWorkId } = useWorkStore();

  const [isAuthor, setIsAuthor] = useState<boolean>(false);

  const getTheWork = async () => {
    if (currentWorkId) {
      const res = await getWork(currentWorkId);
      setIsAuthor(res.data.data.userId === userId);
    }
  };

  useEffect(() => {
    getTheWork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWorkId]);

  return isAuthor;
};
