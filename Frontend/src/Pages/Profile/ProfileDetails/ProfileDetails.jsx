import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { useEffect, useState } from "react";
import Img from "../../../Components/Img";
import { useStore } from "../../../Store/Store";

export default function ProfileDetails() {
  const { isUser, getUserPaymentHistory, userPaymentHistory } = useStore();
  const [paymentHistory, setPaymentHistory] = useState([]);

  console.log("userPaymentHistory ", userPaymentHistory);

  useEffect(() => {
    if (isUser) {
      getUserPaymentHistory(isUser?.user?._id);
    }
  }, [isUser]);

  // payment filter by tranId
  useEffect(() => {
    if (userPaymentHistory?.length > 0) {
      setPaymentHistory(userPaymentHistory);
    }
  }, [userPaymentHistory]);

  return (
    <>
      <Card className="min-w-80 w-full max-w-96 flex gap-3 items-center justify-center">
        {/* image or user logo */}
        <figure className="w-28 h-28 rounded-full border mb-4 mx-auto flex items-center justify-center p-2">
          {isUser?.user?.image?.url ? (
            <Img src={isUser?.user?.image?.url} alt="user" />
          ) : (
            <Avatar size={80} icon={<UserOutlined />} />
          )}
        </figure>

        {/* bio */}
        <div className="flex flex-col gap-2">
          <h1>intro</h1>
          <p className="text-sm">{isUser?.user?.intro}</p>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-1.4 mt-4 text-center">
          <h1 className="font-semibold">{isUser?.user?.name}</h1>
          <h3>{isUser?.user?.email}</h3>
          <h3>{isUser?.user?.phone}</h3>
          <h3>gender: {isUser?.user?.gender}</h3>
        </div>

        {/* payment history */}
        {userPaymentHistory?.length > 0 && (
          <div className="flex flex-col gap-2 mt-4">
            <h1 className="text-xl">Payment History</h1>

            <div className="flex flex-wrap gap-3">
              {paymentHistory?.reverse(-1)?.map((payment) => (
                <Card key={payment?._id}>
                  <div className="flex flex-col gap-2">
                    <h3>
                      {" "}
                      Package : <strong>{payment?.paymentType}</strong>
                    </h3>
                    <h3> Amount : {payment?.amount}</h3>
                    <p>
                      Start Date :
                      {new Date(
                        payment?.validateTime?.startDate
                      ).toDateString()}
                    </p>
                    <p>
                      End Date :
                      {new Date(payment?.validateTime?.endDate).toDateString()}
                    </p>
                    <p>
                      Payment TranId: <strong>{payment?._id}</strong>
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Card>
    </>
  );
}
