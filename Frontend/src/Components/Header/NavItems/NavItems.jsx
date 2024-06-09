import { UserOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "../../../Store/Store";

export default function NavItems() {
  const { isUser, logout } = useStore();
  const [current, setCurrent] = useState("mail");
  const { isLogin, role } = isUser;

  // console.log("isUser header ", isUser);

  const logoutHandle = () => {
    // console.log("logout Successful");
    logout();
  };

  // IELTS Menu items
  const items = [
    {
      label: <NavLink to="/exam-lists">Exam</NavLink>,
      key: "exam",
    },
    !isLogin
      ? {
          label: <NavLink to="/login">Login</NavLink>,
          key: "login",
        }
      : {
          label: <NavLink to="/#contact-us">Contact Us</NavLink>,
          key: "contact-us",
        },
    !isLogin
      ? {
          label: <NavLink to="/sign-up">Signup</NavLink>,
          key: "sign-up",
        }
      : {
          label: (
            <p className="flex items-center gap-1 justify-start">
              <UserOutlined /> <span> {isUser?.user?.name} </span>
            </p>
          ),
          key: "users",
          children: [
            role === "admin"
              ? {
                  label: <NavLink to="/dashboard/book-test">Dashboard</NavLink>,
                  key: "admin",
                }
              : {
                  label: <NavLink to="/profile">Profile</NavLink>,
                  key: "profile",
                },
            {
              label: (
                <Button
                  className="w-[125%] -ml-4 h-full"
                  onClick={() => logoutHandle()}
                >
                  Logout
                </Button>
              ),
              key: "logout",
            },
          ],
        },
  ];

  // console.log("items ", items);

  const onClick = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div>
      <Menu
      className="bg-orange-400"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
}
