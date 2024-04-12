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
} from "redux/actions/Project";
import Swal from "sweetalert2";
import { Button, Card, Input, Row } from "antd";
import Flex from "components/shared-components/Flex";

export const Customers = (props) => {
  const { loading, resetProject, getCustomerList, updateCustomer, deleteCustomer, createCustomer, customerList } =
    props;
  const [detail, setDetail] = useState();
  const [detailModal, setDetailModal] = useState(false);

  const handleOk = (e) => {
    setDetailModal(false);
  };
  const handleCreate = (values) => {
    values.phoneNumber = values.phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    createCustomer(values);
    setDetailModal(false);
  };
  const handleCancel = (e) => {
    setDetailModal(false);
  };
  const onUpdate = (values) => {
    values.phoneNumber = values.phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    updateCustomer(values);
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
        deleteCustomer(values);
        Swal.fire("삭제 완료", "정상적으로 삭제 되었습니다.", "success");
        setDetailModal(false);
      }
    });
  };

  const showDetailModal = (record) => {
    setDetail(record);
    setDetailModal(true);
  };
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    getCustomerList(value);
  };

  const initializeList = (e) => {
    if (e.currentTarget.value === "") {
      getCustomerList();
    }
  };
  useEffect(() => {
    getCustomerList();
    return () => {
      resetProject();
    };
  }, []);
  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onPressEnter={(e) => onSearch(e)}
              onChange={(e) => initializeList(e)}
            />
          </div>
        </Flex>
        <div>
          <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setDetailModal(true)}>
            고객 추가
          </Button>
        </div>
      </Flex>
      {loading == false && customerList ? (
        <CustomerList customerData={customerList.result} showDetailModal={showDetailModal} bordered={true} />
      ) : (
        ""
      )}
      {detailModal ? (
        <DetailModal
          handleOk={handleOk}
          handleCancel={handleCancel}
          onUpdate={onUpdate}
          onDelete={onDelete}
          modal={detailModal}
          detail={detail}
          setDetail={setDetail}
          onCreate={handleCreate}
        />
      ) : (
        ""
      )}
    </Card>
  );
};

const mapStateToProps = ({ project }) => {
  const { loading, customer, customerList } = project;
  return { loading, customer, customerList };
};

const mapDispatchToProps = {
  resetProject,
  getCustomerList,
  getCustomer,
  updateCustomer,
  createCustomer,
  deleteCustomer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
