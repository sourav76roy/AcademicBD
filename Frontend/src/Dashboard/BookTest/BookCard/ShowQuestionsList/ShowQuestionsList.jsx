import {
  AppstoreAddOutlined,
  DeleteFilled,
  EditFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Button, Collapse, Modal, message } from "antd";
import DOMPurify from "dompurify";
import { useState } from "react";
import Img from "../../../../Components/Img";
import CustomModal from "../../../../Components/Modal/CustomModal";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useBooks from "../../../../Hooks/useBooks";
import QuestionGroupUpdate from "../AddNewQuestionGroup/QuestionGroupUpdate";
import AddListeningQ from "./AddQuestion/AddListeningQ";
import AddQuestion from "./AddQuestion/AddQuestion";
import AddWritingQ from "./AddQuestion/AddWritingQ";
import ListeningQuestionsLists from "./QuestionLists/ListeningQuestionsLists";
import WritingQuestionsLists from "./QuestionLists/WritingQuestionsLists";
import ReadingQuestionsLists from "./QuestionLists/ReadingQuestionsLists";
import AddSpeakingQ from "./AddQuestion/AddSpeakingQ";
import SpeakingQuestionsLists from "./QuestionLists/SpeakingQuestionsLists";
const { confirm } = Modal;

export default function ShowQuestionsList({
  group,
  bookId,
  questionCount,
  bookType,
}) {
  const { reCall, setReCall } = useBooks();
  const [addQModalOpen, setAddQModalOpen] = useState(false);
  const [updateGroupModalOpen, setUpdateGroupModalOpen] = useState(false);
  const { axiosSecure } = useAxiosSecure();

  // delete group modal
  const showConfirm = () => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleFilled />,
      // content: "Some descriptions",
      onOk() {
        // console.log("OK");
        // now delete the group from the database and update the UI as well
        axiosSecure
          .delete(`/question-group/${group?._id}`)
          .then((res) => {
            // console.log(res);
            setReCall(!reCall);
            message.success("Group deleted successfully");
          })
          .catch((err) => {
            // console.log(err);
            message.error("Failed to delete group");
          });
      },
      onCancel() {
        // console.log("Cancel");
      },
    });
  };

  const questionTitle = [
    {
      key: `${group?._id}+question`,
      label: (
        <div className="flex items-center justify-between gap-4 w-full">
          <QuestionGroupTitle title={group.groupTitle} ques={questionCount} />

          {/* button */}
          <div className="flex items-center justify-end gap-4 transition duration-300 opacity-0 group-hover:opacity-100">
            {/* add question items */}
            <Button
              onClick={() => setAddQModalOpen(true)}
              title="Add Questions Items"
              icon={<AppstoreAddOutlined />}
            />

            {/* Update */}
            <Button
              title="Update Group"
              icon={<EditFilled />}
              onClick={() => setUpdateGroupModalOpen(true)}
            />

            {/* delete */}
            <Button
              title="Delete Group"
              icon={<DeleteFilled />}
              onClick={() => showConfirm()}
            />

            {/* activation */}
          </div>
        </div>
      ),
      children: (
        <>
          <div>
            <figure>
              <Img src={group?.image} alt={group.groupTitle} />
            </figure>

            <article
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(group?.description),
              }}
            >
              {/* {group?.description} */}
            </article>
          </div>
        </>
      ),
    },
  ];

  console.log("bookType group 116 -> ", { bookType, group });

  return (
    <div className="border p-4 rounded-md flex flex-col items-start justify-start gap-4 flex-grow w-full">
      {/* Question lists Titls */}
      <Collapse accordion items={questionTitle} className="w-full !m-0 !p-0" />

      {/* if bookType divide show components */}
      {bookType === "reading" ? (
        <>
          {/* Questions Card */}
          <ReadingQuestionsLists questions={group?.questions} />
        </>
      ) : bookType === "writing" ? (
        <>
          {/* Questions Card */}
          <WritingQuestionsLists questions={group?.questions} />
        </>
      ) : bookType === "listening" ? (
        <>
          {/* Questions Card */}
          <ListeningQuestionsLists questions={group?.questions} />
        </>
      ) : (
        bookType === "speaking" && (
          <>
            {/* Questions Card */}
            <SpeakingQuestionsLists questions={group?.questions} />
          </>
        )
      )}

      {/* add question modal */}
      <CustomModal
        modalTitle="Add Your Book Question"
        setOpenModal={setAddQModalOpen}
        openModal={addQModalOpen}
      >
        {
          // add question component if BookType
          bookType === "reading" ? (
            <AddQuestion
              groupId={group?._id}
              bookId={bookId}
              bookType={bookType}
            />
          ) : bookType === "writing" ? (
            <AddWritingQ
              groupId={group?._id}
              bookId={bookId}
              bookType={bookType}
            />
          ) : bookType === "listening" ? (
            <AddListeningQ
              groupId={group?._id}
              bookId={bookId}
              bookType={bookType}
            />
          ) : bookType === "speaking" ? (
            <AddSpeakingQ
              groupId={group?._id}
              bookId={bookId}
              bookType={bookType}
            />
          ) : null
        }
      </CustomModal>

      {/* update modal */}
      <CustomModal
        modalTitle="Update Group"
        setOpenModal={setUpdateGroupModalOpen}
        openModal={updateGroupModalOpen}
      >
        <QuestionGroupUpdate group={group} bookId={bookId} />
      </CustomModal>
    </div>
  );
}

// Question group title
function QuestionGroupTitle({ title, ques }) {
  return (
    <div className="border p-4 rounded-md flex-grow hover:border-primary transition duration-300">
      <h4 className="font-semibold text-base">{title}</h4>
      <p className="font-normal text-sm"> Questions: {ques} </p>
    </div>
  );
}
