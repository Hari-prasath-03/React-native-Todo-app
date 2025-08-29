import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
  handler: async ({ db }) => await db.query("todos").order("desc").collect(),
});

export const addTodos = mutation({
  args: { todo: v.string() },
  handler: async ({ db }, args) => {
    const todoId = await db.insert("todos", {
      todo: args.todo,
      isCompleted: false,
    });
    return todoId;
  },
});

export const toggleTode = mutation({
  args: { id: v.id("todos") },
  handler: async ({ db }, args) => {
    const todo = await db.get(args.id);
    if (!todo) throw new ConvexError("Todo not found");

    await db.patch(args.id, {
      isCompleted: !todo.isCompleted,
    });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async ({ db }, args) => {
    const todo = await db.get(args.id);
    if (!todo) throw new ConvexError("Todo not found");
    await db.delete(args.id);
  },
});

export const updateTodo = mutation({
  args: { id: v.id("todos"), todo: v.string() },
  handler: async ({ db }, args) => {
    await db.patch(args.id, {
      todo: args.todo,
    });
  },
});

export const deleteAllTodos = mutation({
  handler: async ({ db }) => {
    const todos = await db.query("todos").collect();
    for (const todo of todos) await db.delete(todo._id);
    return { rowsDeleted: todos.length };
  },
});

export const deleteCompletedTodos = mutation({
  handler: async ({ db }) => {
    const completedTodos = await db
      .query("todos")
      .filter((q) => q.eq(q.field("isCompleted"), true))
      .collect();
    for (const todo of completedTodos) await db.delete(todo._id);
    return { rowsDeleted: completedTodos.length };
  },
});
