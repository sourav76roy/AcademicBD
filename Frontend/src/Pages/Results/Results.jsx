import { Button, Card, message } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CongratsEffect from "../../Components/CongratsEffect";
import Container from "../../Components/Container";
import Img from "../../Components/Img";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useStore } from "../../Store/Store";
import congratulationImg from "../../assets/congratulations.png";

// show results or congratulation page after exam
export default function Results() {
  const { axiosSecure } = useAxiosSecure();
  const navigate = useNavigate();
  const { isUser } = useStore();
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // if no state then redirect to exam-lists
  if (!state || isUser?.user === null) {
    return navigate("/exam-lists", { replace: true });
  }

  const onContinue = () => {
    setIsLoading(true);
    // create result
    let resultData = {};
    if (state?.examType === "reading") {
      // total marks
      const totalMarks = state?.correctAnswers + state?.wrongAnswers;
      const totalQuestions = state?.correctAnswers + state?.wrongAnswers;
      resultData = {
        ...state,
        userId: isUser?.user?._id,
        totalMarks,
        totalQuestions,
      };
    } else if (state?.examType === "writing") {
      resultData = {
        ...state,
        userId: isUser?.user?._id,
      };
    } else if (state?.examType === "listening") {
      resultData = {
        ...state,
        userId: isUser?.user?._id,
      };
    } else if (state?.examType === "speaking") {
      resultData = {
        ...state,
        userId: isUser?.user?._id,
      };
    }

    // console.log("resultData ", resultData);

    axiosSecure
      .post("/result/add-result", resultData)
      .then((res) => {
        // console.log("res create", res);
        const { data } = res;

        setIsLoading(false);

        return navigate("/exam-lists", { replace: true });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error creating book: ", error);
        message.error("An error occurred while creating the your result", 2.5);
      });
  };

  return (
    <Container className="relative">
      {/* confetti */}
      <CongratsEffect />

      {/* content */}
      <Card className="max-w-[400px] mx-auto relative pt-14">
        <div className="max-w-28 absolute -top-14 left-1/2 -translate-x-1/2 bg-white p-4 rounded-full border-t border-0">
          <Img src={congratulationImg} alt="congratulation" />
        </div>

        <div className="max-w-[600px] mx-auto">
          <h1 className="text-center text-3xl font-semibold text-gray-800">
            Congratulations!, <br /> {isUser?.user?.name || "User"}
          </h1>
          <p className="text-center text-lg font-normal text-gray-600">
            You have successfully completed the exam
          </p>

          {/* show exam result  */}
          <div className="flex flex-col gap-2.5 items-start justify-start mt-5">
            {/* exam type reading */}
            {state?.examType === "reading" && (
              <>
                <h3 className="text-gray-800 text-lg">
                  Total Marks:
                  <span className="font-semibold ml-4">
                    {state?.correctAnswers + state?.wrongAnswers}
                  </span>
                </h3>
                <h3 className="text-lg text-gray-800">
                  Total Questions:
                  <span className="font-semibold ml-4">
                    {state?.correctAnswers + state?.wrongAnswers}
                  </span>
                </h3>
                <h3 className="text-lg text-gray-800">
                  Correct Answers:
                  <span className="font-semibold ml-4">
                    {state?.correctAnswers}
                  </span>
                </h3>
                <h3 className="text-lg text-gray-800">
                  Wrong Answers:
                  <span className="font-semibold ml-4">
                    {state?.wrongAnswers}
                  </span>
                </h3>
              </>
            )}

            {/* exam type writing */}
            {state?.examType === "writing" && (
              <>
                <h3 className="text-green-500 text-lg text-center">
                  Please give some time to our team to mark your exam
                </h3>
              </>
            )}

            {/* exam type writing */}
            {state?.examType === "listening" && (
              <>
                <h3 className="text-green-500 text-lg text-center">
                  Please give some time to our team to mark your exam
                </h3>
              </>
            )}

            {/* exam type speaking */}
            {state?.examType === "speaking" && (
              <>
                <h3 className="text-green-500 text-lg text-center">
                  Please give some time to our team to mark your exam
                </h3>
              </>
            )}
          </div>

          {/* continue button */}
          <div className="text-center mt-8">
            <Button
              type="primary"
              onClick={() => onContinue()}
              loading={isLoading}
            >
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </Container>
  );
}
