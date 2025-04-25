import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const admin = mysqlTable("admin", {
  id: int("id").primaryKey().autoincrement(),
  userName: varchar("userName", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }),
  nickName: varchar("nickName", { length: 256 }),
  user_pic: varchar("user_pic", { length: 256 }),
});
