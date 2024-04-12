import React, { useEffect, useState } from "react";
import { Card, Table, Select, Input, Button, Badge, Menu } from "antd";
import ProductListData from "assets/data/product-list.data.json";
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import AvatarStatus from "components/shared-components/AvatarStatus";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";
import utils from "utils";
import { batch, connect } from "react-redux";
import {
  resetProject,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
  getCategory,
} from "redux/actions/Project";
import Swal from "sweetalert2";
import { DetailModal } from "../components/products";

const { Option } = Select;

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

const Product = (props) => {
  const {
    resetProject,
    getProduct,
    postProduct,
    updateProduct,
    deleteProduct,
    product,
    loading,
    getCategory,
    category,
  } = props;
  let history = useHistory();
  const [list, setList] = useState(product ? product.result : null);
  const [detail, setDetail] = useState();
  const [detailModal, setDetailModal] = useState(false);
  const handleOk = (e) => {
    setDetailModal(false);
  };
  const handleCreate = (values) => {
    postProduct(values);
    setDetailModal(false);
  };
  const handleCancel = (e) => {
    setDetailModal(false);
  };
  const onUpdate = (values) => {
    updateProduct(values);
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
        deleteProduct(values);
        Swal.fire("삭제 완료", "정상적으로 삭제 되었습니다.", "success");
        setDetailModal(false);
      }
    });
  };

  const showDetailModal = (record) => {
    setDetail(record);
    setDetailModal(true);
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
        <div className="font-weight-semibold">
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
    {
      title: "판매액",
      dataIndex: "soldPrice",
      render: (_, record) => (
        <span className="font-weight-semibold">
          <NumberFormat displayType={"text"} value={record.soldPrice} prefix={"₩"} thousandSeparator={true} />
        </span>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "soldPrice"),
    },
    {
      title: "판매량",
      dataIndex: "soldNumber",
      sorter: (a, b) => utils.antdTableSorter(a, b, "soldNumber"),
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

  const handleShowCategory = (value) => {
    if (value !== "ALL") {
      const key = "categoryName";
      const data = utils.filterArray(list, key, value);
      setList(data);
    } else {
      setList(product.result);
    }
  };

  useEffect(() => {
    getProduct();
    setTimeout(() => {
      getCategory();
    }, 300);
    return () => {
      resetProject();
    };
  }, []);
  useEffect(() => {
    if (loading === false && product) {
      setList(product.result);
    } else if (loading === false && list) {
      getProduct();
    }
  }, [loading]);
  return (
    <>
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
            <div className="mb-3">
              <Select
                defaultValue="ALL"
                className="w-100"
                style={{ minWidth: 180 }}
                onChange={handleShowCategory}
                placeholder="Category"
              >
                <Option value="ALL">전체</Option>
                {category
                  ? category.result.map((elm, idx) => (
                      <Option key={idx} value={elm.name}>
                        {elm.name}
                      </Option>
                    ))
                  : ""}
              </Select>
            </div>
          </Flex>
          <div>
            <Button
              onClick={() => {
                showDetailModal();
              }}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              상품 추가
            </Button>
          </div>
        </Flex>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            dataSource={list}
            rowKey="id"
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  showDetailModal(record);
                },
              };
            }}
          />
        </div>
      </Card>
      {detailModal ? (
        <DetailModal
          handleOk={handleOk}
          handleCancel={handleCancel}
          onUpdate={onUpdate}
          onDelete={onDelete}
          modal={detailModal}
          category={category}
          detail={detail}
          setDetail={setDetail}
          onCreate={handleCreate}
        />
      ) : (
        ""
      )}
    </>
  );
};

const mapStateToProps = ({ project }) => {
  const { loading, category, product, pages } = project;
  return { loading, product, pages, category };
};

const mapDispatchToProps = {
  resetProject,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
  getCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
