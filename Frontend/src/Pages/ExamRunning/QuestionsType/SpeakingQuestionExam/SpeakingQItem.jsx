import { Form, Input, Typography } from "antd";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import AudioRecorder from "../../../../Components/AudioRecorder/AudioRecoder";
import ExamContainer from "../../../../Components/ExamContainer";
import Img from "../../../../Components/Img";

// find image file
const findFiles = (answerUser, questionId) => {
  const answer = answerUser.find((answer) => answer.questionId === questionId);

  if (answer?.audioURL) {
    return { ...answer?.audioURL };
  }
  return {};
};

export default function SpeakingQItem({
  questionActive = {},
  setAnswerUser,
  answerUser,
  setWordCount,
  wordCount,
}) {
  // audio file
  const [audioURL, setAudioURL] = useState({});

  // set image file
  useEffect(() => {
    setAudioURL(findFiles(answerUser, questionActive._id));
  }, [questionActive]);

  // word count
  const handleWordCount = (e) => {
    const userText = e.target.value;

    const words = userText
      ?.trim()
      ?.split(/\s+/)
      ?.filter((word) => word.length > 0);

    setWordCount(words.length);

    const updatedAnswers = answerUser.filter(
      (answer) => answer.questionId !== questionActive._id
    );

    setAnswerUser([
      ...updatedAnswers,
      {
        questionId: questionActive._id,
        userAnswer: userText || "",
        audioURL: audioURL || {},
      },
    ]);
  };

  // set audioURL to setAnswerUser
  useEffect(() => {
    if (
      answerUser?.find((answer) => answer?.questionId === questionActive?._id)
    ) {
      setAnswerUser((prev) => {
        return prev.map((answer) => {
          if (audioURL?.fileUrl && answer.questionId === questionActive._id) {
            return {
              ...answer,
              audioURL: audioURL,
            };
          } else {
            return answer;
          }
        });
      });
    } else {
      setAnswerUser((prev) => [
        ...prev,
        {
          questionId: questionActive._id,
          userAnswer: "",
          audioURL: audioURL,
        },
      ]);
    }
  }, [audioURL]);

  // console.log("questionActive 107 -> ", questionActive);
  // console.log("answerUser ", answerUser);

  return (
    <>
      <ExamContainer>
        {/* question passage */}
        <div className="text-wrap">
          {/* question title */}
          <h1 className="text-lg font-semibold">{questionActive?.title}</h1>

          {/* question passage */}
          <article
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(questionActive?.description),
            }}
            className="mt-4 text-wrap text-full break-words"
          ></article>

          {/* questions image */}
          {questionActive?.image && (
            <Img
              className="mt-6"
              src={questionActive?.image?.url}
              alt={questionActive?.title}
            />
          )}
        </div>

        {/* question input */}
        <div>
          {/* word count textarea */}
          <Form.Item name="userAnswer" label="Write your Answer:">
            <Input.TextArea
              rows={10}
              onChange={handleWordCount}
              value={
                answerUser?.find(
                  (answer) => answer?.questionId === questionActive?._id
                )?.userAnswer
              }
            />
            <Typography.Text type={"secondary"} className="float-right">
              {wordCount} words
            </Typography.Text>
          </Form.Item>

          <AudioRecorder setAudioURL={setAudioURL} audioURL={audioURL} />
        </div>
      </ExamContainer>
    </>
  );
}
