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
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useBooks from "../../../Hooks/useBooks";
import { useStore } from "../../../Store/Store";
const { Option } = Select;

// tail layout
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

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

export default function BookUpdate({ initialValues = {} }) {
  const { reCall, setReCall } = useBooks();
  const { axiosSecure } = useAxiosSecure();
  const { isUser } = useStore();
  // Image upload system
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [imageFile, setImageFile] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
    },
  ]);
  const [imageStore, setImageStore] = useState({});
  // Image hosting api
  const image_hosting_url = import.meta.env.VITE_Image_URL;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const imgClean = () => {
    setImageFile([]);
    setImageStore({});
  };

  // Image Base64
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

  // Image Upload System
  const handleImageChange = async ({ file }) => {
    if (!file?.originFileObj) return;

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

      // imgbb store image get url and set in imageFile
      // const imgLink = response.data.data.url;
      // image url & remove url
      const imgLink = response.data.data.display_url;
      const delete_url = response.data.data.delete_url;

      // console.log("imgLink ", imgLink);

      setImageStore({
        url: imgLink,
        delete_url: delete_url,
      });

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

  // image remove in imageFile
  const removeImage = () => {
    // console.log("imageFile 55", imageFile);
    imgClean();

    // remove imgbb image
    if (imageStore?.delete_url) {
      axios
        .delete(imageStore?.delete_url)
        .then((res) => {
          // console.log("delete success", res);
          imgClean();
        })
        .catch((error) => {
          // console.error("Error deleting image: ", error);
          imgClean();
        });
    }
  };

  // Form submit
  const onFinish = (values) => {
    setIsLoading(true);

    const finishData = {
      userId: isUser.user._id,
      title: values?.title,
      testType: values?.testType,
      description: values?.description,
      status: values?.status,
      image: imageStore,
      payment: values.payment,
    };

    // console.log("finishData", finishData);
    axiosSecure
      .put(`/book/${initialValues?._id}`, finishData)
      .then((res) => {
        // console.log("res create", res);
        const { data } = res;

        // recall books
        setReCall(!reCall);

        // Success handling
        message.success("Book created successfully!", 2.5);
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
    imgClean();
    form.resetFields();
  };

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
        initialValues={{
          title: initialValues?.title,
          description: initialValues?.description,
          testType: initialValues?.testType,
          status: initialValues?.status,
          payment: initialValues?.payment,
        }}
      >
        {/* Book Name or Title */}
        <Form.Item
          name="title"
          label="Book Name Or Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Book Description */}
        <Form.Item
          name="description"
          label="Book Description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        {/* Test type */}
        <Form.Item
          name="testType"
          label="Test Type"
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
            <Option value="reading"> Reading Test</Option>
            <Option value="writing"> Writing Test</Option>
            <Option value="listening"> Listening Test</Option>
            <Option value="speaking"> Speaking Test</Option>
          </Select>
        </Form.Item>

        {/* Photo Upload */}
        <Form.Item label="Book Cover">
          <Upload
            listType="picture-card"
            fileList={imageFile}
            onPreview={handlePreview}
            onChange={handleImageChange}
            onRemove={removeImage}
            allowClear
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
              alt="Preview"
            />
          )}
        </Form.Item>

        {/* payment status */}
        <Form.Item
          name="payment"
          label="Payment Status"
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
            <Option value="paid"> Paid </Option>
            <Option value="free"> free </Option>
          </Select>
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

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Update Book
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
