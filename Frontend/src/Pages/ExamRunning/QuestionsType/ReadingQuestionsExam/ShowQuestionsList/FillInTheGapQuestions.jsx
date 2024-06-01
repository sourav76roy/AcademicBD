import { Form, Input } from "antd";

export default function FillInTheGapQuestions({ questions }) {
  return (
    <>
      <div className="flex flex-col gap-5 items-start justify-start mt-5">
        {questions?.map((question, idx) => (
          <FillInTheGapQuestionItem
            question={question}
            key={question._id}
            idx={idx + 1}
          />
        ))}
      </div>
    </>
  );
}

function FillInTheGapQuestionItem({ question }) {
  // ###(number) id define and replace input field
  const parts = question.question.split(/(###\d+)/);
  const processedQuestion = parts.map((part, index) => {
    const matchNumber = part.match(/\d+/);
    if (matchNumber) {
      const number = matchNumber[0];
      return (
        <Form.Item key={index} name={part} className="w-24 inline-block">
          <Input placeholder={index} />
        </Form.Item>
      );
    } else {
      return <span key={index}>{part}</span>;
    }
  });

  return (
    <div className="text-base mb-2 flex items-start justify-start gap-2.5">
      <p>{processedQuestion}</p>
    </div>
  );
}
