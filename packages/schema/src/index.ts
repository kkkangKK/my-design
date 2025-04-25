import { admin } from "./schema/admin";
import { tag } from "./schema/tag";
import { user } from "./schema/user";
import { user_tag_clicks } from "./schema/user_tag_clicks";
import { work } from "./schema/work";

export * from "./schema/user";
export * from "./schema/work";
export * from "./schema/admin";
export * from "./schema/tag";
export * from "./schema/user_tag_clicks";

export const schemas = {
  user,
  work,
  admin,
  tag,
  user_tag_clicks,
};

export type SchemaType = typeof schemas;
