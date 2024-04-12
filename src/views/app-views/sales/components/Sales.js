import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Carousel,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
  Tag,
} from "antd";
import { SearchOutlined, FileExcelOutlined } from "@ant-design/icons";
import AvatarStatus from "components/shared-components/AvatarStatus";
import Flex from "components/shared-components/Flex";
import NumberFormat from "react-number-format";
import moment from "moment";
import utils from "utils";
import TextArea from "antd/lib/input/TextArea";
import { API_BASE_URL } from "configs/AppConfig";
import { useHistory } from "react-router-dom";
import "moment/locale/ko";
import locale from "antd/es/date-picker/locale/ko_KR";
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

const getPaymentMethod = (status) => {
  if (status === "cash") {
    return "현금";
  } else if (status === "card") {
    return "농장 카드";
  } else if (status === "transfer") {
    return "이체";
  } else if (status === "naver") {
    return "네이버 페이";
  } else if (status === "homepageCard") {
    return "홈피 카드";
  } else {
    return "";
  }
};
export const orderTableColumns = [
  {
    title: "주문번호",
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
    sorter: (a, b) => utils.antdTableSorter(a, b, "customerName"),
  },
  {
    title: "받는 사람",
    dataIndex: "receiver",
    render: (_, record) => (
      <Flex>
        <AvatarStatus size={30} name={record.receiver} />
      </Flex>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "receiver"),
  },
  {
    title: "날짜",
    dataIndex: "created",
    render: (_, record) => <span>{moment(record.created).format("YYYY-MM-DD")}</span>,
    sorter: (a, b) => utils.antdTableSorter(a, b, "created"),
  },
  {
    title: "주문 현황",
    dataIndex: "orderStatus",
    render: (_, record) => (
      <>
        <Tag color={getShippingStatus(record.isDelivered)}>{record.isDelivered ? "배송 완료" : "배송 대기"}</Tag>
      </>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "orderStatus"),
  },
  {
    title: "결제 현황",
    dataIndex: "paymentStatus",
    render: (_, record) => (
      <>
        <Badge status={getPaymentStatus(record.isPaid)} />
        <span>{record.isPaid ? (record.isPaid == "refund" ? "환불" : "결제 완료") : "결제 대기"}</span>
      </>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "paymentStatus"),
  },
  {
    title: "결제 방법",
    dataIndex: "payment",
    render: (_, record) => (
      <span className="font-weight-semibold">{record.payment ? getPaymentMethod(record.payment) : " "}</span>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "payment"),
  },
  {
    title: "총 가격",
    dataIndex: "price",
    render: (_, record) => (
      <span className="font-weight-semibold">
        <NumberFormat displayType={"text"} value={record.price} prefix={"₩"} thousandSeparator={true} />
      </span>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "price"),
  },
];

export const RecentOrder = ({ recentOrderData, getOrderList, showDetailModal, pages }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const history = useHistory();
  const [words, setWords] = useState({});
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY-MM-DD";
  const paymentStatusList = [
    {
      name: "결제 완료",
      value: true,
    },
    { name: "결제 대기", value: false },
    { name: "환불", value: "refund" },
  ];
  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows);
      setSelectedRowKeys(key);
    },
  };
  const onSearch = (e) => {
    let value = e.currentTarget.value;
    value = { value: value };
    if (value !== "") {
      setWords(value);
    }
    setSelectedRowKeys([]);
  };
  const handlePage = (page) => {
    setWords((prev) => {
      return { ...prev, page: page.current };
    });
  };

  const handleDate = (date) => {
    if (date) {
      const list = { start: date[0].format("YYYY-MM-DD"), end: date[1].format("YYYY-MM-DD") };
      setWords(list);
    }
  };

  const handleShowStatus = (value) => {
    setWords((prev) => {
      return { ...prev, status: value };
    });
  };
  useEffect(() => {
    console.log(words);
    getOrderList(words);
  }, [words]);
  return (
    <Card title="주문내역">
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input placeholder="고객/주문번호" prefix={<SearchOutlined />} onPressEnter={(e) => onSearch(e)} />
          </div>
          <div className="mb-3">
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={handleShowStatus}
              placeholder="Status"
            >
              <Select.Option value="">전체 </Select.Option>
              {paymentStatusList.map((elm) => (
                <Select.Option key={elm.value} value={elm.value}>
                  {elm.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div style={{ marginLeft: "10px" }}>
            <RangePicker format={dateFormat} onChange={handleDate} />
          </div>
        </Flex>
        <div>
          <Button
            type="primary"
            icon={<FileExcelOutlined />}
            onClick={() => {
              if (selectedRows.length != 0) {
                history.push({ pathname: "/app/events/invoice", state: { selectedRows } });
              }
            }}
            block
          >
            프린트
          </Button>
        </div>
      </Flex>
      <Table
        pagination={{ total: pages * 10 }}
        columns={orderTableColumns}
        dataSource={recentOrderData}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          type: "checkbox",
          preserveSelectedRowKeys: false,
          ...rowSelection,
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              showDetailModal(record);
            },
          };
        }}
        onChange={handlePage}
        rowKey="id"
      />
    </Card>
  );
};

