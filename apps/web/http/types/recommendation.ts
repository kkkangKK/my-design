export type RecommendationResponse = {
  title: string;
  desc: string;
  coverImg: string;
  content: object;
  tags: string[];
  isTemplate: boolean;
  isPublic: boolean;
  isHot: boolean;
  author: string;
  copiedCount: number;
  status: number;
  userId: string;
  workId: string;
};

export type GetListBody = RecommendationResponse[];
