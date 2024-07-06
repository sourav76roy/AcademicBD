import { Button } from "antd";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../../Components/Container";
import SectionTitle from "../../Components/SectionTitle";
import { useStore } from "../../Store/Store";
import ListeningQuestionExam from "./QuestionsType/ListeningQuestionExam/ListeningQuestionExam";
import ReadingQuestionsExam from "./QuestionsType/ReadingQuestionsExam/ReadingQuestionsExam";
import SpeakingQuestionExam from "./QuestionsType/SpeakingQuestionExam/SpeakingQuestionExam";
import WritingQuestionExam from "./QuestionsType/WritingQuestionExam/WritingQuestionExam";
import "./style.css";

// exam page design
export default function ExamRunning() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isUser } = useStore();

  // login check
  useEffect(() => {
    if (!isUser?.isLogin) {
      window.location.pathname = "/login";
    }
  }, [isUser]);

  // restart count timer
  const [timerKey, setTimerKey] = useState(0);
  // if no state then redirect to exam-lists
  if (!state) {
    navigate("/exam-lists", { replace: true });
  }

  // handle retake exam
  const handleRetake = () => {
    setTimerKey((prevKey) => prevKey + 1);
  };
  const onUpdateHandle = (remainingTime) => {
    // console.log("remainingTime ", remainingTime);
  };

  return (
    <Container>
      <SectionTitle title="Exam Running" description="Exam Running Page" />

      <div className="relative">
        {/* Question lists Titls */}
        <div className="flex items-center justify-between gap-4 w-full px-4 mb-7 sticky top-0 bg-[#F9F9F9] z-50">
          {/* timer countdown */}
          <div className="p-2 rounded-md min-w-[120px]">
            <CountdownCircleTimer
              key={timerKey}
              isPlaying
              duration={state?.examTime * 60}
              colors={[]}
              colorsTime={[]}
              onComplete={() => ({ delay: 1 })}
              size={50}
              isSmoothColorTransition={true}
              strokeWidth={0}
              onUpdate={onUpdateHandle}
            >
              {({ remainingTime }) => (
                <RenderTime
                  remainingTime={remainingTime}
                  onReTake={handleRetake}
                />
              )}
            </CountdownCircleTimer>
          </div>

          {/* title */}
          <div className="">
            <h4 className="font-semibold text-base">
              {state?.groupTitle || "Question Group"}
            </h4>
            <p className="font-normal text-sm">
              Questions: {state?.questions?.length}
            </p>
          </div>
        </div>

        {/* divide question type */}
        {state?.testType === "reading" && (
          <ReadingQuestionsExam state={state} />
        )}

        {state?.testType === "writing" && <WritingQuestionExam state={state} />}

        {state?.testType === "listening" && (
          <ListeningQuestionExam state={state} />
        )}

        {state?.testType === "speaking" && (
          <SpeakingQuestionExam state={state} />
        )}
      </div>
    </Container>
  );
}

// timer component
function RenderTime({ remainingTime, onReTake }) {
  // Express it in minutes and seconds
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  if (remainingTime === 0) {
    return (
      <div className="timer">
        <Button onClick={onReTake}>Retake</Button>
      </div>
    );
  }

  return (
    <div className="timer">
      <div className="value">
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}
