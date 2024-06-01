import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Routers from "./Routes/Routes.jsx";
import "./index.css";
import { ConfigProvider } from "antd";
import antdConfig from "./Config/antd.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <React.StrictMode>
      <ConfigProvider theme={antdConfig}>
        <RouterProvider router={Routers} />
      </ConfigProvider>
    </React.StrictMode>
  </>
);
