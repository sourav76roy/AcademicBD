import { Button, Collapse, Divider, Form, Input } from "antd";
import Img from "../../../Components/Img";
import { useStore } from "../../../Store/Store";

export default function ListeningResultForm({
  result,
  setReCall,
  reCall,
  isLoading,
  setIsLoading,
}) {
  const { updateUserResult } = useStore();
  const [form] = Form.useForm();

  // show day-month-years and time
  const testDate = new Date(result?.createdOn).toLocaleDateString();
  const testTime = new Date(result?.createdOn).toLocaleTimeString();

  const items = result?.listeningQuestions?.map((question, index) => {
    const answer = result.answers.find(
      (answer) => answer.questionId === question?._id
    );

    return {
      key: String(index + 1),
      label: `Question ${index + 1}: ${question?.title}`,
      children: (
        <div>
          <p
            className="mb-5"
            dangerouslySetInnerHTML={{ __html: question?.description }}
          />

          {/* audio div */}
          <div className="flex items-center gap-5">
            <audio src={question?.audio?.fileUrl} controls>
              <source type="audio/mpeg" />
            </audio>
          </div>

          <Divider>
            <p className="my-6">User Answer</p>
          </Divider>

          {answer && (
            <>
              <div>
                <h2 className="mb-4">
                  <strong>Typing Answer:</strong> {answer?.userAnswer}
                </h2>

                <div className="mb-4">
                  <strong className="text-left ">Hand Write:</strong>
                  <figure>
                    <Img src={answer?.imageStore?.url} alt="user answer" />
                  </figure>
                </div>
              </div>
            </>
          )}
        </div>
      ),
    };
  });

  //  finish
  const onFinish = async (values) => {
    setIsLoading(true);

    const finishData = {
      message: values.message,
      marks: values.totalMarks,
      type: "listening",
    };

    try {
      if (finishData?.message || finishData?.marks) {
        // call api to update total marks
        await updateUserResult(result?._id, finishData);

        setReCall(!reCall);
        form.resetFields();
      }
      form.resetFields();
    } catch (error) {
      console.log("error listening : ", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* title section */}
      <div className="flex items-center justify-center gap-5 mb-5">
        <h1 className="text-lg font-semibold">Listening Result Form</h1> --
        <div className="flex items-center gap-4">
          {/* date  */}
          <p>
            {testDate} - {testTime}
          </p>
        </div>
      </div>

      {/* content */}
      <div>
        <Collapse accordion items={items} />

        {/* form  */}
        <div className="border p-4 rounded-md mt-5">
          <Form
            name="control-hooks"
            onFinish={onFinish}
            // autoComplete="off"
            layout="vertical"
            form={form}
          >
            <Form.Item
              label="Total Marks"
              name="totalMarks"
              rules={[
                {
                  required: true,
                  message: "Please input your total marks!",
                },
              ]}
            >
              <Input initialValue={0} type="number" />
            </Form.Item>

            <Form.Item
              label="Message "
              name="message"
              rules={[
                {
                  required: true,
                  message: "Please input your total marks!",
                },
              ]}
            >
              <Input.TextArea initialValue={0} allowClear />
            </Form.Item>

            <Form.Item className="text-center">
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
