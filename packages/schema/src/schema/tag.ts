import { mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { v4 as uuidV4 } from "uuid";

export const tag = mysqlTable("tag", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => uuidV4())
    .primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});
