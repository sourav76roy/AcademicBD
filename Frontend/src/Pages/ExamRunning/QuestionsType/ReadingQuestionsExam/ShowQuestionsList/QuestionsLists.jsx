import { Button, Form, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BooleanQuestions from "./BooleanQuestions";
import FillInTheGapQuestions from "./FillInTheGapQuestions";
import McqQuestions from "./McqQuestions";

export default function QuestionsLists({ questions, groupId, bookId }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // console.log("questions ", questions);

  // now count questions individually & store in state
  const [questionsCount, setQuestionsCount] = useState({
    mcqs: questions?.mcqs?.length,
    booleanQs: questions?.booleanQs?.length,
    fitgQs: questions?.fitgQs?.length,
  });

  const onFinish = (values) => {
    // all questions list checking true or false & counting correct answers & wrong answers & not answered questions count & store all history in array of objects
    const result = calculateResult(questions, values);
    // console.log("result", result);

    // now count correct answers, wrong answers, not answered questions in results
    let correctAnswers = 0;
    let wrongAnswers = 0;
    result.forEach((res) => {
      if (res?.isCorrect) {
        correctAnswers++;
      }
      if (res?.isCorrect === false) {
        wrongAnswers++;
      }
      if (res?.answers) {
        res.answers.forEach((ans) => {
          if (ans?.isCorrect) {
            correctAnswers++;
          }

          if (ans?.isCorrect === false) {
            wrongAnswers++;
          }
        });
      }
    });

    // redirect to result page
    navigate(
      "/results",
      {
        state: {
          groupId,
          bookId,
          correctAnswers,
          wrongAnswers,
          result,
          examType: "reading",
        },
      },
      { replace: true }
    );
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <div className="flex flex-col justify-start items-start gap-6">
        {/* MCQ Questions */}
        <div>
          <h2 className="text-lg font-semibold mb-4">MCQ Questions</h2>
          <McqQuestions questions={questions?.mcqs} />
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
            <BooleanQuestions questions={questions?.booleanQs} />
          </div>
        </div>

        {/* Fill in the gap */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Fill in the blanks</h2>
          <p>
            Complete the following sentences with a word or words from the
            Reading Passage.
          </p>

          <div>
            <FillInTheGapQuestions questions={questions?.fitgQs} />
          </div>
        </div>
      </div>

      <Form.Item className="text-center">
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

// calculate result
const calculateResult = (questions, values) => {
  const results = [];

  // Iterate through MCQ questions
  questions.mcqs?.forEach((question) => {
    const userAnswer = values?.[question?._id];
    const isCorrect = userAnswer === question?.correctAns;
    results.push({
      question: {
        questionId: question?._id,
        questionType: question?.type,
      },
      userAnswer,
      isCorrect,
    });
  });

  // Iterate through boolean questions
  questions.booleanQs?.forEach((question) => {
    const userAnswer = values?.[question?._id];
    const isCorrect = userAnswer === question?.correctAns;
    results.push({
      question: {
        questionId: question?._id,
        questionType: question?.type,
      },
      userAnswer,
      isCorrect,
    });
  });

  // Iterate through Fill in the gap questions
  questions.fitgQs?.forEach((question) => {
    const questionResult = {
      question: {
        questionId: question?._id,
        questionType: question?.type,
      },
      answers: [],
    };

    question.correctAns?.forEach((ans) => {
      const userAnswer = values?.[ans?.id];
      const isCorrect =
        userAnswer && userAnswer.toLowerCase() === ans?.answer.toLowerCase();
      questionResult.answers.push({ id: ans?.id, userAnswer, isCorrect });
    });
    results.push(questionResult);
  });

  return results;
};
