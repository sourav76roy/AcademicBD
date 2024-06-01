import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Select, Space, Table, Tooltip } from "antd";
import { useEffect } from "react";
import { useStore } from "../../Store/Store";

export default function UsersManage() {
  const { confirm } = Modal;
  const { users, getAllUsers, updateUserRole, deleteUser } = useStore();
  const usersData = users.map((user) => {
    return {
      key: user?._id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
      location: user?.location,
    };
  });

  useEffect(() => {
    const fetchUsers = async () => await getAllUsers();
    fetchUsers();
  }, []);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // handle role change
  function handleRoleChange(userId, data) {
    // console.log("userId, data ", userId, data);
    // check value
    updateUserRole(userId, data);
    getAllUsers();
  }

  // delete user
  const showConfirm = (userId) => {
    confirm({
      title: "Are you sure to delete the user?",
      icon: <ExclamationCircleOutlined />,
      //  content: "Are you sure to delete the user?",
      okText: "Yes, Delete Now",
      cancelText: "No, Cancel",
      onOk() {
        console.log("OK ", userId);
        if (userId) {
          deleteUser(userId);
          getAllUsers();
        }
      },
    });
  };

  // table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      sorter: (a, b) => a?.role - b?.role,
      render: (text, role) => (
        <Select
          placeholder="Select a option and change input text above"
          allowClear
          defaultValue={role?.role}
          style={{ width: 120 }}
          onChange={(value) => handleRoleChange(role.key, value)}
        >
          <Select.Option value="admin"> Admin </Select.Option>
          <Select.Option value="moderator"> Moderator </Select.Option>
          <Select.Option value="user"> User </Select.Option>
        </Select>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "40%",
    },
    {
      title: "Location",
      dataIndex: "location",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* delete button */}
          <Tooltip title="Delete ">
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => showConfirm(record?.key)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">User Manage</h1>
      <Table columns={columns} dataSource={usersData} onChange={onChange} />;
    </div>
  );
}
