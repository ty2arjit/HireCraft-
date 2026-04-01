import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import SignUp from "./features/auth/pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/",
    element: <h1>Home</h1>
  }
])