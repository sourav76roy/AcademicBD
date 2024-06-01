import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, message } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import useBooks from "../../../../../Hooks/useBooks";
import { useStore } from "../../../../../Store/Store";
import { UploadButton } from "@bytescale/upload-widget-react";

const { Option } = Select;

// text editor modules & formats
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

export default function AddListeningQ({ groupId, bookId, bookType }) {
  const { reCall, setReCall } = useBooks();
  const { axiosSecure } = useAxiosSecure();
  const { isUser } = useStore();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);

  const options = {
    apiKey: import.meta.env.VITE_Audio_File_URL,
    maxFileCount: 1,
  };

  const handleComplete = (files) => {
    setAudioUrl({ ...files[0]?.originalFile });
  };

  // Handle form submission
  const onFinish = (values) => {
    setIsLoading(true);
    const makeData = {
      userId: isUser.user._id,
      groupId,
      bookId,
      status: values.status,
      bookType,
      title: values.title,
      description,
      audio: audioUrl,
      type: "listening",
    };

    axiosSecure
      .post("/questions/create", makeData)
      .then((res) => {
        const { data } = res;

        // recall books
        setReCall(!reCall);

        // Success handling
        message.success("Question created successfully!", 3);
        form.resetFields();
        setDescription("");
        setAudioUrl(null);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error creating book: ", error);
        message.error("An error occurred while creating the book.", 2.5);
        setIsLoading(false);
      });
  };

  // Reset form
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
        {/* Book Name or Title */}
        <Form.Item
          name="title"
          label="Question Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Audio file */}
        <Form.Item label="Audio File" name="audio" extra="Upload audio file">
          {audioUrl ? (
            <div className="flex items-center space-x-2">
              <audio src={audioUrl?.fileUrl} controls />
              <Button type="primary" danger onClick={() => setAudioUrl({})}>
                Remove Audio
              </Button>
            </div>
          ) : (
            <UploadButton options={options} onComplete={handleComplete}>
              {({ onClick }) => (
                <Button onClick={onClick}>Upload a file...</Button>
              )}
            </UploadButton>
          )}
        </Form.Item>

        {/* Passage or Description */}
        <Form.Item label="Passage or Description" className="min-h-max">
          <ReactQuill
            theme="snow"
            value={description}
            modules={modules}
            formats={formats}
            placeholder="Describe Your Job Description best ways..."
            onChange={setDescription}
            className="h-full"
          />
        </Form.Item>

        {/* Active or Inactive */}
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
