import {
  AppstoreAddOutlined,
  DeleteFilled,
  EditFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Badge, Button, Card, Collapse, Modal, message } from "antd";
import { useState } from "react";
import Img from "../../../Components/Img";
import CustomModal from "../../../Components/Modal/CustomModal";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useBooks from "../../../Hooks/useBooks";
import BookUpdate from "../AddNewBook/BookUpdate";
import AddNewQuestionGroup from "./AddNewQuestionGroup/AddNewQuestionGroup";
import ShowQuestionsList from "./ShowQuestionsList/ShowQuestionsList";
const { confirm } = Modal;

export default function BookCard({ book }) {
  const [addQModalOpen, setAddQModalOpen] = useState(false);
  const [updateBookModalOpen, setUpdateBookModalOpen] = useState(false);
  const { axiosSecure } = useAxiosSecure();
  const { reCall, setReCall } = useBooks();

  // delete book modal
  const showConfirm = () => {
    confirm({
      title: "Do you want to delete Book?",
      icon: <ExclamationCircleFilled />,
      content: <p>All your questions and groups will be deleted?</p>,
      onOk() {
        // now delete the group from the database and update the UI as well
        axiosSecure
          .delete(`/book/${book?._id}`)
          .then((res) => {
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

  // Make the data of book?.questionGroups like these items
  const questionGroups = book?.questionGroups?.map((group) => {
    let count = 0;
    if (book?.testType === "reading") {
      const mcqsLength = group?.questions?.mcqs?.length || 0;
      const fitgLength = group?.questions?.fitgQs?.length || 0;
      const booleanLength = group?.questions?.booleanQs?.length || 0;
      count = mcqsLength + fitgLength + booleanLength;
    } else if (book?.testType === "writing") {
      count = group?.questions?.length || 0;
    } else if (book?.testType === "listening") {
      count = group?.questions?.length || 0;
    } else if (book?.testType === "speaking") {
      count = group?.questions?.length || 0;
    }

    return {
      key: group?._id,
      label: <QuestionGroupCard title={group?.groupTitle} ques={count} />,
      children: (
        <ShowQuestionsList
          bookId={book?._id}
          bookType={book?.testType}
          group={group}
          questionCount={count}
        />
      ),
    };
  });

  // console.log("book ", book);

  return (
    <div className="group">
      <Card
        title={
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center justify-start gap-4">
              <h1>{book?.title}</h1>
              <Badge
                text={<span className="text-white">{book?.testType}</span>}
                color="#fff"
                className="bg-[#5939e9] capitalize px-2 py-0.5 rounded-lg"
              />
              <Badge
                text={<span className="text-white">{book?.status}</span>}
                color="#fff"
                className={`${
                  book?.status === "active" ? "bg-[#52c41a]" : "bg-[#c41a1a]"
                } capitalize px-2 py-0.5 rounded-lg text-white`}
              />
            </div>

            {/* button */}
            <div className="flex items-center justify-end gap-4 transition duration-300 opacity-0 group-hover:opacity-100">
              {/* add question items */}
              <Button
                onClick={() => setAddQModalOpen(true)}
                title="Add Questions Group Items"
                icon={<AppstoreAddOutlined />}
              />

              {/* Update */}
              <Button
                title="Update Book"
                icon={<EditFilled />}
                onClick={() => setUpdateBookModalOpen(true)}
              />

              {/* delete */}
              <Button
                title="Delete Book"
                icon={<DeleteFilled />}
                onClick={() => showConfirm()}
              />
            </div>
          </div>
        }
        bordered={true}
        className="shadow"
      >
        <div className="flex items-start justify-stretch gap-6">
          {book?.image?.url && (
            <figure className="w-1/3 border p-3 rounded-md">
              <Img src={book?.image?.url} />
            </figure>
          )}

          {/* content */}
          <div className={`flex flex-col gap-4 w-full`}>
            {/* <Collapse accordion items={items} /> */}
            {/* show question group */}
            {book?.questionGroups?.length > 0 ? (
              <Collapse
                accordion
                items={questionGroups}
                className="w-full !p-0 !m-0"
              />
            ) : (
              <p className="text-red-500 p-10 text-center w-full">
                No question group found
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Add New Question Group */}
      <CustomModal
        openModal={addQModalOpen}
        setOpenModal={setAddQModalOpen}
        modalTitle="Add New Question Group"
      >
        <AddNewQuestionGroup bookId={book?._id} />
      </CustomModal>
      {/* Update book Modal */}
      <CustomModal
        openModal={updateBookModalOpen}
        setOpenModal={setUpdateBookModalOpen}
        modalTitle="Update Book"
      >
        <BookUpdate initialValues={book} />
      </CustomModal>
    </div>
  );
}

// Question Card
function QuestionGroupCard({ title, ques, onClick }) {
  return (
    <div className="border p-4 rounded-md flex-grow hover:border-primary transition duration-300">
      <h4 className="font-semibold text-base">{title}</h4>
      <p className="font-normal text-sm"> Questions: {ques} </p>
    </div>
  );
}
