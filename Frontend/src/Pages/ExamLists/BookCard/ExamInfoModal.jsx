import { Button } from "antd";
import React from "react";
import Img from "../../../Components/Img";
import practiceImg from "../../../assets/practice-mode.png";
import { Link } from "react-router-dom";

export default function ExamInfoModal({ examGroup }) {
  console.log("examGroup ", examGroup);
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
        <div className="text-center">
          <Link to="/exam-running" state={examGroup}>
            <Button type="primary" className="mt-5 mx-auto">
              Start Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
