import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";

// desc: Fitg type - Fill in the gap
export default function FitgType() {
  return (
    <>
      {/* Question or Title */}
      <Form.Item
        name="passage"
        label="Passage Qns. Use ###(serial) wherever there is an input field"
      >
        <Input.TextArea rows={4} placeholder="Enter the passage text here" />
      </Form.Item>
      {/* Answer */}
      <Form.Item
        label="Answer"
        name="answer"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Form.List
          name="answer"
          label="Answer"
          rules={[
            {
              required: true,
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name: answer, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                  className="justify-center w-full"
                >
                  <Form.Item
                    {...restField}
                    name={[answer, "id"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing first name",
                      },
                    ]}
                    className="w-full flex-grow"
                  >
                    <Input placeholder="ID - use ###(serial) wherever there is an input field" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[answer, "answer"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing last name",
                      },
                    ]}
                    className="w-full flex-grow"
                  >
                    <Input placeholder="Answer " />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(answer)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
    </>
  );
}
