import { Badge, Button, Divider, Input, Modal, Radio, Table } from "antd";
import AvatarStatus from "components/shared-components/AvatarStatus";
import { SearchOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import utils from "utils";
import NumberFormat from "react-number-format";
import { getProduct } from "redux/actions/Project";

const getStockStatus = (stockCount) => {
  if (stockCount >= 10) {
    return (
      <>
        <Badge status="success" />
        <span>재고 있음</span>
      </>
    );
  }
  if (stockCount < 10 && stockCount > 0) {
    return (
      <>
        <Badge status="warning" />
        <span>소량 남음</span>
      </>
    );
  }
  if (stockCount === 0) {
    return (
      <>
        <Badge status="error" />
        <span>재고 없음</span>
      </>
    );
  }
  return null;
};

function ProductModal(props) {
  const { handleOk, handleCancel, getProduct, visible, product } = props;
  const [customer, setCustomer] = useState();
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setCustomer(selectedRows[0]);
    },
    getCheckboxProps: (record) => ({
      disabled: record.qty === 0,
      name: record.name,
    }),
  };
  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "상품",
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex">
          <span>{record.name}</span>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "카테고리",
      dataIndex: "categoryName",
      sorter: (a, b) => utils.antdTableSorter(a, b, "categoryName"),
    },
    {
      title: "가격",
      dataIndex: "price",
      render: (price) => (
        <div>
          <NumberFormat displayType={"text"} value={price} prefix={"₩"} thousandSeparator={true} />
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "price"),
    },
    {
      title: "수량",
      dataIndex: "qty",
      sorter: (a, b) => utils.antdTableSorter(a, b, "qty"),
    },
    {
      title: "상태",
      dataIndex: "qty",
      render: (qty) => <Flex alignItems="center">{getStockStatus(qty)}</Flex>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "qty"),
    },
  ];
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    getProduct(value);
  };
  const initializeList = (e) => {
    if (e.currentTarget.value === "") {
      getProduct();
    }
  };
  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={() => {
          if (customer) {
            if (customer) {
              handleOk(customer);
            }
          }
        }}
        onCancel={handleCancel}
        width={700}
      >
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onPressEnter={(e) => onSearch(e)}
          onChange={(e) => initializeList(e)}
        />
        <Table
          columns={tableColumns}
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          rowKey={"id"}
          dataSource={product ? product.result : ""}
        />
      </Modal>
    </div>
  );
}

export default ProductModal;
