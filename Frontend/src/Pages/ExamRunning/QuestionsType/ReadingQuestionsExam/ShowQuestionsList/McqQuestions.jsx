import { Form, Radio } from "antd";
import { useState } from "react";

// desc: mcq questions show in exam running page
export default function McqQuestions({ questions, setMcqData }) {
  return (
    <div className="min-h-max">
      <div className="flex flex-col gap-5 items-start justify-start">
        {questions?.map((question, idx) => (
          <McqQuestionItem
            question={question}
            key={question._id}
            idx={idx + 1}
          />
        ))}
      </div>
    </div>
  );
}

// question item component
function McqQuestionItem({ question, idx, setMcqAns }) {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Form.Item
      label={
        <h3 className="text-base font-semibold">
          {idx}. {question.question}
        </h3>
      }
      name={question?._id}
    >
      <Radio.Group onChange={onChange} value={value}>
        {Object.entries(question.options).map((option, index) => (
          <Radio key={index} value={option[0]} className={`block my-2 w-full `}>
            {option[1]}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
}
