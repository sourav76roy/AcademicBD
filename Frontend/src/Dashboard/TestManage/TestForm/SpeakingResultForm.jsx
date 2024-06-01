import { Button, Collapse, Divider, Form, Input } from "antd";
import { useStore } from "../../../Store/Store";

export default function SpeakingResultForm({
  result,
  setReCall,
  reCall,
  isLoading,
  setIsLoading,
}) {
  const { updateUserResult } = useStore();
  const [form] = Form.useForm();

  // console.log("result 12 ", result);

  // show day-month-years and time
  const testDate = new Date(result?.createdOn).toLocaleDateString();
  const testTime = new Date(result?.createdOn).toLocaleTimeString();

  const items = result?.speakingQuestions?.map((question, index) => {
    const answer = result?.answers?.find(
      (answer) => answer?.questionId === question?._id
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

          {question?.image?.url && (
            <img
              src={question?.image?.url}
              alt={question?.title}
              style={{ maxWidth: "100%" }}
            />
          )}

          <Divider>
            <p className="my-6">User Answer</p>
          </Divider>

          {answer && (
            <>
              <div>
                <h2 className="mb-4">
                  <strong>Typing Answer: </strong> {answer?.userAnswer}
                </h2>

                <div className="mb-4">
                  <strong className="text-left ">Voice Recording: </strong>
                  {answer?.audioURL?.fileUrl && (
                    <audio
                      controls
                      src={answer?.audioURL?.fileUrl}
                      style={{ width: "100%" }}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ),
    };
  });

  //  finish
  const onFinish = (values) => {
    setIsLoading(true);

    const finishData = {
      marks: values.totalMarks,
      message: values.message,
      type: "speaking",
    };

    console.log("finishData ", finishData);

    if (finishData?.message || finishData?.marks) {
      // call api to update total marks
      updateUserResult(result._id, finishData);

      // form clear
      form.resetFields();

      setReCall(!reCall);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {/* title section */}
      <div className="flex items-center justify-center gap-5 mb-5">
        <h1 className="text-lg font-semibold">Speaking Result Form</h1> --
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
            form={form}
            name="question-answer"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
              totalMarks: 0,
              message: "",
            }}
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
              <Input type="number" />
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
              <Input.TextArea />
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
