import http from "@/utils/http";
import { AxiosRequestConfig } from "axios";

import type { ResponseData } from "./types/common";
import { AiChatBody, AiChatResponse } from "./types/ai";

const config: AxiosRequestConfig = {
  timeout: 100000, // ai响应时间较长
};

export function aiChat(body: AiChatBody) {
  return http.post<ResponseData<AiChatResponse>>("/ai/chat", body, config);
}
