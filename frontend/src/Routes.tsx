import { RouteObject } from "react-router-dom";
import GlobalLayout from "@/pages/_layout";

import MainPage from "@/pages/Main";
import LoginPage from "@/pages/Login";
import SignUpPage from "@/pages/SignUp";
import TodoPage from "@/pages/Todo";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/todo", element: <TodoPage /> },
    ],
  },
];
