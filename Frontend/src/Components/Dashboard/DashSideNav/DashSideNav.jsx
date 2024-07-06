// Summary: This component is the side navigation bar for the dashboard. It will contain links to the different pages of the dashboard.
import {
  CreditCardOutlined,
  FolderViewOutlined,
  LogoutOutlined,
  RollbackOutlined,
  FileDoneOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Menu, theme } from "antd";
import { Link } from "react-router-dom";
import { useStore } from "../../../Store/Store";

// route
const route = "dashboard";

// dashboard menu items
const DashSideNav = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { isUser, logout } = useStore();

  const logoutHandle = () => {
    // console.log("logout Successful");
    logout();
  };

  // menu items
  const items = [
    {
      key: "1",
      icon: (
        <Link to={`./book-test`}>
          <FolderViewOutlined />
        </Link>
      ),
      label: <Link to={`./book-test`}>Book Test</Link>,
    },
    {
      key: "2",
      icon: (
        <Link to={`./book-test`}>
          <FileDoneOutlined />
        </Link>
      ),
      label: <Link to={`./test-manage`}>Test Manage</Link>,
    },
    {
      key: "3",
      icon: (
        <Link to={`./users-manage`}>
          <UserSwitchOutlined />
        </Link>
      ),
      label: <Link to={`./users-manage`}>Users Manage</Link>,
    },
    {
      key: "4",
      icon: (
        <Link to="./payment">
          <CreditCardOutlined />
        </Link>
      ),
      label: <Link to="./payment-manage">User Payment</Link>,
    },
    {
      key: "5",
      icon: <RollbackOutlined />,
      label: <Link to="/"> Back to Home </Link>,
    },
    {
      key: "6",
      icon: (
        <button onClick={() => logoutHandle()}>
          <LogoutOutlined />
        </button>
      ),
      label: <button onClick={() => logoutHandle()}>Logout</button>,
    },
  ];

  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
      />
    </>
  );
};

export default DashSideNav;
