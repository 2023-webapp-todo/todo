import { ITodoItem } from "@/types/todoItem";
import { IUser } from "@/types/user";
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
  {
    todo_id: "4",
    create_date: "06/07/23",
    content: "밥먹었어요?",
    checked: false,
    user_id: "2",
  },
];

type CheckUser = IUser & {login_id: string; password?: string};

const user: CheckUser[] = [
  {
    user_id: "1",
    login_id: "test@123",
    password: "test1234",
    nickname: "testUser",
  },
  {
    user_id: "2",
    login_id: "sangmin@1234",
    password: "qwer1234",
    nickname: "이상민",
  },
  {
    user_id: "3",
    login_id: "jongyup@1234",
    password: "qwer1234",
    nickname: "임종엽",
  },
];

let uuid = 5;
let user_uuid = 4;

export const handlers = [
  // signupUser
  rest.get("/api/signupUser.php", (req, res, ctx) => {
    const loginId = req.url.searchParams.get("login_id") || "";
    const password = req.url.searchParams.get("password") || "";
    const nickname = req.url.searchParams.get("nickname") || "";

    const userId = user_uuid.toString();
    user_uuid++;

    const newUser: CheckUser = {
      user_id: userId,
      login_id: loginId,
      password,
      nickname,
    };
    user.push(newUser);
    return res(ctx.status(200), ctx.json(newUser));
  }),

  // loginUser
  rest.get("/api/loginUser.php", (req, res, ctx) => {
    const loginId = req.url.searchParams.get("login_id") || "";
    const password = req.url.searchParams.get("password") || "";

    const findUser = user.find((u) => u.login_id === loginId);
    if (!findUser) {
      return res(
        ctx.status(200),
        ctx.json({ message: "존재하지 않는 아이디입니다." })
      );
    } else {
      const isMatch = findUser.password === password;
      if (!isMatch) {
        return res(
          ctx.status(200),
          ctx.json({ message: "비밀번호가 일치하지 않습니다." })
        );
      } else {
        delete findUser.password;
        return res(ctx.status(200), ctx.json(findUser));
      }
    }
  }),

  // getUsers
  rest.get("/api/getUsers.php", (req, res, ctx) => {
    const userId = req.url.searchParams.get("user_id");

    const users = user.map(u => {return {user_id: u.user_id, nickname: u.nickname}}).filter(u => u.user_id !== userId);
    return res(ctx.status(200), ctx.json(users));
  }),

  // getTodos
  rest.get("/api/getTodos.php", (req, res, ctx) => {
    const userId = req.url.searchParams.get("user_id");

    const filteredTodos = todos.filter((todo) => todo.user_id === userId);
    return res(ctx.status(200), ctx.json(filteredTodos));
  }),

  // createTodos
  rest.get("/api/createTodo.php", (req, res, ctx) => {
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
  rest.get("/api/updateTodo.php", (req, res, ctx) => {
    const todoId = req.url.searchParams.get("todo_id");
    const originTodo = todos.filter((todo) => todo.todo_id === todoId)[0];
    const newTodo: ITodoItem = { ...originTodo, checked: !originTodo.checked };
    todos = todos.map((todo) => (todo.todo_id === todoId ? newTodo : todo));
    return res(ctx.status(200), ctx.json(newTodo));
  }),

  // deleteTodo
  rest.get("/api/deleteTodo.php", (req, res, ctx) => {
    const todoId = req.url.searchParams.get("todo_id");
    todos = todos.filter((todo) => todo.todo_id !== todoId);
    return res(ctx.status(200), ctx.json("삭제되었습니다."));
  }),
];
