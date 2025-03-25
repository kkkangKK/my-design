import http from "@/utils/http";

import { ResponseData } from "./types/common";
import {
  AddPasswordBody,
  GetUserInfoResponse,
  IsHasPasswordResponse,
  UpdatePasswordBody,
  UpdateUserInfoBody,
  UpdateUserInfoResponse,
} from "./types/user";

/** 获取用户信息 */
export function getUserInfo(userId: string) {
  return http.get<ResponseData<GetUserInfoResponse>>(`/user/${userId}`);
}

/** 更新用户信息 */
export function updateUserInfo(userId: string, body: UpdateUserInfoBody) {
  return http.put<ResponseData<UpdateUserInfoResponse>>(`/user/${userId}`, body);
}

/** 删除用户信息 */
export function deleteUser(userId: string) {
  return http.delete<ResponseData<null>>(`/user/${userId}`);
}

/** 检测用户密码状态 */
export function isHasPassword() {
  return http.get<ResponseData<IsHasPasswordResponse>>(`/user/password`);
}
/** 添加密码 */
export function addPassword(body: AddPasswordBody) {
  return http.post<ResponseData<null>>(`/user/password`, body);
}
/** 更新密码 */
export function updatePassword(body: UpdatePasswordBody) {
  return http.put<ResponseData<null>>(`/user/password`, body);
}
