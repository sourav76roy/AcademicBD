import { Card, Form, Input, Select } from "antd";
const { Option } = Select;

// desc: Boolean type - true or false or Not Sure
export default function BooleanType() {
  return (
    <>
      {/* Question or Title */}
      <Form.Item
        name="title"
        label="Write Question"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Question Options - serial + input + correct answer write in select option */}
      <Form.Item
        label="Correct Answer"
        rules={[
          {
            required: true,
          },
        ]}
        name="correctAnswer"
      >
        <Select placeholder="Select Correct Answer" allowClear>
          <Option value="true"> True </Option>
          <Option value="false"> False </Option>
          <Option value="notSure"> Not Sure </Option>
        </Select>
      </Form.Item>
    </>
  );
}
