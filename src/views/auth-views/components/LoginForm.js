import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { signIn, showLoading, showAuthMessage, hideAuthMessage } from "redux/actions/Auth";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

export const LoginForm = (props) => {
  let history = useHistory();

  const {
    otherSignIn,
    showForgetPassword,
    hideAuthMessage,
    showLoading,
    extra,
    signIn,
    token,
    loading,
    redirect,
    showMessage,
    message,
    allowRedirect,
  } = props;

  const onLogin = (values) => {
    showLoading();
    signIn(values);
  };

  useEffect(() => {
    if (token !== null && allowRedirect) {
      history.push(redirect);
    }
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 3000);
    }
  });

  const renderOtherSignIn = (
    <div>
      <Divider>
        <span className="text-muted font-size-base font-weight-normal">Latimi Sourced</span>
      </Divider>
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        <Alert type="error" showIcon message={message}></Alert>
      </motion.div>
      <Form layout="vertical" name="login-form" onFinish={onLogin}>
        <Form.Item
          name="username"
          label="아이디"
          rules={[
            {
              required: true,
              message: "Please input your username",
            },
          ]}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label={
            <div className={`${showForgetPassword ? "d-flex justify-content-between w-100 align-items-center" : ""}`}>
              <span>비밀번호</span>
            </div>
          }
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            로그인
          </Button>
        </Form.Item>
        {otherSignIn ? renderOtherSignIn : null}
        {extra}
      </Form>
    </>
  );
};

LoginForm.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

LoginForm.defaultProps = {
  otherSignIn: true,
  showForgetPassword: false,
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  signIn,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
