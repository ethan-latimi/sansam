import React, { useEffect, useState } from "react";
import moment from "moment";
import { FileExcelOutlined, PrinterOutlined, PlusOutlined, EllipsisOutlined, ReloadOutlined } from "@ant-design/icons";
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
  Upload,
  Image,
  DatePicker,
} from "antd";
import Flex from "components/shared-components/Flex";
import AvatarStatus from "components/shared-components/AvatarStatus";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import ChartWidget from "components/shared-components/ChartWidget";
import { COLORS } from "constants/ChartConstant";
import { API_BASE_URL } from "configs/AppConfig";
import "moment/locale/ko";
import locale from "antd/es/date-picker/locale/ko_KR";
export const tableColumns = [
  {
    title: "제목",
    dataIndex: "title",
    key: "title",
    render: (_, record) => (
      <div className="d-flex align-items-center">
        <span className="ml-2">{record.title === "" ? "내용 없음" : record.title}</span>
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
    title: "내용",
    dataIndex: "content",
    key: "content",
    render: (_, record) => <span className="ml-2">{record.content === "" ? "내용 없음" : record.content}</span>,
  },
  {
    title: "작업자",
    dataIndex: "worker",
    key: "worker",
    render: (_, record) => <span>{record.worker ? record.worker : "없음"}</span>,
  },
  {
    title: () => <div className="text-right">날씨</div>,
    key: "type",
    render: (_, record) => (
      <div className="text-right">
        <span>{record.weather}</span>
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
  <Card title="최근 상품">
    {data.map((elm) => (
      <Flex className="w-100 py-3" justifyContent="between" alignItems="center" key={elm.name}>
        <AvatarStatus shape="square" name={elm.name} subTitle={elm.category} />
        <Flex>
          <div className="mr-3 text-right">
            <span className="text-muted">가격</span>
            <div className="mb-0 h5 font-weight-bold">
              <NumberFormat prefix={"₩"} value={elm.price} thousandSeparator={true} displayType="text" />
            </div>
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

export const AddModal = ({ handleOk, handleCancel, onFinish, modal, logPk, id, setModal }) => {
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState();
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
      title="영농 일지"
      visible={modal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="save" type="primary" onClick={handleOk}>
          저장
        </Button>,
        <Button key="back" onClick={handleCancel}>
          취소
        </Button>,
      ]}
    >
      <Form {...layout} name="addTransaction" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={"title"} initialValue={"무제"} label="제목" rules={[{ required: true }]}>
          <Input></Input>
        </Form.Item>
        <Form.Item name={"weather"} initialValue={"맑음"} label="날씨" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={"content"} label="내용" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name={"note"} label="특이사항" rules={[{ required: true }]}>
          <Input></Input>
        </Form.Item>
        <Form.Item name={"worker"} initialValue={"나"} label="작업자" rules={[{ required: true }]}>
          <Input></Input>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            생성
          </Button>
        </Form.Item>
      </Form>
      <Card title={"이미지 (생성 클릭후)"}>
        {console.log(logPk)}
        {logPk ? (
          <Upload
            name="file"
            action={`${API_BASE_URL}/api/v1/farms/log/upload/${id}/`}
            data={logPk}
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
        ) : (
          ""
        )}
      </Card>
    </Modal>
  );
};

export const DetailModal = ({ handleOk, handleCancel, modal, onDelete, id, fields, onUpdate, detail }) => {
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const logPk = { logPk: detail.id };
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
  useEffect(() => {
    return () => {
      detail = null;
    };
  }, []);
  return (
    <Modal
      title="영농 일지"
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
      <Row justify="center">
        <Image
          width={200}
          style={{ marginBottom: "10px" }}
          src={
            detail
              ? detail.image != null
                ? `${detail.image}`
                : "https://i.picsum.photos/id/1043/200/200.jpg?hmac=i7xbST4bM6KMg5XsUaVYvDgwvsZ3VskoXKRqGf1BjcU"
              : "https://i.picsum.photos/id/1043/200/200.jpg?hmac=i7xbST4bM6KMg5XsUaVYvDgwvsZ3VskoXKRqGf1BjcU"
          }
        />
      </Row>
      <Form {...layout} fields={fields} name="addTransaction" onFinish={onUpdate} validateMessages={validateMessages}>
        <Form.Item name={"id"} initialValue={detail ? detail.id : null} hidden>
          <InputNumber disabled />
        </Form.Item>
        <Form.Item name={"created"} label="날짜" rules={[{ required: true }]}>
          <DatePicker locale={locale} />
        </Form.Item>
        <Form.Item name={"title"} label="제목" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={"worker"} label="작업자" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={"content"} label="내용" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name={"note"} label="특이사항" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name={"weather"} label="날씨" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Upload
          name="file"
          action={`${API_BASE_URL}/api/v1/farms/log/upload/${id}/`}
          data={logPk}
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
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            수정
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
