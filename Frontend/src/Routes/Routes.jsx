import { Link, createBrowserRouter } from "react-router-dom";
import BookTest from "../Dashboard/BookTest/BookTest";
import Dashboard from "../Dashboard/Dashboard";
import PaymentsManage from "../Dashboard/PaymentsManage/PaymentsManage";
import TestManage from "../Dashboard/TestManage/TestManage";
import UsersManage from "../Dashboard/UserManage/UsersManage";
import DashboardLT from "../Layouts/DashboardLT";
import MainLT from "../Layouts/MainLT";
import Login from "../Pages/Authentication/Login";
import SignUp from "../Pages/Authentication/SignUp";
import ExamLists from "../Pages/ExamLists/ExamLists";
import ExamRunning from "../Pages/ExamRunning/ExamRunning";
import Home from "../Pages/Home/Home";
import Profile from "../Pages/Profile/Profile";
import Results from "../Pages/Results/Results";
import IsAdmin from "./IsAdmin";
import PrivateRoute from "./PrivateRoute";

// desc: This file will contain all the routes of the application.
const Routers = createBrowserRouter([
  {
    path: "/",
    element: <MainLT />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/exam-lists",
        element: <ExamLists />,
      },
      {
        path: "/exam-running",
        element: (
          <PrivateRoute>
            <ExamRunning />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/results",
        element: (
          <PrivateRoute>
            <Results />
          </PrivateRoute>
        ),
      },
      // Authentication routes
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <IsAdmin>
        <DashboardLT />
      </IsAdmin>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <IsAdmin>
            <Dashboard />
          </IsAdmin>
        ),
      },
      {
        path: "/dashboard/book-test",
        element: (
          <IsAdmin>
            <BookTest />
          </IsAdmin>
        ),
      },
      {
        path: "/dashboard/test-manage",
        element: (
          <IsAdmin>
            <TestManage />
          </IsAdmin>
        ),
      },
      {
        path: "/dashboard/users-manage",
        element: (
          <IsAdmin>
            <UsersManage />
          </IsAdmin>
        ),
      },
      {
        path: "/dashboard/payment-manage",
        element: (
          <IsAdmin>
            <PaymentsManage />
          </IsAdmin>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="flex flex-col items-center justify-center gap-4 h-screen">
        <h1 className="text-2xl">404 Not Found</h1>
        <Link to="/">Go to Home</Link>
      </div>
    ),
  },
]);

export default Routers;
