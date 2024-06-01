import { Button, Flex, Form } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../../Store/Store";
import ListeningQItem from "./ListeningQItem";

// Summary: This file contains the code for writing question exam.
export default function ListeningQuestionExam({ state }) {
  const { isUser } = useStore();
  const [questionActive, setQuestionActive] = useState(state?.questions[0]);
  const [form] = Form.useForm();
  const [wordCount, setWordCount] = useState(0);
  const [maxWordLimit, setMaxWordLimit] = useState(250);
  const [answerUser, setAnswerUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // set the word count of the question
    answerUser?.map((answer) => {
      if (answer.questionId === questionActive._id) {
        setWordCount(answer.userAnswer.split(/\s+/).length);
      }
    });
  }, [questionActive]);

  const handleSubmit = (values) => {
    //  now make store data
    const finishData = {
      answers: answerUser,
      examId: state._id,
      examType: "listening",
      userId: isUser.user._id,
      bookId: state.bookId,
      groupId: state._id,
    };

    // console.log("finishData ", finishData);
    // return;

    // redirect to result page
    navigate(
      "/results",
      {
        state: { ...finishData },
      },
      { replace: true }
    );
  };

  return (
    <div>
      <Form
        form={form}
        scrollToFirstError
        onFinish={handleSubmit}
        layout="vertical"
        style={{
          paddingBlock: 32,
        }}
      >
        {/* question passage */}
        <ListeningQItem
          questionActive={questionActive}
          setAnswerUser={setAnswerUser}
          answerUser={answerUser}
          setWordCount={setWordCount}
          maxWordLimit={maxWordLimit}
          wordCount={wordCount}
        />

        {/* question type tabs */}
        <Flex gap="small" wrap justify="center" className="mt-6">
          {/* questions & active buttons */}
          {state?.questions?.map((question, index) => (
            <Button
              key={index}
              onClick={() => setQuestionActive(question)}
              type={
                questionActive?._id === question?._id ? "primary" : "default"
              }
            >
              Questions {index + 1}
            </Button>
          ))}
        </Flex>

        {/* submit */}
        <Flex gap="small" wrap justify="center" className="mt-6">
          {/* submit button */}
          <Button
            type="primary"
            htmlType="submit"
            disabled={wordCount > maxWordLimit}
          >
            Submit
          </Button>

          {/*  reset */}
          <Button danger onClick={() => form.resetFields()}>
            Reset
          </Button>
        </Flex>
      </Form>
    </div>
  );
}
