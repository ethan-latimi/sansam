import React, { useEffect, useState } from "react";
import moment from "moment";
import { FileExcelOutlined, PrinterOutlined, EllipsisOutlined, ReloadOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Card,
  Dropdown,
  Table,
  Menu,
  Tag,
  Badge,
  Modal,
  Button,
  Form,
  Select,
  InputNumber,
  Input,
} from "antd";
import Flex from "components/shared-components/Flex";
import AvatarStatus from "components/shared-components/AvatarStatus";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import ChartWidget from "components/shared-components/ChartWidget";
import { COLORS } from "constants/ChartConstant";

export const tableColumns = [
  {
    title: "거래 내용",
    dataIndex: "name",
    key: "name",
    render: (_, record) => (
      <div className="d-flex align-items-center">
        <span className="ml-2">{record.content === "" ? "내용 없음" : record.content}</span>
      </div>
    ),
  },
  {
    title: "날짜",
    dataIndex: "created",
    key: "created",
    render: (_, record) => <span>{moment(record.created).format("YYYY-MM-DD")}</span>,
  },
  {
    title: "가격",
    dataIndex: "amount",
    key: "amount",
    render: (_, record) => (
      <NumberFormat displayType={"text"} value={record.amount} prefix={"₩"} thousandSeparator={true} />
    ),
  },
  {
    title: "주문 번호",
    dataIndex: "order",
    key: "order",
    render: (_, record) => <span>{record.order ? record.order : "없음"}</span>,
  },
  {
    title: "고객",
    dataIndex: "customerName",
    key: "customerName",
    render: (_, record) => <span>{record.customerName ? record.customerName : "없음"}</span>,
  },
  {
    title: () => <div className="text-right">입/출금</div>,
    key: "type",
    render: (_, record) => (
      <div className="text-right">
        <Tag className="mr-0" color={record.type === "deposit" ? "cyan" : "volcano"}>
          {record.type == "deposit" ? "입금" : "출금"}
        </Tag>
      </div>
    ),
  },
];

const getPaymentStatus = (status) => {
  if (status === true) {
    return "success";
  }
  if (status === false) {
    return "warning";
  }
  return "";
};

const getShippingStatus = (status) => {
  if (status === true) {
    return "blue";
  }
  if (status === false) {
    return "cyan";
  }
  return "";
};

export const orderTableColumns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "고객",
    dataIndex: "customerName",
    render: (_, record) => (
      <Flex>
        <AvatarStatus size={30} name={record.customerName} />
      </Flex>
    ),
  },
  {
    title: "받는 사람",
    dataIndex: "receiver",
    render: (_, record) => (
      <Flex>
        <AvatarStatus size={30} name={record.receiver} />
      </Flex>
    ),
  },
  {
    title: "날짜",
    dataIndex: "created",
    render: (_, record) => <span>{moment(record.created).format("YYYY-MM-DD")}</span>,
  },
  {
    title: "주문 현황",
    dataIndex: "orderStatus",
    render: (_, record) => (
      <>
        <Tag color={getShippingStatus(record.isDelivered)}>{record.isDelivered ? "배송 완료" : "배송 대기"}</Tag>
      </>
    ),
  },
  {
    title: "결제 현황",
    dataIndex: "paymentStatus",
    render: (_, record) => (
      <>
        <Badge status={getPaymentStatus(record.isPaid)} />
        <span>{record.isPaid ? "결제 완료" : "결제 대기"}</span>
      </>
    ),
  },
  {
    title: "총 가격",
    dataIndex: "price",
    render: (_, record) => (
      <span className="font-weight-semibold">
        <NumberFormat displayType={"text"} value={record.price} prefix={"₩"} thousandSeparator={true} />
      </span>
    ),
  },
];

