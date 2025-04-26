import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { v4 as uuidV4 } from "uuid";

import { tag } from "./tag";
import { user } from "./user";

export const user_tag_clicks = mysqlTable("user_tag_clicks", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => uuidV4())
    .primaryKey(),
  userId: varchar("user_id", { length: 128 }).references(() => user.id),
  tagId: varchar("tag_id", { length: 128 }).references(() => tag.id),
  tagName: varchar("tag_name", { length: 256 }).notNull(),
  clickCount: int("click_count").default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});
