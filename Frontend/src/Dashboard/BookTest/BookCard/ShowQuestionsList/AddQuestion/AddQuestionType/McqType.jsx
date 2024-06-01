import { Card, Form, Input, Select } from "antd";
const { Option } = Select;

export default function McqType() {
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

      {/* Question Options - serial + input + correct answer */}
      <Form.Item
        label="Question Options"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Card>
          <Form.Item
            name="A"
            label="A"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="B"
            label="B"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="C"
            label="C"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="D"
            label="D"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="correct"
            label="Correct Answer"
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
              <Option value="A"> A </Option>
              <Option value="B"> B </Option>
              <Option value="C"> C </Option>
              <Option value="D"> D </Option>
            </Select>
          </Form.Item>
        </Card>
      </Form.Item>
    </>
  );
}
