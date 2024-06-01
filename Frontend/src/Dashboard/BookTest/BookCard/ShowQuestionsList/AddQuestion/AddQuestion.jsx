import { Button, Form, Select, Space, message } from "antd";
import { useState } from "react";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import useBooks from "../../../../../Hooks/useBooks";
import { useStore } from "../../../../../Store/Store";
import BooleanType from "./AddQuestionType/BooleanType";
import FitgType from "./AddQuestionType/FitgType";
import McqType from "./AddQuestionType/McqType";
const { Option } = Select;

export default function AddQuestion({ groupId, bookId, bookType }) {
  const { reCall, setReCall } = useBooks();
  const { axiosSecure } = useAxiosSecure();
  const { isUser } = useStore();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [questionType, setQuestionType] = useState("mcq");
  // console.log("questionType", questionType);

  // TODO: show error message

  const onFinish = (values) => {
    setIsLoading(true);
    // question type base data create
    const initialData = {
      userId: isUser.user._id,
      groupId,
      bookId,
      status: values.status,
      type: values.type,
      bookType,
    };
    let finishData = {};
    if (questionType === "mcq") {
      finishData = {
        ...initialData,
        question: values.title,
        options: {
          A: values.A,
          B: values.B,
          C: values.C,
          D: values.D,
        },
        correctAns: values.correct,
      };
    } else if (questionType === "boolean") {
      finishData = {
        ...initialData,
        question: values.title,
        options: ["true", "false", "notSure"],
        correctAns: values.correctAnswer,
      };
    } else if (questionType === "fitg") {
      finishData = {
        ...initialData,
        question: values.passage,
        correctAns: values.answer,
      };
    }

    // console.log("finishData ", finishData);

    axiosSecure
      .post("/questions/create", finishData)
      .then((res) => {
        // console.log("res create", res);
        const { data } = res;

        // recall books
        setReCall(!reCall);

        // Success handling
        message.success("Question created successfully!", 3);
        // success();
        form.resetFields();
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error creating book: ", error);
        message.error("An error occurred while creating the book.", 2.5);
        setIsLoading(false);
      });
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="py-5">
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        layout="vertical"
        className="max-w-[600px]"
      >
        {/* Questions type */}
        <Form.Item
          name="type"
          label="Question Type"
          initialValue={"mcq"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={(value) => {
              setQuestionType(value);
            }}
          >
            <Option value="mcq"> MCQ </Option>
            <Option value="boolean"> Boolean </Option>
            {/* fil in the grap */}
            <Option value="fitg"> fil in the grap </Option>
          </Select>
        </Form.Item>

        {/* question type base show components */}
        {questionType === "mcq" ? (
          <McqType />
        ) : questionType === "boolean" ? (
          <BooleanType />
        ) : (
          questionType === "fitg" && <FitgType />
        )}

        {/* active or inactive */}
        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="active"> Active </Option>
            <Option value="inactive"> Inactive </Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Create Question
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset Form
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
