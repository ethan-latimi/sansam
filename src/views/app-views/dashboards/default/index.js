import React from "react";
import { Row, Col, Card, Table } from "antd";
import StatisticWidget from "components/shared-components/StatisticWidget";
import AvatarStatus from "components/shared-components/AvatarStatus";
import { UserSwitchOutlined, FileDoneOutlined } from "@ant-design/icons";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
import { WeeklyRevenue, TopProduct, tableColumns, RecentOrder } from "../components/Dashboard";
import { useEffect } from "react";
import { account, dashboard, resetProject } from "redux/actions/Project";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";

export const DefaultDashboard = (props) => {
  const { loading, resetProject, dashboard, wallet, customer, order, product, transaction } = props;
  useEffect(() => {
    dashboard();
    return () => {
      resetProject();
    };
  }, []);

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={17}>
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
          {loading == false && wallet ? (
            <WeeklyRevenue monthlySales={wallet.monthlyReport} yearlySales={wallet.yearlySales} />
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
        <Col xs={24} sm={24} md={24} lg={7}>
          {loading == false && wallet ? (
            <Card title="고객 순위">
              <div className="mt-3">
                {customer.list.map((elm, i) => (
                  <div key={i} className={`d-flex align-items-center justify-content-between mb-4`}>
                    <Row>
                      <span style={{ fontWeight: "800" }}>{i + 1}위</span>
                      <AvatarStatus id={i} name={elm.name} subTitle={elm.company} />
                    </Row>
                    <NumberFormat displayType={"text"} value={elm.totalSpend} prefix={"₩"} thousandSeparator={true} />
                  </div>
                ))}
              </div>
            </Card>
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
          {loading == false && wallet ? (
            <Row gutter={16}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <DataDisplayWidget
                  icon={<FileDoneOutlined />}
                  value={order.count}
                  title="총 주문"
                  color="cyan"
                  vertical={true}
                  avatarSize={55}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <DataDisplayWidget
                  icon={<UserSwitchOutlined />}
                  value={customer.count}
                  title="총 회원 수"
                  color="volcano"
                  vertical={true}
                  avatarSize={55}
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
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24}>
          {loading == false && wallet ? (
            <RecentOrder recentOrderData={order.list} />
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
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={7}>
          {loading == false && wallet ? (
            <TopProduct data={product.list} />
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
        <Col xs={24} sm={24} md={24} lg={17}>
          <Card title="최근 거래내역">
            {loading == false && wallet ? (
              <Table
                className="no-border-last"
                columns={tableColumns}
                dataSource={transaction.list}
                rowKey="id"
                pagination={false}
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
    </>
  );
};

const mapStateToProps = ({ project }) => {
  const { loading, redirect, wallet, customer, order, product, transaction } = project;
  return { loading, redirect, wallet, customer, order, product, transaction };
};

const mapDispatchToProps = {
  account,
  dashboard,
  resetProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultDashboard);