export const WeeklyRevenue = ({ monthlySales, yearlySales }) => {
  const { direction } = useSelector((state) => state.theme);
  const series = [
    {
      name: "Earning",
      data: monthlySales,
    },
  ];
  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  let newDate = new Date();
  let year = newDate.getFullYear();
  return (
    <Card>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={8}>
          <Flex className="h-100" flexDirection="column" justifyContent="between">
            <div>
              <h4 className="mb-0">연간 매출</h4>
              <span className="text-muted">{year}년도</span>
            </div>
            <div className="mb-4">
              <h1 className="font-weight-bold">{yearlySales}만원</h1>
              <p className="text-success">
                <span>{year}년도 현재 매출</span>
              </p>
              <p>그래프: 월별 매출 현황 및 분석도</p>
            </div>
          </Flex>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16}>
          <ChartWidget
            card={false}
            series={series}
            xAxis={months}
            title="Unique Visitors"
            height={"346"}
            type="bar"
            customOptions={{ colors: COLORS }}
            direction={direction}
          />
        </Col>
      </Row>
    </Card>
  );
};

export const latestTransactionOption = (
  <Menu>
    <Menu.Item key="0">
      <span>
        <div className="d-flex align-items-center">
          <ReloadOutlined />
          <span className="ml-2">Refresh</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="1">
      <span>
        <div className="d-flex align-items-center">
          <PrinterOutlined />
          <span className="ml-2">Print</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="12">
      <span>
        <div className="d-flex align-items-center">
          <FileExcelOutlined />
          <span className="ml-2">Export</span>
        </div>
      </span>
    </Menu.Item>
  </Menu>
);

export const cardDropdown = (menu) => (
  <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
    <a href="/#" className="text-gray font-size-lg" onClick={(e) => e.preventDefault()}>
      <EllipsisOutlined />
    </a>
  </Dropdown>
);

export const TopProduct = ({ data }) => (
  <Card title="상품 순위">
    {data.map((elm, idx) => (
      <Flex className="w-100 py-3" justifyContent="between" alignItems="center" key={elm.name}>
        <Row>
          <span style={{ fontWeight: "800" }}>{idx + 1}위</span>
          <AvatarStatus shape="square" name={elm.name} />
        </Row>
        <Flex>
          <div className="mr-3 text-right">
            <NumberFormat prefix={"₩"} value={elm.soldPrice} thousandSeparator={true} displayType="text" />
          </div>
        </Flex>
      </Flex>
    ))}
  </Card>
);
export const RecentOrder = ({ recentOrderData }) => (
  <Card title="최근 주문내역">
    <Table pagination={false} columns={orderTableColumns} dataSource={recentOrderData} rowKey="id" />
  </Card>
);

export const AddModal = ({ handleOk, handleCancel, onFinish, modal }) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "입력이 필요합니다.",
    types: {
      number: "숫자를 입력해 주세요",
    },
    number: {
      range: "Must be between ${min} and ${max}",
    },
  };
  return (
    <Modal
      title="Basic Modal"
      visible={modal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          취소
        </Button>,
      ]}
    >
      <Form {...layout} name="addTransaction" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={"type"} initialValue={"deposit"} label="입/출금" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="deposit">입금</Select.Option>
            <Select.Option value="expense">출금</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name={"amount"} initialValue={0} label="가격" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name={"content"} initialValue={"내용 없음"} label="내용" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            제출
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const DetailModal = ({ handleOk, handleCancel, modal, onDelete, onUpdate, detail }) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "입력이 필요합니다.",
    types: {
      number: "숫자를 입력해 주세요",
    },
    number: {
      range: "Must be between ${min} and ${max}",
    },
  };
  useEffect(() => {
    return () => {
      detail = "null";
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
      <Form {...layout} name="addTransaction" onFinish={onUpdate} validateMessages={validateMessages}>
        <Form.Item name={"id"} initialValue={detail ? detail.id : null} style={{ display: "none" }}>
          <InputNumber disabled />
        </Form.Item>
        <Form.Item
          name={"type"}
          initialValue={detail ? detail.type : "입금"}
          label="입/출금"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="deposit">입금</Select.Option>
            <Select.Option value="expense">출금</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={"amount"}
          initialValue={detail ? detail.amount : "0"}
          label="가격"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name={"order"} initialValue={detail ? detail.order : null} label="주문번호">
          <InputNumber min={0} disabled />
        </Form.Item>
        <Form.Item
          name={"content"}
          initialValue={detail ? detail.content : "0"}
          label="내용"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            수정
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
