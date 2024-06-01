import { Layout, theme } from "antd";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DashSideNav from "../Components/Dashboard/DashSideNav/DashSideNav";
import UserProfileButton from "../Components/Dashboard/UserProfileButton/UserProfileButton";
import Logo from "../Components/Logo";
import useUser from "../Hooks/useUser";
const { Header, Content, Footer, Sider } = Layout;

export default function DashboardLT() {
  const { user } = useUser();
  const navigate = useNavigate();

  // role admin
  if (user?.login && user?.role !== "admin") {
    return navigate("/");
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
      >
        <div className="text-center py-3 px-4 bg-slate-200">
          <Logo />
        </div>

        <DashSideNav />
      </Sider>

      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="p-0 flex justify-end items-center mt-3 mx-4"
        >
          <div className="py-6 px-6 block">
            <UserProfileButton />
          </div>
        </Header>

        <Content className="mt-4 mx-4 mb-0">
          <div
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="p-6 min-h-[360px]"
          >
            <Outlet />
          </div>
        </Content>

        {/* footer */}
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          academicbd ©{new Date().getFullYear()} Created by Sourav Roy
        </Footer>
      </Layout>
    </Layout>
  );
}
