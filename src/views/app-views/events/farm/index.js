import React, { useEffect, useState } from "react";
import { CustomerList, DetailModal } from "../components/Customer";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  resetProject,
  getCustomerList,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  createCustomer,
  updateLog,
  deleteLog,
  getFarmList,
  updateFarm,
  deleteOrder,
  deleteFarm,
} from "redux/actions/Project";
import Swal from "sweetalert2";
import { Button, Card, Col, Input, Radio, Row } from "antd";
import Flex from "components/shared-components/Flex";
import Meta from "antd/lib/card/Meta";
import { useHistory } from "react-router-dom";
import { API_BASE_URL } from "configs/AppConfig";
import { UpdateModal } from "../components/Farm";
import { RecentLogs } from "../components/RecentLogs";

export const Farms = (props) => {
  const { loading, resetProject, recentLogs, getFarmList, farmList, updateFarm, deleteFarm, updateLog, deleteLog } =
    props;
  const history = useHistory();
  const [mode, setMode] = useState("read");
  const [fields, setFields] = useState();
  const [detailModal, setDetailModal] = useState();
  const [deleteId, setDeleteId] = useState();
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
    const data = farmList.result.find((x) => x.id === e.target.value);
    setFields([
      {
        name: ["id"],
        value: data.id,
      },
      {
        name: ["title"],
        value: data.title,
      },
      {
        name: ["introduction"],
        value: data.introduction,
      },
      {
        name: ["description"],
        value: data.description,
      },
    ]);
    setDeleteId(data.id);
    setDetailModal(true);
  };
  const goToDiary = (id, title) => {
    history.push({ pathname: `/app/events/farm/${id}`, state: { id, title } });
  };
  const handleCancel = (e) => {
    setDetailModal(false);
  };
  const onUpdate = (values) => {
    updateFarm(values);
    setDetailModal(false);
  };
  const handleOk = () => {
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
        deleteFarm(values);
        getFarmList();
        Swal.fire("삭제 완료", "정상적으로 삭제 되었습니다.", "success");
        setDetailModal(false);
      }
    });
  };
  useEffect(() => {
    getFarmList();
    return () => {
      resetProject();
    };
  }, []);

  return (
    <>
      <RecentLogs
        recentLogs={recentLogs ? recentLogs.result : ""}
        updateLog={updateLog}
        getFarmList={getFarmList}
        deleteLog={deleteLog}
      />
      <Card title={mode === "read" ? "보기 모드 입니다" : "수정 모드 입니다"}>
        <Row gutter={16} justify="end" style={{ marginBottom: "10px", marginRight: "20px" }}>
          {mode === "read" ? (
            <Button type="primary" onClick={() => setMode("update")}>
              수정 모드
            </Button>
          ) : (
            ""
          )}
          {mode === "update" ? (
            <Button type="danger" onClick={() => setMode("read")}>
              보기 모드
            </Button>
          ) : (
            ""
          )}
        </Row>
        {mode === "update" ? (
          <Radio.Group value={value} onChange={onChange}>
            <Row justify="center">
              {farmList
                ? farmList.result.map((i) => (
                    <Radio key={i.id} value={i.id}>
                      <Col key={i.id} xs={24} sm={24} md={12} lg={6}>
                        <Card
                          hoverable
                          style={{ width: 240 }}
                          cover={
                            <img
                              alt="example"
                              src={
                                i.image
                                  ? `${i.image}`
                                  : "https://i.picsum.photos/id/1043/200/200.jpg?hmac=i7xbST4bM6KMg5XsUaVYvDgwvsZ3VskoXKRqGf1BjcU"
                              }
                            />
                          }
                          onClick={() => {
                            setValue(i.id);
                            setFields([
                              {
                                name: ["id"],
                                value: i.id,
                              },
                              {
                                name: ["title"],
                                value: i.title,
                              },
                              {
                                name: ["introduction"],
                                value: i.introduction,
                              },
                              {
                                name: ["description"],
                                value: i.description,
                              },
                            ]);
                            setDeleteId(i.id);
                            setDetailModal(true);
                          }}
                        >
                          <Meta title={i.title} description={i.introduction} />
                          <hr />
                          <span>상세: {i.description}</span>
                        </Card>
                      </Col>
                    </Radio>
                  ))
                : ""}
            </Row>
          </Radio.Group>
        ) : (
          ""
        )}
        {mode === "read" ? (
          <Row justify="center">
            {farmList
              ? farmList.result.map((i) => (
                  <Col key={i.id} xs={24} sm={24} md={12} lg={6}>
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={
                        <img
                          alt="example"
                          src={
                            i.image
                              ? `${i.image}`
                              : "https://i.picsum.photos/id/1043/200/200.jpg?hmac=i7xbST4bM6KMg5XsUaVYvDgwvsZ3VskoXKRqGf1BjcU"
                          }
                        />
                      }
                      onClick={() => goToDiary(i.id, i.title)}
                    >
                      <Meta title={i.title} description={i.introduction} />
                      <hr />
                      <span>상세: {i.description}</span>
                    </Card>
                  </Col>
                ))
              : ""}
          </Row>
        ) : (
          ""
        )}
        <UpdateModal
          modal={detailModal}
          handleOk={handleOk}
          fields={fields}
          handleCancel={handleCancel}
          onDelete={onDelete}
          onUpdate={onUpdate}
          deleteId={deleteId}
        />
      </Card>
    </>
  );
};

const mapStateToProps = ({ project }) => {
  const { loading, farmList, recentLogs } = project;
  return { loading, farmList, recentLogs };
};

const mapDispatchToProps = {
  resetProject,
  updateFarm,
  getFarmList,
  deleteFarm,
  updateLog,
  deleteLog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Farms);
