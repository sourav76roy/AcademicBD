import { Form, Select } from "antd";
import React from "react";

// desc: boolean questions show in exam running page
export default function BooleanQuestions({ questions, setBooleanData }) {
  return (
    <div>
      <div className="flex flex-col gap-5 items-start justify-start mt-5">
        {questions?.map((question, idx) => (
          <BooleanQuestionItem
            question={question}
            key={question._id}
            idx={idx + 1}
          />
        ))}
      </div>
    </div>
  );
}

// Boolean Questions
function BooleanQuestionItem({ question, idx }) {
  return (
    <div className="flex items-center gap-2.5">
      <span>{idx}. </span>
      <Form.Item
        name={question?._id}
        className="text-base font-semibold mb-2 flex items-start justify-start gap-2.5 w-24"
      >
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          <Select.Option value="true">True</Select.Option>
          <Select.Option value="false">False</Select.Option>
          <Select.Option value="notSure">Not Sure</Select.Option>
        </Select>
      </Form.Item>
      <span>{question.question}</span>
    </div>
  );
}
