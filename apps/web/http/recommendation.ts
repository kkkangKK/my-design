import http from "@/utils/http";

import { ResponseData } from "./types/common";
import { GetListBody } from "./types/recommendation";

export function getRecommendationList(userId: string) {
  return http.get<ResponseData<GetListBody>>(`/recommendation/${userId}`);
}
