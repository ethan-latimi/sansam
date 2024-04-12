import React, { useState, useEffect } from "react";
import { Form, Button, message, Card, Input, Row, Select, DatePicker, Table, Col } from "antd";
import TextArea from "antd/lib/input/TextArea";
import CustomerModal from "../components/CustomerModal";
import { connect, createDispatchHook } from "react-redux";
import { createOrder, getCustomerList, getMemo, resetProject } from "redux/actions/Project";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";
import locale from "antd/es/date-picker/locale/ko_KR";
const ProductCreate = (props) => {
  const { loading, customerList, getCustomerList, resetProject, createOrder, orderPk, getMemo, memos } = props;
  const [visible, setVisible] = useState();
  const [fields, setFields] = useState();
  const [where, setWhere] = useState();
  const [customer, setCustomer] = useState();
  const history = useHistory();
  const onFinish = (data) => {
    createOrder(data);
  };
  const showModal = (value) => {
    setWhere(value);
    setVisible(true);
  };

  useEffect(() => {
    if (orderPk) {
      history.push({ pathname: "/app/sales/select", state: { orderPk } });
    }
  }, [orderPk]);

  const handleOk = (customer, where) => {
    if (customer && where === "customer") {
      setFields([
        {
          name: ["customer"],
          value: customer.id,
        },
        {
          name: ["customerName"],
          value: customer.name,
        },
        {
          name: ["customerPhoneNumber"],
          value: customer.phoneNumber,
        },
        {
          name: ["customerPhoneNumber2"],
          value: customer.secondPhoneNumber,
        },
        {
          name: ["receiverPhoneNumber"],
          value: customer.phoneNumber,
        },
        {
          name: ["receiver"],
          value: customer.name,
        },
        {
          name: ["address"],
          value: customer.address,
        },
      ]);
    } else if (customer && where === "receiver") {
      setFields((prev) => {
        prev = [...prev];
        prev[5] = {
          name: ["receiver"],
          value: customer.name,
        };
        prev[4] = {
          name: ["receiverPhoneNumber"],
          value: customer.phoneNumber,
        };
        prev[6] = {
          name: ["address"],
          value: customer.address,
        };
        return [...prev];
      });
    }
    setCustomer(customer);
    getMemo(customer.id);
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const handleCustomer = () => {
    if (customer) {
      getMemo(customer.id);
    }
  };

  const column = [
    {
      title: "날짜",
      dataIndex: "created",
      render: (_, record) => <span>{moment(record.created).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "주문 번호",
      dataIndex: "id",
    },
    {
      title: "판매자 메모",
      dataIndex: "sellerMemo",
    },
    {
      title: "고객 메모",
      dataIndex: "customerMemo",
    },
  ];

  useEffect(() => {
    getCustomerList();
    return () => {
      resetProject();
    };
  }, []);

  return (
    <>
      <Card title={"주문 추가하기(고객)"}>
        <Form fields={fields} onFinish={onFinish}>
          <Form.Item name={"customer"} hidden>
            <Input></Input>
          </Form.Item>
          <Form.Item
            name={"created"}
            label={"날짜"}
            initialValue={moment()}
            rules={[{ required: true, message: "날짜를 입력해주세요" }]}
          >
            <DatePicker locale={locale} />
          </Form.Item>
          <Row justify="space-between">
            <Row>
              <Form.Item
                name={"customerName"}
                label={"고객이름"}
                message={"hi"}
                rules={[{ required: true, message: "고객을 입력해주세요" }]}
              >
                <Input disabled></Input>
              </Form.Item>
            </Row>
            <Form.Item label={"전화번호1"} name={"customerPhoneNumber"}>
              <Input disabled></Input>
            </Form.Item>
            <Form.Item label={"전화번호2"} name={"customerPhoneNumber2"}>
              <Input disabled></Input>
            </Form.Item>
            {/* 여기 */}
            <Row>
              <Button type={"primary"} onClick={() => showModal("customer")}>
                고객 찾기
              </Button>
            </Row>
          </Row>
          <Row>
            <Col>
              <Form.Item
                name={"receiver"}
                label={"받는사람"}
                placeholder={"받는 사람 이름"}
                rules={[{ required: true, message: "받는사람을 입력해주세요" }]}
              >
                <Input></Input>
              </Form.Item>
            </Col>
            <Col>
              {fields ? (
                <Button style={{ marginLeft: "16px" }} onClick={() => showModal("receiver")}>
                  수취인 찾기
                </Button>
              ) : (
                <Button style={{ marginLeft: "16px" }} disabled>
                  수취인 찾기
                </Button>
              )}
            </Col>
          </Row>
          <Form.Item
            label={"받는사람 전화번호"}
            name={"receiverPhoneNumber"}
            rules={[{ required: true, message: "받는사람 전화번호를 입력해주세요!" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item name={"address"} label={"주소"} rules={[{ required: true, message: "주소를 입력해주세요" }]}>
            <Input></Input>
          </Form.Item>
          <Form.Item name={"customerMemo"} initialValue={" "} label={"고객 메모"}>
            <TextArea></TextArea>
          </Form.Item>
          <Form.Item name={"sellerMemo"} initialValue={" "} label={"판매자 메모"}>
            <TextArea></TextArea>
          </Form.Item>
          <Form.Item name={"isDelivered"} initialValue={true} label={"배달 현황"}>
            <Select>
              <Select.Option value={true}>배달 완료</Select.Option>
              <Select.Option value={false}>배달 대기</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={"isPaid"} initialValue={true} label={"결제 현황"}>
            <Select>
              <Select.Option value={true}>결제 완료</Select.Option>
              <Select.Option value={false}>결제 대기</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={"payment"} initialValue={"cash"} label={"결제 방법"}>
            <Select>
              <Select.Option value={"cash"}>현금</Select.Option>
              <Select.Option value={"transfer"}>계좌 이체</Select.Option>
              <Select.Option value={"card"}>농장 카드</Select.Option>
              <Select.Option value={"naver"}>네이버 페이</Select.Option>
              <Select.Option value={"homepageCard"}>홈피 카드</Select.Option>
            </Select>
          </Form.Item>
          <Row justify="end">
            <Button type="primary" htmlType="submit">
              다음
            </Button>
          </Row>
        </Form>
      </Card>
      <CustomerModal
        visible={visible}
        customerList={customerList}
        showModal={showModal}
        handleOk={handleOk}
        where={where}
        handleCancel={handleCancel}
        getCustomerList={getCustomerList}
      />
      <Card title={`${customer ? `${customer.name}님의 메모` : "고객 메모 (고객을 선택해주세요)"}`}>
        <Row justify="end">
          <Button onClick={handleCustomer}>메모 보기</Button>
        </Row>
        <Table columns={column} dataSource={memos ? memos : ""} rowKey={"id"} />
      </Card>
    </>
  );
};

const mapStateToProps = ({ project }) => {
  const { loading, customerList, orderPk, memos } = project;
  return { loading, customerList, orderPk, memos };
};

const mapDispatchToProps = {
  getCustomerList,
  resetProject,
  createOrder,
  getMemo,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate);
