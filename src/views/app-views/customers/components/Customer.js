import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Form, Input, InputNumber, Modal, Select, Space, Table, Typography } from "antd";
import AvatarStatus from "components/shared-components/AvatarStatus";
import Flex from "components/shared-components/Flex";
import utils from "utils";
import { Option } from "antd/lib/mentions";
import NumberFormat from "react-number-format";

export const customerTableColumn = [
  {
    title: "ID",
    dataIndex: "id",
    sorter: (a, b) => utils.antdTableSorter(a, b, "id"),
  },
  {
    title: "고객",
    dataIndex: "customer",
    render: (_, record) => (
      <Flex>
        <AvatarStatus size={30} name={record.name} subTitle={record.company} />
      </Flex>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
  },
  {
    title: "주소",
    dataIndex: "address",
    render: (_, record) => <span>{record.address}</span>,
    sorter: (a, b) => utils.antdTableSorter(a, b, "address"),
  },
  {
    title: "전화번호",
    dataIndex: "phoneNumber",
    render: (_, record) => (
      <>
        <span>{record.phoneNumber}</span>
      </>
    ),
  },
  {
    title: "전화번호 2",
    dataIndex: "secondPhoneNumber",
    render: (_, record) => (
      <>
        <span>{record.secondPhoneNumber}</span>
      </>
    ),
  },
  {
    title: "누적 구매",
    dataIndex: "totalSpend",
    render: (_, record) => (
      <NumberFormat prefix={"₩"} value={record.totalSpend} thousandSeparator={true} displayType="text" />
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "totalSpend"),
  },
  {
    title: "소개자",
    dataIndex: "reference",
    render: (_, record) => <span className="font-weight-semibold">{record.reference}</span>,
  },
];

export const CustomerList = ({ customerData, showDetailModal }) => (
  <Card title="고객 목록">
    <Table
      pagination={true}
      columns={customerTableColumn}
      dataSource={customerData}
      rowKey="id"
      onRow={(record, rowIndex) => {
        return {
          onClick: () => {
            showDetailModal(record);
          },
        };
      }}
    />
  </Card>
);

export const DetailModal = ({ handleOk, handleCancel, modal, onDelete, onUpdate, detail, onCreate, setDetail }) => {
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
  const [items, setItems] = useState(["네이버", "평창산양삼랜드", "기타", " "]);
  const [name, setName] = useState("");
  let index = 0;
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const { Option } = Select;

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
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
            onDelete(detail.id);
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
        <Form.Item name={"name"} initialValue={detail ? detail.name : ""} label="이름" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={"address"}
          initialValue={detail ? detail.address : ""}
          label="주소"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={"phoneNumber"} initialValue={detail ? detail.phoneNumber : ""} label="전화번호">
          <Input maxLength={13} />
        </Form.Item>
        <Form.Item name={"secondPhoneNumber"} initialValue={detail ? detail.secondPhoneNumber : ""} label="전화번호 2">
          <Input maxLength={13} />
        </Form.Item>
        <Form.Item name={"company"} initialValue={detail ? detail.company : ""} label="회사">
          <Input type={"company"} />
        </Form.Item>
        <Form.Item name={"email"} initialValue={detail ? detail.email : ""} label="이메일">
          <Input type={"email"} />
        </Form.Item>
        <Form.Item name={"reference"} initialValue={detail ? detail.reference : ""} label="소개자">
          <Select
            style={{
              width: 300,
            }}
            placeholder="소개자 선택"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: "8px 0",
                  }}
                />
                <Space
                  align="center"
                  style={{
                    padding: "0 8px 4px",
                  }}
                >
                  <Input placeholder="경로 입력" value={name} onChange={onNameChange} />
                  <Typography.Link
                    onClick={addItem}
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    <PlusOutlined /> 추가
                  </Typography.Link>
                </Space>
              </>
            )}
          >
            {items.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            {detail ? "수정" : "생성"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
