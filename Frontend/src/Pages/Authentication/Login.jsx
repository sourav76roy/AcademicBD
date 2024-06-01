import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../Components/Container";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useStore } from "../../Store/Store";

const Login = () => {
  const { axiosSecure } = useAxiosSecure();
  const navigate = useNavigate();
  const { getLogin, isUser } = useStore();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Desc: if user is already logged in, redirect to dashboard
  if (isUser?.isLogin) {
    navigate("/");
  }

  // Desc: login form component for the website
  const onFinish = (values) => {
    setIsLoading(true);
    const { email, password, remember } = values;

    // console.log("Received values of form: ", values);
    if (!email && !password) return;

    if (email && password) {
      // console.log("Login successful");

      axiosSecure
        .post("/auth/login", { email, password })
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
          } = res?.data?.data;

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
            })
          );

          // redirect to home page
          getLogin(
            { email, gender, intro, location, name, phone, _id },
            token,
            true,
            role
          );

          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          // console.log("error ", err);
          // show error message
          if (err.response) {
            setError(err.response.data.message);
          }
        });
    } else {
      // console.log("Login failed");
    }
  };

  return (
    <Container>
      <div className="min-w-full flex items-center justify-center">
        <Form
          name="normal_login"
          className="login-form min-w-96 bg-white p-7 rounded-md shadow-md"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <div className="pb-10">
            <h1 className="text-2xl font-bold text-center"> Login </h1>
          </div>

          {/* email */}
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          {/* password */}
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className="login-form-forgot" href="#">
              Forgot password
            </Link>
          </div>

          <div className="flex items-center justify-between gap-3">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <span>Or</span> <Link to="/sign-up">Register now!</Link>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
