import { ITodoItem } from "@/types/todoItem";
import { rest } from "msw";

let todos: ITodoItem[] = [
  {
    todo_id: "1",
    create_date: "06/06/23",
    content: "안녕하세요",
    checked: false,
    user_id: "1",
  },
  {
    todo_id: "2",
    create_date: "06/06/23",
    content: "반갑습니다.",
    checked: true,
    user_id: "1",
  },
  {
    todo_id: "3",
    create_date: "06/05/23",
    content: "안녕히가세요",
    checked: false,
    user_id: "1",
  },
];

let uuid = 4;

export const handlers = [
  // getTodos
  rest.get("/api/getTodos", (req, res, ctx) => {
    const userId = req.url.searchParams.get("user_id");

    const filteredTodos = todos.filter((todo) => todo.user_id === userId);
    return res(ctx.status(200), ctx.json(filteredTodos));
  }),

  // createTodos
  rest.get("/api/createTodo", (req, res, ctx) => {
    const userId = req.url.searchParams.get("user_id") || "";
    const checked = req.url.searchParams.get("checked") === "true";
    const content = req.url.searchParams.get("content") || "";
    const createDate = req.url.searchParams.get("create_date") || "";

    const todoId = uuid.toString();
    uuid++;
    const newTodo: ITodoItem = {
      todo_id: todoId,
      create_date: createDate,
      content,
      checked,
      user_id: userId,
    };
    todos.push(newTodo);
    return res(ctx.status(200), ctx.json(newTodo));
  }),

  // updateTodo
  rest.get("/api/updateTodo", (req, res, ctx) => {
    const todoId = req.url.searchParams.get("todo_id");
    const originTodo = todos.filter((todo) => todo.todo_id === todoId)[0];
    const newTodo: ITodoItem = { ...originTodo, checked: !originTodo.checked };
    todos = todos.map((todo) => (todo.todo_id === todoId ? newTodo : todo));
    return res(ctx.status(200), ctx.json(newTodo));
  }),

  // deleteTodo
  rest.get("/api/deleteTodo", (req, res, ctx) => {
    const todoId = req.url.searchParams.get("todo_id");
    todos = todos.filter((todo) => todo.todo_id !== todoId);
    return res(ctx.status(200), ctx.json("삭제되었습니다."));
  }),
];
