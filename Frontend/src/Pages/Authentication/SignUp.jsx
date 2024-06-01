import { Button, Checkbox, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../Components/Container";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useStore } from "../../Store/Store";

const { Option } = Select;

const SignUp = () => {
  const { getLogin, isUser } = useStore();
  const { axiosSecure } = useAxiosSecure();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // console.log("isUser ", isUser);

  // Desc: if user is already logged in, redirect to home page
  if (isUser?.isLogin) {
    navigate("/");
  }

  // Desc: onFinish function for the form
  const onFinish = (values) => {
    setIsLoading(true);
    const {
      agreement,
      confirm,
      email,
      gender,
      intro,
      name,
      password,
      phone,
      prefix,
      location,
    } = values;

    setError(null);

    // empty and null check
    if (
      !agreement ||
      !confirm ||
      !email ||
      !gender ||
      !intro ||
      !name ||
      !password ||
      !phone ||
      !prefix ||
      !location ||
      agreement === ""
    )
      return;

    // password check
    if (password !== confirm) {
      setError("Password do not match");
      return;
    }

    // now data structure is ready to send to the server
    const data = {
      name,
      email,
      password,
      phone: `${prefix}${phone}`,
      gender,
      location,
      intro,
      agreement,
      image: {},
      payment: {},
    };

    if (data) {
      // console.log(data);

      axiosSecure
        .post("/auth/register", data)
        .then((res) => {
          const {
            token,
            email,
            gender,
            intro,
            location,
            name,
            phone,
            _id,
            role,
            image,
          } = res?.data?.data;
          // console.log("res?.data?.data ", res?.data?.data);

          // save user data to local storage
          localStorage.setItem(
            "authUser",
            JSON.stringify({
              token,
              email,
              gender,
              intro,
              location,
              name,
              phone,
              role,
              _id,
              image,
            })
          );

          // redirect to home page
          getLogin(
            { email, gender, intro, location, name, phone, _id },
            token,
            true
          );
          setIsLoading(false);
        })
        .catch((err) => {
          // console.log("error ", err);
          // show error message
          if (err.response) {
            setError(err.response.data.message);
          }

          setIsLoading(false);
        });
    } else {
      // console.log("Login failed");
    }
    // console.log("Received values of form: ", values);
  };

  // Desc: prefixSelector for phone number
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="+88">+88</Option>
        <Option value="+86">+86</Option>
        <Option value="+87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Container>
      <div className="min-w-full flex items-center justify-center">
        <Form
          form={form}
          name="register"
          layout="vertical"
          className="min-w-72 w-full max-w-[400px] bg-white p-7 rounded-md shadow-md"
          onFinish={onFinish}
          scrollToFirstError
        >
          <div className="pb-10">
            <h1 className="text-2xl font-bold text-center">Sign Up</h1>
          </div>

          {/* Name */}
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* email */}
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          {/* Location */}
          <Form.Item
            name="location"
            label="Location"
            rules={[
              {
                required: true,
                message: "Please input your location!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="intro"
            label="Intro"
            rules={[
              {
                required: true,
                message: "Please input Intro",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item
            className="text-center"
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
          >
            <Checkbox>I have read the agreement</Checkbox>
          </Form.Item>

          {/* show error */}
          {error && (
            <Form.Item>
              <p className="text-red-500 text-center">{error}</p>
            </Form.Item>
          )}

          {/* submit button */}
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Container>
  );
};

export default SignUp;