export const DetailModal = ({
  handleOk,
  handleCancel,
  modal,
  onDelete,
  onUpdate,
  detail,
  onCreate,
  setDetail,
  fields,
  orderItems,
  orderImages,
  qtyProduct,
}) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const history = useHistory();
  const validateMessages = {
    required: "입력이 필요합니다.",
    types: {
      number: "숫자를 입력해 주세요",
    },
  };
  const columns = [
    {
      title: "상품",
      dataIndex: "name",
    },
    {
      title: "갯수",
      dataIndex: "qty",
    },
    {
      title: "가격",
      dataIndex: "price",
    },
  ];
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const goToEdit = () => {
    orderItems.forEach((element) => {
      qtyProduct(element, "plus");
    });
    history.push({ pathname: "/app/sales/edit", state: { orderPk: detail.id, edit: true, orderItems } });
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
      width={800}
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
        fields={fields}
        name="addTransaction"
        onFinish={onUpdate}
        validateMessages={validateMessages}
        style={{ marginTop: "10px" }}
      >
        <Form.Item name={"id"} initialValue={detail ? detail.id : null} hidden>
          <InputNumber disabled />
        </Form.Item>
        <Form.Item name={"address"} label={"주소"}>
          <TextArea height={"6.25em"} />
        </Form.Item>
        <Form.Item justify={"center"} name={"isPaid"} label="결제">
          <Select>
            <Select.Option value={true} style={{ color: "green" }}>
              결제 완료
            </Select.Option>
            <Select.Option value={false}>결제 대기 </Select.Option>
            <Select.Option value={"refund"}>환불 </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name={"isDelivered"} initialValue={detail ? detail.isDelivered : ""} label="배달">
          <Select>
            <Select.Option value={true} style={{ color: "green" }}>
              배달 완료
            </Select.Option>
            <Select.Option value={false}>배달 대기 </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name={"sellerMemo"} label={"판매자 메모"}>
          <TextArea />
        </Form.Item>
        <Form.Item name={"customerMemo"} label={"고객 메모"}>
          <TextArea />
        </Form.Item>
        <Form.Item name={"created"} label={"날짜"}>
          <DatePicker locale={locale} />
        </Form.Item>
        <Form.Item name={"receiver"} label={"받는 사람"}>
          <Input></Input>
        </Form.Item>
        <Form.Item name={"receiverPhoneNumber"} label={"받는사람 전화번호"}>
          <Input></Input>
        </Form.Item>
        <Form.Item name={"payment"} label={"결제 방법"}>
          <Select>
            <Select.Option value={"cash"}>현금</Select.Option>
            <Select.Option value={"transfer"}>계좌 이체</Select.Option>
            <Select.Option value={"card"}>농장 카드</Select.Option>
            <Select.Option value={"naver"}>네이버 페이</Select.Option>
            <Select.Option value={"homepageCard"}>홈피 카드</Select.Option>
          </Select>
        </Form.Item>
        <Table columns={columns} rowKey={"id"} dataSource={orderItems} />
        <Row justify="center">
          <Button key={"updateProduct"} onClick={goToEdit} style={{ marginBottom: "16px" }}>
            가격 수정
          </Button>
          <Button key={"update"} type="primary" style={{ marginBottom: "16px", marginLeft: "10px" }} htmlType="submit">
            간편 수정
          </Button>
        </Row>
      </Form>
      {orderImages ? (
        <Carousel autoplay>
          {orderImages.map((i) => (
            <Image key={i.id} src={`${i.image}`}></Image>
          ))}
        </Carousel>
      ) : (
        ""
      )}
    </Modal>
  );
};
