import { Input, Radio, Select } from "antd";
import React, { useState } from "react";

export default function ReadingQuestionsLists({ questions }) {
  return (
    <div className="flex flex-col justify-start items-start gap-6">
      {/* MCQ Questions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">MCQ Questions</h2>
        <div className="flex flex-col gap-5 items-start justify-start">
          {questions?.mcqs?.map((question, idx) => (
            <McqQuestionItem
              question={question}
              key={question._id}
              idx={idx + 1}
            />
          ))}
        </div>
      </div>

      {/* boolean questions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Boolean Questions</h2>
        <p>
          Do the following statements agree with the information given in
          Reading Passage?
        </p>

        {/* information */}
        <div className="mt-5 border p-4 rounded-md divide-y">
          <div className="flex items-center justify-start gap-3">
            <h3 className="text-base font-semibold mb-2 w-1/4">True</h3>
            <p>if the statement agrees with the information</p>
          </div>
          <div className="flex items-center justify-start gap-3">
            <h3 className="text-base font-semibold mb-2 w-1/4">False</h3>
            <p>if the statement contradicts the information</p>
          </div>
          <div className="flex items-center justify-start gap-3">
            <h3 className="text-base font-semibold mb-2 w-1/4">Not Given</h3>
            <p>if there is no information on this</p>
          </div>
        </div>

        <div className="flex flex-col gap-5 items-start justify-start mt-5">
          {questions?.booleanQs?.map((question, idx) => (
            <BooleanQuestionItem
              question={question}
              key={question._id}
              idx={idx + 1}
            />
          ))}
        </div>
      </div>

      {/* Fill in the blanks */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Fill in the blanks</h2>
        <p>
          Complete the following sentences with a word or words from the Reading
          Passage.
        </p>

        <div className="flex flex-col gap-5 items-start justify-start mt-5">
          {questions?.fitgQs?.map((question, idx) => (
            <FillInTheGapQuestionItem
              question={question}
              key={question._id}
              idx={idx + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// question item component
function McqQuestionItem({ question, idx }) {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };

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

// Boolean Questions
function BooleanQuestionItem({ question, idx }) {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="text-base font-semibold mb-2 flex items-start justify-start gap-2.5">
      <span>{idx}. </span>
      <Select className="min-w-28">
        {
          // question?.correctAns
          question?.correctAns === "true" ? (
            <Select.Option value="true">True</Select.Option>
          ) : question?.correctAns === "false" ? (
            <Select.Option value="false">False</Select.Option>
          ) : (
            <Select.Option value="notSure">Not Sure</Select.Option>
          )
        }
        {/* <Select.Option value="true">True</Select.Option>
          <Select.Option value="false">False</Select.Option>
          <Select.Option value="notSure">Not Sure</Select.Option> */}
      </Select>
      <span>{question.question}</span>
    </div>
  );
}

function FillInTheGapQuestionItem({ question, idx }) {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const questionParts = question.question.split("###");
  const replaceInput = (question, value) => {
    let questionParts = question.split("###");
    let newQuestion = questionParts.map((part, index) => {
      if (index % 2 !== 0) {
        return <Input className="w-32 mx-4" placeholder={`${index}`} />;
      }
      return part;
    });
    return newQuestion;
  };

  return (
    <div className="text-base font-semibold mb-2 flex items-start justify-start gap-2.5">
      <p>{replaceInput(question.question, value)}</p>
    </div>
  );
}
