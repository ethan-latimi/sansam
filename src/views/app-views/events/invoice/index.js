import React, { useState } from "react";
import { PrinterOutlined } from "@ant-design/icons";
import { Card, Table, Button, Select, Input } from "antd";
import { useLocation } from "react-router-dom";

const { Column } = Table;

function Invoice() {
  const location = useLocation();
  const [data, setData] = useState(location.state.selectedRows);
  const printTable = [
    {
      title: "고객",
      dataIndex: "customerName",
      width: 130,
    },
    {
      title: "고객번호",
      dataIndex: "phoneNumber",
      width: 80,
      render: (_, record) => (
        <>
          <Select defaultValue={"첫번째"} bordered={false} showArrow={false}>
            <Select.Option value={"첫번째"}>{record.phoneNumber ? record.phoneNumber : "없음"}</Select.Option>
            {record.secondPhoneNumber ? (
              <Select.Option value={"두번째"}> {record.secondPhoneNumber} </Select.Option>
            ) : (
              ""
            )}
            <Select.Option value={"기타"}>____________</Select.Option>
          </Select>
        </>
      ),
    },
    {
      title: "주소",
      dataIndex: "address",
      width: 300,
    },
    {
      title: "수취인",
      dataIndex: "receiver",
      width: 125,
    },
    {
      title: "수취인번호",
      dataIndex: "receiverPhoneNumber",
      width: 80,
      render: (_, record) => (
        <>
          <Select defaultValue={"첫번째"} bordered={false} showArrow={false}>
            <Select.Option value={"첫번째"}>
              {record.receiverPhoneNumber ? record.receiverPhoneNumber : "없음"}
            </Select.Option>
            <Select.Option value={"기타"}>____________</Select.Option>
          </Select>
        </>
      ),
    },
  ];
  return (
    <div className="container">
      <Card>
        <div className="d-md-flex justify-content-md-between">
          <div>
            <img src="/img/logo2.png" alt="" />
            <address>
              <p>
                <span className="font-weight-semibold text-dark font-size-md" style={{ fontWeight: "bolder" }}>
                  평창산양삼랜드
                </span>
                <br />
                <span>강원 평창군 용평면 태기로 1043-161</span>
                <br />
                <span>사업자: 심세훈</span>
                <br />
                <abbr className="text-dark" title="Phone">
                  전화번호:
                </abbr>
                <span>(010) 3669-1147</span>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-4">
          <Table columns={printTable} rowKey={data.id} dataSource={data} pagination={false} className="mb-5"></Table>
        </div>
        <hr className="d-print-none" />
        <div className="text-right d-print-none">
          <Button type="primary" onClick={() => window.print()}>
            <PrinterOutlined type="printer" />
            <span className="ml-1">인쇄</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Invoice;
