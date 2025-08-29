import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    todo: v.string(),
    isCompleted: v.boolean(),
  }),
});
