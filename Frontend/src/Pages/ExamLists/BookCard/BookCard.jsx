import { Badge, Card } from "antd";
import { useState, useEffect } from "react";
import Img from "../../../Components/Img";
import CustomModal from "../../../Components/Modal/CustomModal";
import ExamInfoModal from "./ExamInfoModal";
import { useStore } from "../../../Store/Store";
import { useLocation } from "react-router-dom";

export default function BookCard({ book }) {
  const { isUser } = useStore();
  const [showGroupQuestion, setShowGroupQuestion] = useState({});
  const [addQModalOpen, setAddQModalOpen] = useState(false);
  const [paidBook, setPaidBook] = useState(false);
  const location = useLocation();

  console.log("isUser ", isUser);

  useEffect(() => {
    if (isUser?.isLogin && isUser?.user?.email) {
      if (book?.payment === "paid") {
        setPaidBook(true);
      } else {
        setPaidBook(false);
      }
    } else {
      location.pathname = "/login";
    }
  }, [book, addQModalOpen]);

  return (
    <div className="group">
      <Badge.Ribbon
        text={<span className="capitalize">{book?.testType} Test </span>}
      >
        <Card
          title={
            <div className="flex items-center justify-between gap-5">
              <h1>{book?.title} </h1>
            </div>
          }
          bordered={true}
          className="shadow"
        >
          <div className="flex items-start justify-stretch gap-6">
            <figure className="w-1/3 border p-3 rounded-md">
              <Img src={book?.image?.url} />
            </figure>

            {/* content */}
            <div
              className={`flex items-start justify-start gap-4 flex-wrap flex-grow`}
            >
              {/* show question group */}
              {book?.questionGroups?.length > 0 ? (
                book?.questionGroups.map((group) => {
                  let count = 0;

                  if (book?.testType === "reading") {
                    const mcqsLength = group?.questions?.mcqs?.length || 0;
                    const fitgLength = group?.questions?.fitgQs?.length || 0;
                    const booleanLength =
                      group?.questions?.booleanQs?.length || 0;

                    count = mcqsLength + fitgLength + booleanLength;
                  } else if (book?.testType === "writing") {
                    count = group?.questions?.length || 0;
                  } else if (book?.testType === "listening") {
                    count = group?.questions?.length || 0;
                  } else if (book?.testType === "speaking") {
                    count = group?.questions?.length || 0;
                  }

                  return (
                    <QuestionGroupCard
                      key={group?._id}
                      onClick={() => {
                        setAddQModalOpen(true);
                        setShowGroupQuestion({
                          ...group,
                          questionCount: count,
                          testType: book?.testType,
                          paidBook: paidBook,
                        });
                      }}
                      title={group?.groupTitle}
                      ques={count}
                    />
                  );
                })
              ) : (
                <p className="text-red-500 p-10 text-center w-full">
                  No question group found
                </p>
              )}
            </div>
          </div>
        </Card>
      </Badge.Ribbon>

      <CustomModal
        openModal={addQModalOpen}
        setOpenModal={setAddQModalOpen}
        modalTitle={showGroupQuestion?.groupTitle}
      >
        <ExamInfoModal examGroup={showGroupQuestion} />
      </CustomModal>
    </div>
  );
}

// Question Card
function QuestionGroupCard({ title, ques, onClick }) {
  return (
    <div
      onClick={onClick}
      className="border p-4 rounded-md flex-grow hover:border-primary transition duration-300"
    >
      <h4 className="font-semibold text-base">{title}</h4>
      <p className="font-normal text-sm"> Questions: {ques} </p>
    </div>
  );
}
