import React, { useState } from "react";
import { Radio } from "antd";

export default function QuestionsLists({ questions }) {
  // console.log("questions ", questions);
  return (
    <div className="flex flex-col gap-5 items-start justify-start">
      {questions?.mcqs.map((question, idx) => (
        <QuestionItem question={question} key={question._id} idx={idx + 1} />
      ))}
    </div>
  );
}

// question item component
function QuestionItem({ question, idx }) {
  const [value, setValue] = useState(1);

  // radio change handler
  const onChange = (e) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  // console.log("question?.correctAns ", question?.correctAns);
  return (
    <div>
      <h3 className="text-base font-semibold mb-2">
        {idx}. {question.question}
      </h3>

      <Radio.Group onChange={onChange} value={value}>
        {Object.entries(question.options).map((option, index) => (
          <Radio
            key={index}
            value={option[0]}
            checked={question?.correctAns}
            className={`block my-2 w-full ${
              question?.correctAns === option[0] ? "text-green-500" : ""
            }`}
          >
            {option[1]}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
}
