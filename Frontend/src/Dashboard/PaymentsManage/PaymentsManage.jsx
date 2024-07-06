import { Modal, Table } from "antd";
import { useEffect } from "react";
import { useStore } from "../../Store/Store";

export default function PaymentsManage() {
  const { confirm } = Modal;
  const { getAllPaymentHistory, allPaymentHistory } = useStore();

  useEffect(() => {
    const fetchUsers = async () => await getAllPaymentHistory();
    fetchUsers();
  }, []);

  const paymentDataRow = allPaymentHistory?.map((payment) => {
    return {
      key: payment?._id,
      tranId: payment?._id,
      name: payment?.userData?.name,
      email: payment?.userData?.email,
      location: payment?.userData?.location,
      startDate: new Date(payment?.validateTime?.startDate).toDateString(),
      endDate: new Date(payment?.validateTime?.endDate).toDateString(),
    };
  });

  // table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Location",
      dataIndex: "location",
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "tranId",
      dataIndex: "tranId",
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">User Payment History</h1>
      <Table
        columns={columns}
        dataSource={paymentDataRow}
        // onChange={onChange}
      />
      ;
    </div>
  );
}
