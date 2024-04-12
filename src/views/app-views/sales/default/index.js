import React, { useEffect, useState } from "react";
import { DetailModal, RecentOrder } from "../components/Sales";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  deleteOrderIn,
  getOrderImages,
  getOrderItems,
  getOrderList,
  qtyProduct,
  resetProject,
  updateOrder,
} from "redux/actions/Project";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Loading from "components/shared-components/Loading";
import { Row } from "antd";

export const SalesList = (props) => {
  const {
    loading,
    order,
    getOrderList,
    resetProject,
    getOrderImages,
    getOrderItems,
    deleteOrderIn,
    orderItems,
    updateOrder,
    qtyProduct,
    orderImages,
  } = props;
  const [detailModal, setDetailModal] = useState();
  const [detail, setDetail] = useState();
  const [fields, setFields] = useState();
  const handleOk = () => {
    setDetailModal(false);
  };
  const handleCreate = (values) => {
    setDetailModal(false);
  };
  const handleCancel = (e) => {
    setDetailModal(false);
  };
  const onUpdate = (values) => {
    updateOrder(values);
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
        deleteOrderIn(values);
        Swal.fire("삭제 완료", "정상적으로 삭제 되었습니다.", "success");
        setDetailModal(false);
      }
    });
  };

  const showDetailModal = (record) => {
    getOrderItems(record.id);
    getOrderImages(record.id);
    setFields([
      {
        name: ["address"],
        value: record.address,
      },
      {
        name: ["receiver"],
        value: record.receiver,
      },
      {
        name: ["isPaid"],
        value: record.isPaid,
      },
      {
        name: ["receiverPhoneNumber"],
        value: record.receiverPhoneNumber,
      },
      {
        name: ["created"],
        value: moment(record.created),
      },
      {
        name: ["isDelivered"],
        value: record.isDelivered,
      },
      {
        name: ["payment"],
        value: record.payment,
      },
      {
        name: ["sellerMemo"],
        value: record.sellerMemo,
      },
      {
        name: ["customerMemo"],
        value: record.customerMemo,
      },
    ]);
    setDetail(record);
    setDetailModal(true);
  };
  useEffect(() => {
    setTimeout(() => {
      getOrderList();
    }, 500);
    return () => {
      resetProject();
    };
  }, []);
  return (
    <>
      <div>
        {loading == false ? (
          <RecentOrder
            pages={order ? order.pages : ""}
            recentOrderData={order ? order.result : ""}
            getOrderList={getOrderList}
            showDetailModal={showDetailModal}
          />
        ) : (
          <Row align="center">
            <Loading />
            <span>-----</span>
            <span>로딩중... (로딩이 계속 되면 새로고침을 눌러주세요)</span>
          </Row>
        )}
      </div>
      {detailModal ? (
        <DetailModal
          handleOk={handleOk}
          qtyProduct={qtyProduct}
          handleCancel={handleCancel}
          onUpdate={onUpdate}
          onDelete={onDelete}
          modal={detailModal}
          detail={detail}
          setDetail={setDetail}
          onCreate={handleCreate}
          fields={fields}
          orderItems={orderItems}
          orderImages={orderImages}
        />
      ) : (
        ""
      )}
    </>
  );
};

const mapStateToProps = ({ project }) => {
  const { loading, order, orderItems, orderImages } = project;
  return { loading, order, orderItems, orderImages };
};

const mapDispatchToProps = {
  getOrderList,
  resetProject,
  getOrderImages,
  getOrderItems,
  deleteOrderIn,
  updateOrder,
  qtyProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesList);
