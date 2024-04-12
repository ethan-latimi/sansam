import { Button, Card, Col, Row, Select, Table, DatePicker } from "antd";
import StatisticWidget from "components/shared-components/StatisticWidget";
import React, { useEffect } from "react";
import { useState } from "react";
import { AddModal, DetailModal, tableColumns } from "../components/Dashboard";
import { connect } from "react-redux";
import { account, createAccount, resetProject, updateTransaction, deleteTransaction } from "redux/actions/Project";
import Swal from "sweetalert2";

export const Wallet = (props) => {
  const { account, wallet, loading, transaction, resetProject, createAccount, updateTransaction, deleteTransaction } =
    props;
  const { RangePicker } = DatePicker;
  const [modal, setModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [date, setDate] = useState(null);
  const [sort, setSort] = useState(null);
  const [detail, setDetail] = useState();
  const dateFormat = "YYYY-MM-DD";
  const showModal = () => {
    setModal(true);
  };

  const showDetailModal = (record) => {
    setDetail(record);
    setDetailModal(true);
  };

  const handleOk = (e) => {
    setModal(false);
    setDetailModal(false);
  };

  const handleCancel = (e) => {
    setModal(false);
    setDetailModal(false);
  };
  const onFinish = (values) => {
    createAccount(values);
    setModal(false);
  };
  const onUpdate = (values) => {
    updateTransaction(values);
    setDetailModal(false);
  };
  const onDelete = (values) => {
    Swal.fire({
      title: "삭제하시겠습니까?",
      text: "삭제하면 되돌릴수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "예",
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTransaction(values);
        Swal.fire("삭제 완료", "정상적으로 삭제 되었습니다.", "success");
        setDetailModal(false);
      }
    });
  };
  const handlePage = (page) => {
    account(date, sort, page.current);
  };

  const handleDate = (date) => {
    if (date) {
      const list = { start: date[0].format("YYYY-MM-DD"), end: date[1].format("YYYY-MM-DD") };
      resetProject();
      account(list, sort);
      setDate(list);
    }
  };

  const handleSort = (sort) => {
    account(date, sort);
    setSort(sort);
  };

  useEffect(() => {
    account();
    return () => {
      resetProject();
    };
  }, []);
  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          {loading == false && wallet ? (
            <Row gutter={16}>
              <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                <StatisticWidget
                  title={wallet.wallet.title}
                  value={String(wallet.wallet.amount)}
                  status={wallet.wallet.status}
                  subtitle={"총 잔고"}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                <StatisticWidget
                  title={wallet.deposit.title}
                  value={String(wallet.deposit.amount)}
                  status={wallet.deposit.status}
                  subtitle={"한달 비교 (일주일)"}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={8}>
                <StatisticWidget
                  title={wallet.expense.title}
                  value={String(wallet.expense.amount)}
                  status={wallet.expense.status}
                  subtitle={"한달 비교 (일주일)"}
                />
              </Col>
            </Row>
          ) : (
            <div className="code-box">
              <section className="code-box-demo">
                <div className="ant-skeleton">
                  <div className="ant-skeleton-content">
                    <h3 className="ant-skeleton-title">
                      <ul className="ant-skeleton-paragraph">
                        <li></li>
                        <li></li>
                      </ul>
                    </h3>
                  </div>
                </div>
              </section>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Card title="최근 거래내역">
            <Row justify="end">
              <RangePicker format={dateFormat} onChange={handleDate} />
              <Select defaultValue={"전체"} onChange={handleSort}>
                <Select.Option>전체</Select.Option>
                <Select.Option value="deposit">입금</Select.Option>
                <Select.Option value="expense">출금</Select.Option>
              </Select>
            </Row>
            {loading == false && transaction ? (
              <Table
                className="no-border-last"
                columns={tableColumns}
                dataSource={transaction.result}
                rowKey="id"
                pagination={{ total: transaction.pages * 10 }}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => {
                      showDetailModal(record);
                    },
                  };
                }}
                onChange={handlePage}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <div className="code-box">
                <section className="code-box-demo">
                  <div className="ant-skeleton">
                    <div className="ant-skeleton-content">
                      <h3 className="ant-skeleton-title">
                        <ul className="ant-skeleton-paragraph">
                          <li></li>
                          <li></li>
                        </ul>
                      </h3>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Row justify="end">
            <Button type="primary" onClick={showModal}>
              추가
            </Button>
          </Row>
          <AddModal handleOk={handleOk} handleCancel={handleCancel} onFinish={onFinish} modal={modal} />
          {detailModal ? (
            <DetailModal
              handleOk={handleOk}
              handleCancel={handleCancel}
              onUpdate={onUpdate}
              onDelete={onDelete}
              modal={detailModal}
              detail={detail}
            />
          ) : (
            ""
          )}
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = ({ project }) => {
  const { loading, wallet, transaction, createAccount } = project;
  return { loading, wallet, transaction, createAccount };
};

const mapDispatchToProps = {
  account,
  resetProject,
  createAccount,
  updateTransaction,
  deleteTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
