import { PlusOutlined } from "@ant-design/icons";
import { Form, Image, Input, Typography, Upload } from "antd";
import axios from "axios";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import ExamContainer from "../../../../Components/ExamContainer";
import Img from "../../../../Components/Img";

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

// find image file
const findFiles = (answerUser, questionId) => {
  const answer = answerUser.find((answer) => answer.questionId === questionId);
  if (answer?.imageStore?.url) {
    return [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: answer?.imageStore?.url,
      },
    ];
  }

  return [];
};

export default function ListeningQItem({
  questionActive = {},
  setAnswerUser,
  answerUser,
  setWordCount,
  maxWordLimit,
  wordCount,
}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [imageFile, setImageFile] = useState(
    findFiles(answerUser, questionActive._id)
  );
  const [imageStore, setImageStore] = useState({});
  const image_hosting_url = import.meta.env.VITE_Image_URL;

  useEffect(() => {
    // remove image if user change question
    return () => {
      imgClean();
    };
  }, []);

  // set image file
  useEffect(() => {
    setImageFile(findFiles(answerUser, questionActive._id));
  }, [questionActive]);

  // Image Clean System
  function imgClean() {
    setImageFile([]);
    setImageStore({});
  }

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
    if (!file) return;

    setImageFile({
      uid: "-xxx",
      percent: 50,
      name: "image.png",
      status: "uploading",
    });

    const formData = new FormData();
    formData.append("image", file?.originFileObj);

    try {
      setImageFile([
        {
          uid: "-xxx",
          percent: 75,
          name: "image.png",
          status: "uploading",
        },
      ]);
      const response = await axios.post(image_hosting_url, formData);
      setImageFile([
        {
          uid: "-xxx",
          percent: 100,
          name: "image.png",
          status: "uploading",
        },
      ]);

      // image url & remove url
      const imgLink = response.data.data.display_url;
      const delete_url = response.data.data.delete_url;

      setImageStore({
        url: imgLink,
        delete_url: delete_url,
      });

      setImageFile([
        {
          uid: "-xxx",
          percent: 100,
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
    imgClean();
    // remove imgbb image
    if (imageStore.delete_url) {
      axios
        .delete(imageStore.delete_url)
        .then((res) => {
          imgClean();
        })
        .catch((error) => {
          imgClean();
        });
    } else {
      imgClean();
    }
  };

  // word count
  const handleWordCount = (e) => {
    const userText = e.target.value;

    const words = userText
      ?.trim()
      ?.split(/\s+/)
      ?.filter((word) => word.length > 0);

    setWordCount(words.length);

    const updatedAnswers = answerUser.filter(
      (answer) => answer.questionId !== questionActive._id
    );

    setAnswerUser([
      ...updatedAnswers,
      {
        questionId: questionActive._id,
        userAnswer: userText || "",
        imageStore: imageStore || {},
      },
    ]);
  };

  // set imageStore to setAnswerUser
  useEffect(() => {
    if (
      answerUser?.find((answer) => answer.questionId === questionActive._id)
    ) {
      setAnswerUser((prev) => {
        return prev.map((answer) => {
          if (imageStore.url && answer.questionId === questionActive._id) {
            return {
              ...answer,
              imageStore: imageStore,
            };
          } else {
            return answer;
          }
        });
      });
    }
  }, [imageStore]);

  return (
    <>
      <ExamContainer>
        {/* question passage */}
        <div className="text-wrap">
          {/* question title */}
          <h1 className="text-lg font-semibold">{questionActive?.title}</h1>

          {/* question passage */}
          <article
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(questionActive?.description),
            }}
            className="mt-4 text-wrap text-full break-words"
          ></article>

          {/* audio player */}
          {questionActive?.audio && (
            <audio controls>
              <source src={questionActive?.audio?.fileUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>

        {/* question input */}
        <div>
          {/* word count textarea */}
          <Form.Item name="userAnswer" label="Write your Answer:">
            <Input.TextArea
              rows={10}
              onChange={handleWordCount}
              value={
                answerUser?.find(
                  (answer) => answer?.questionId === questionActive?._id
                )?.userAnswer
              }
            />
            <Typography.Text
              // type={wordCount > maxWordLimit ? "danger" : "secondary"}
              className="float-right"
            >
              {/* {wordCount}/{maxWordLimit} words */}
              {wordCount} words
            </Typography.Text>
          </Form.Item>

          {/* Photo Upload */}
          <Form.Item label="Upload Your Hand Write Answer">
            <Upload
              listType="picture-card"
              fileList={imageFile}
              onPreview={handlePreview}
              onChange={handleImageChange}
              onRemove={removeImage}
              allowClear
            >
              {imageFile?.length >= 1 ? null : uploadButton}
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
        </div>
      </ExamContainer>
    </>
  );
}
