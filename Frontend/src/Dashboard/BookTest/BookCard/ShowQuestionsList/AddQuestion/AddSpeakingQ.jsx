import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Upload, message } from "antd";
import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import useBooks from "../../../../../Hooks/useBooks";
import { useStore } from "../../../../../Store/Store";
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

export default function AddSpeakingQ({ groupId, bookId, bookType }) {
  const { reCall, setReCall } = useBooks();
  const { axiosSecure } = useAxiosSecure();
  const { isUser } = useStore();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  // Image upload system
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [imageFile, setImageFile] = useState([]);
  const [imageStore, setImageStore] = useState({});
  // Image hosting api
  const image_hosting_url = import.meta.env.VITE_Image_URL;

  const imgClean = () => {
    setImageFile([]);
    setImageStore({});
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
      setImageStore({
        delete_url: response.data.data.delete_url,
        url: imgLink,
      });
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

  // TODO: show error message

  const onFinish = (values) => {
    setIsLoading(true);
    const makeData = {
      userId: isUser.user._id,
      groupId,
      bookId,
      status: values?.status,
      bookType: bookType,
      title: values.title,
      description,
      image: imageStore,
      type: "speaking",
    };

    axiosSecure
      .post("/questions/create", makeData)
      .then((res) => {
        // console.log("res create", res);
        const { data } = res;

        // recall books
        setReCall(!reCall);

        // Success handling
        message.success("Question created successfully!", 3);
        // success();
        form.resetFields();
        setDescription("");
        imgClean();
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
            placeholder="Describe Your Job Description best ways..."
            onChange={setDescription}
            className="h-full"
          />
        </Form.Item>

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
