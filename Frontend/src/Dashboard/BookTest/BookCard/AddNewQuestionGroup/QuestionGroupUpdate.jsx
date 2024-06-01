import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useBooks from "../../../../Hooks/useBooks";
import { useStore } from "../../../../Store/Store";
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

// image upload button
const uploadButton = (
  <button
    style={{
      border: 0,
      background: "none",
    }}
    type="button"
  >
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </button>
);

// desc: Add new question to the test
export default function QuestionGroupUpdate({ bookId, group }) {
  const { reCall, setReCall } = useBooks();
  const { axiosSecure } = useAxiosSecure();
  const { isUser } = useStore();
  const [form] = Form.useForm();
  const [description, setDescription] = useState(group.description || "");

  // Image upload system
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [imageFile, setImageFile] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      // default value set in url, No objects will be used. string will be used in url
      url: group?.image?.url || "",
    },
  ]);

  const [imageStore, setImageStore] = useState({});
  // Image hosting api
  const image_hosting_url = import.meta.env.VITE_Image_URL;

  const imgClean = () => {
    setImageFile([]);
    setImageStore({});
  };

  const onFinish = (values) => {
    const finishData = {
      userId: isUser.user._id,
      bookId: bookId,
      title: values.title,
      status: values.status,
      description: description,
      image: imageStore,
      totalQuestions: values.totalQuestions,
      examTime: values.examTime,
      totalMarks: values.totalMarks,
      passingMarks: values.passingMarks,
    };

    axiosSecure
      .put(`/question-group/update/${group?._id}`, finishData)
      .then((res) => {
        const { data } = res;

        // recall books
        setReCall(!reCall);
        imgClean();
        setDescription("");

        // Success handling
        message.success("Book created successfully!", 2.5);
        // success();
        form.resetFields();
      })
      .catch((error) => {
        console.error("Error creating book: ", error);
        message.error("An error occurred while creating the book.", 2.5);
      });
  };
  const onReset = () => {
    imgClean();
    setDescription("");
    form.resetFields();
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Image Preview System
  const handlePreview = async (file) => {
    // TODO: image upload issue & store book
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleImageChange = async ({ file }) => {
    setImageFile({
      uid: "-xxx",
      percent: 50,
      name: "image.png",
      status: "uploading",
    });

    const formData = new FormData();
    formData.append("image", file?.originFileObj);

    setImageFile([
      {
        uid: "-xxx",
        percent: 75,
        name: "image.png",
        status: "uploading",
      },
    ]);
    try {
      const response = await axios.post(image_hosting_url, formData);
      setImageFile([
        {
          uid: "-xxx",
          percent: 100,
          name: "image.png",
          status: "uploading",
        },
      ]);
      const imgLink = response.data.data.display_url;
      setImageFile([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: imgLink,
        },
      ]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const removeImage = () => {
    // remove imgbb image
    if (imageStore.delete_url) {
      axios
        .delete(imageStore.delete_url)
        .then((res) => {
          // console.log("delete success", res);
          imgClean();
        })
        .catch((error) => {
          console.error("Error deleting image: ", error);
          imgClean();
        });
    }
  };

  console.log("{ bookId, group } ", { bookId, group });

  return (
    <div className="py-5">
      <Form
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        layout="vertical"
        className=""
        initialValues={{
          title: group?.groupTitle,
          status: group?.status,
          totalQuestions: group?.totalQuestions,
          examTime: group?.examTime,
          totalMarks: group?.totalMarks,
          passingMarks: group?.passingMarks,
        }}
      >
        {/* Book Name or Title */}
        <Form.Item
          name="title"
          label="Group Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Description */}
        <Form.Item label="Description image">
          <Upload
            listType="picture-card"
            fileList={imageFile}
            onPreview={handlePreview}
            onChange={handleImageChange}
            onRemove={removeImage}
          >
            {imageFile.length >= 1 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </Form.Item>

        {/* passage or description */}
        <Form.Item label="Passage or Description" className="min-h-max">
          <ReactQuill
            theme="snow"
            value={description}
            modules={modules}
            formats={formats}
            ini
            placeholder="Describe Your Job Description best ways..."
            onChange={setDescription}
            className="h-full"
          />
        </Form.Item>

        {/* total Questions */}
        <Form.Item
          name="totalQuestions"
          label="Total Questions"
          className="mt-5"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        {/* exam time */}
        <Form.Item
          name="examTime"
          label="Exam Time in Minutes"
          className="mt-5"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        {/* total marks */}
        <Form.Item
          name="totalMarks"
          label="Total Marks"
          className="mt-5"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        {/* passing marks */}
        <Form.Item
          name="passingMarks"
          label="Passing Marks"
          className="mt-5"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        {/* active or inactive */}
        <Form.Item
          name="status"
          label="Status"
          className="mt-5"
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

        <Form.Item className="text-center">
          <Space>
            <Button type="primary" htmlType="submit">
              Update Group
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
