import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Img from "../../../Components/Img";
import { useStore } from "../../../Store/Store";
import practiceImg from "../../../assets/practice-mode.png";

export default function ExamInfoModal({ examGroup }) {
  const { userPaymentHistory, getUserPaymentHistory, isUser } = useStore();
  const [validPayment, setValidPayment] = useState();
  const [paidBook, setPaidBook] = useState();

  console.log("paidBook use", paidBook);
  console.log("paidBook && validPayment", paidBook && validPayment);

  // login check not a user then redirect to login page
  useEffect(() => {
    if (!isUser?.isLogin) {
      window.location.pathname = "/login";
    }
  }, [isUser]);

  useEffect(() => {
    if (isUser?.isLogin && isUser?.user?._id) {
      getUserPaymentHistory(isUser?.user?._id);
    }
  }, [isUser]);

  useEffect(() => {
    if (examGroup) {
      setPaidBook(examGroup?.paidBook);
    }
  }, [examGroup]);

  // check if user has paid for the book then enable the start now button else disable it
  useEffect(() => {
    if (userPaymentHistory?.length > 0) {
      const latestPayment = userPaymentHistory.reduce((latest, current) => {
        return new Date(current.validateTime.endDate) >
          new Date(latest.validateTime.endDate)
          ? current
          : latest;
      }, userPaymentHistory[0]);

      const todayDate = new Date();
      const endDate = new Date(latestPayment?.validateTime?.endDate);
      const VP = endDate > todayDate;
      setValidPayment(VP);
    }
  }, [userPaymentHistory, examGroup]);

  return (
    <div className="bg-white rounded-md">
      <div className="text-center">
        {/* title pop */}
        <figure className="w-20 h-20 mx-auto">
          <Img src={practiceImg} />
        </figure>
        <h1 className="text-2xl ">{examGroup?.groupTitle}</h1>
      </div>

      {/* question group */}
      <div>
        <h3 className="text-2xl font-medium mb-4">Information or rules</h3>

        <p className="text-sm text-slate-600">
          Total marks:{" "}
          <span className="font-semibold">{examGroup?.totalMarks}</span>
        </p>

        <p className="text-sm text-slate-600">
          Total questions:
          <span className="font-semibold">{examGroup?.totalQuestions}</span>
        </p>

        <p className="text-sm text-slate-600">
          Passing marks:{" "}
          <span className="font-semibold">{examGroup?.passingMarks}</span>
        </p>

        <p className="text-sm text-slate-600">
          Time limit:{" "}
          <span className="font-semibold">{examGroup?.examTime} minutes</span>
        </p>

        {/* start now button */}
        <div className="text-center mt-8">
          {!paidBook ? (
            <Link
              to="/exam-running"
              state={examGroup}
              className="text-white bg-blue-500 px-4 py-2 rounded-md hover:text-white hover:bg-blue-600"
            >
              Start Now
            </Link>
          ) : paidBook && validPayment ? (
            <Link
              to="/exam-running"
              state={examGroup}
              className="text-white bg-blue-500 px-4 py-2 rounded-md hover:text-white hover:bg-blue-600"
            >
              Start Now (Paid)
            </Link>
          ) : (
            <Link
              to={`/payment`}
              className="text-white bg-blue-500 px-4 py-2 rounded-md hover:text-white hover:bg-blue-600"
            >
              Pay and Start Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
