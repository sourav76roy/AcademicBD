import { Badge, Card } from "antd";
import React from "react";

export default function ResultCard({ result }) {
  return (
    <Badge.Ribbon
      text={<span className="capitalize">{result?.book?.testType} test</span>}
    >
      <Card className="min-w-52 w-full max-w-72 flex-grow pt-6 min-h-72">
        <h2 className="text-xl font-semibold mb-2.5">{result?.book?.title}</h2>
        <h3 className="text-lg font-semibold mb-4">
          Group: {result?.group?.groupTitle}
        </h3>

        {result?.book?.testType === "reading" && (
          <>
            <p>Total Questions: {result?.totalQuestions}</p>
            <p>Total Marks: {result?.totalMarks}</p>
            <p>Correct Answers: {result?.correctAnswers}</p>
            <p>Wrong Answers: {result?.wrongAnswers}</p>
          </>
        )}

        {
          // if exam type is writing then show the writing result
          result?.examType === "writing" && (
            <div className="flex flex-col gap-2">
              {result?.status?.type === "marked" ? (
                <div className="flex flex-col items-start justify-start">
                  <h3>Marks: {result?.status?.marks}</h3>
                  <h3>Message: {result?.status?.message}</h3>
                </div>
              ) : (
                <h3>Not Evaluated</h3>
              )}
            </div>
          )
        }

        {result?.examType === "speaking" && (
          <div className="flex flex-col gap-2">
            {result?.status?.type === "marked" ? (
              <div className="flex flex-col items-start justify-start">
                <h3>Marks: {result?.status?.marks}</h3>
                <h3>Message: {result?.status?.message}</h3>
              </div>
            ) : (
              <h3>Not Evaluated</h3>
            )}
          </div>
        )}

        {result?.examType === "listening" && (
          <div className="flex flex-col gap-2">
            {result?.status?.type === "marked" ? (
              <div className="flex flex-col items-start justify-start">
                <h3>Marks: {result?.status?.marks}</h3>
                <h3>Message: {result?.status?.message}</h3>
              </div>
            ) : (
              <h3>Not Evaluated</h3>
            )}
          </div>
        )}
      </Card>
    </Badge.Ribbon>
  );
}
