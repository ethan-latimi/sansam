import React, { useEffect, useRef, useState } from "react";
import { Badge, Button, Card, Form, Input, InputNumber, Modal, Select, Table, Tag, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { API_BASE_URL } from "configs/AppConfig";

export const UpdateModal = ({ handleOk, handleCancel, modal, onDelete, onUpdate, fields, deleteId }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [fileList, setFileList] = useState([]);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const validateMessages = {
    required: "입력이 필요합니다.",
    types: {
      number: "숫자를 입력해 주세요",
    },
  };
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };
  return (
    <Modal
      title="Basic Modal"
      visible={modal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button
          type="danger"
          key={"delete"}
          onClick={() => {
            onDelete(deleteId);
          }}
        >
          삭제
        </Button>,
        <Button key="back" onClick={handleCancel}>
          취소
        </Button>,
      ]}
    >
      <Form {...layout} fields={fields} name="addTransaction" onFinish={onUpdate} validateMessages={validateMessages}>
        <Form.Item name={"id"} hidden>
          <InputNumber disabled />
        </Form.Item>
        <Form.Item name={"title"} label="밭 이름" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={"introduction"} label="밭 정보" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={"description"} label="밭 상세 정보" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Card title="밭 사진">
          <Upload
            name="file"
            action={`${API_BASE_URL}/api/v1/farms/farm/upload/${deleteId}/`}
            headers={{
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            }}
            withCredentials={true}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Card>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            수정
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
