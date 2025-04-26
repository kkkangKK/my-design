import http from "@/utils/http";

import { ClickBody } from "./types/click";
import { ResponseData } from "./types/common";

/** 创建工作区 */
export function addClickCount(body: ClickBody) {
  return http.post<ResponseData<null>>(`/click/tagName`, body);
}
