import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskDetails from "../components/TaskDetails";
import Layouts from "../components/Layouts";
import { Provider } from "react-redux";
import store from "../Redux/store";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layouts />,
    },
    {
      path: "/allTask",
      element: <TaskDetails />,
    },
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default Router;
