import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  resetProject,
  getCustomerList,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  createCustomer,
  createFarm,
} from "redux/actions/Project";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { Button, Card, Form, Input, message, Row, Upload } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import { ImageSvg } from "assets/svg/icon";
import { PlusOutlined } from "@ant-design/icons";
import CustomIcon from "components/util-components/CustomIcon";
import { get } from "lodash";
import { API_BASE_URL } from "configs/AppConfig";
export const AddFarm = (props) => {
  const { loading, resetProject, createFarm, farmPk } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [fileList, setFileList] = useState([]);
  const history = useHistory();
  const handleSubmit = (data) => {
    createFarm(data);
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
      resetProject();
    };
  }, []);
  return (
    <>
      <Form onFinish={handleSubmit}>
        <Card xs={24} sm={24} md={24} lg={24} xl={24} title={"밭 추가하기"}>
          <Form.Item name={"title"} label={"밭 이름"} rules={[{ required: true }]}>
            <Input></Input>
          </Form.Item>
          <Form.Item name={"introduction"} label={"간략한 정보"} rules={[{ required: true }]}>
            <Input></Input>
          </Form.Item>
          <Form.Item name={"description"} label={"세부 정보"} rules={[{ required: true }]}>
            <Input></Input>
          </Form.Item>
          {!farmPk ? (
            <Button type="primary" htmlType="submit">
              저장
            </Button>
          ) : (
            ""
          )}
        </Card>
      </Form>
      {farmPk ? (
        <Card title="밭 사진">
          <Upload
            name="file"
            action={`${API_BASE_URL}/api/v1/farms/farm/upload/${farmPk.farmPk}/`}
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
        </Card>
      ) : (
        <Card title="이미지 추가: 위 밭 정보를 먼저 입력해주세요"></Card>
      )}
      {farmPk ? (
        <Row justify="center">
          <Button
            type="primary"
            onClick={() => {
              history.push("/app/events/farms");
              resetProject();
            }}
          >
            다음
          </Button>
        </Row>
      ) : (
        ""
      )}
    </>
  );
};

const mapStateToProps = ({ project }) => {
  const { loading, farmPk } = project;
  return { loading, farmPk };
};

const mapDispatchToProps = {
  resetProject,
  createFarm,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFarm);
