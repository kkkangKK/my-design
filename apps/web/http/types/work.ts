import { ElementDataType } from "@/types/element-type";

export type CreateWorkBody = {
  title: string;
  desc: string;
  coverImg: string;
  content: {
    Elements?: Array<ElementDataType>;
    pageBackgroundStyle?: object;
  };
  isTemplate: boolean;
  isPublic: boolean;
  status: number;
};

export type CreateWorkResponse = {
  title: string;
  desc: string;
  coverImg: string;
  content: object;
  isTemplate: boolean;
  isPublic: boolean;
  isHot: boolean;
  author: string;
  copiedCount: number;
  status: number;
  userId: string;
  workId: string;
};

export type GetWorkListBody = {
  pageIndex?: number;
  pageSize?: number;
  title?: string;
};

export type GetWorkListResponse = {
  count: number;
  pageIndex?: number;
  pageSize?: number;
  list: CreateWorkResponse[];
};

export type CopyWorkResponse = {
  title: string;
  desc: string;
  coverImg: string;
  content: object;
  isTemplate: boolean;
  isPublic: boolean;
  isHot: boolean;
  author: string;
  copiedCount: number;
  status: number;
  userId: string;
  workId: string;
};

export type GetWorkResponse = CreateWorkBody & {
  author: string;
  userId: string;
  workId: string;
};

export type UpdateWorkBody = CreateWorkBody;

export type UpdateWorkResponse = {
  title: string;
  desc: string;
  coverImg: string;
  content: {
    Elements?: Array<ElementDataType>;
    pageBackgroundStyle?: object;
  };
  isTemplate: boolean;
  isPublic: boolean;
  status: number;
};

export type WorkPreviewResponse = {
  url: string;
  pageId: string;
};
