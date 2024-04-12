import React, { useEffect } from "react";
import AvatarStatus from "components/shared-components/AvatarStatus";
import Flex from "components/shared-components/Flex";
import { Button, Card, Form, Input, InputNumber, Modal, Select, Table } from "antd";
import { Option } from "antd/lib/mentions";

export const DetailModal = ({
  handleOk,
  handleCancel,
  modal,
  onDelete,
  onUpdate,
  detail,
  onCreate,
  setDetail,
  category,
}) => {
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
  useEffect(() => {
    return () => {
      detail = "null";
      setDetail(undefined);
    };
  }, []);
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
            if (detail) {
              onDelete(detail.id);
            }
          }}
        >
          삭제
        </Button>,
        <Button key="back" onClick={handleCancel}>
          취소
        </Button>,
      ]}
    >
      <Form
        {...layout}
        name="addTransaction"
        onFinish={detail ? onUpdate : onCreate}
        validateMessages={validateMessages}
      >
        <Form.Item name={"id"} initialValue={detail ? detail.id : null} style={{ display: "none" }}>
          <InputNumber disabled />
        </Form.Item>
        <Form.Item name={"name"} initialValue={detail ? detail.name : ""} label="상품" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={"category"}
          initialValue={detail ? detail.category : null}
          label="카테고리"
          rules={[{ required: true }]}
        >
          <Select className="w-100" style={{ minWidth: 180 }}>
            {category
              ? category.result.map((elm, idx) => (
                  <Select.Option key={idx} value={elm.id}>
                    {elm.name}
                  </Select.Option>
                ))
              : ""}
          </Select>
        </Form.Item>
        <Form.Item name={"qty"} initialValue={detail ? detail.qty : ""} label="수량">
          <InputNumber min={0} style={{ width: 200 }} />
        </Form.Item>
        <Form.Item name={"price"} initialValue={detail ? detail.price : ""} label="가격">
          <InputNumber min={0} style={{ width: 200 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            {detail != null ? "수정" : "생성"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
