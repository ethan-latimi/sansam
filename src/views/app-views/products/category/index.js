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
import { resetProject, getCategory, postCategory, updateCategory, deleteCategory } from "redux/actions/Project";
import Swal from "sweetalert2";
import { DetailModal } from "../components/category";

const Category = (props) => {
  const { resetProject, postCategory, updateCategory, deleteCategory, loading, getCategory, category } = props;
  let history = useHistory();
  const [list, setList] = useState(category ? category.result : null);
  const [detail, setDetail] = useState();
  const [detailModal, setDetailModal] = useState(false);
  const handleOk = (e) => {
    setDetailModal(false);
  };
  const handleCreate = (values) => {
    postCategory(values);
    setDetailModal(false);
  };
  const handleCancel = (e) => {
    setDetailModal(false);
  };
  const onUpdate = (values) => {
    updateCategory(values);
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
        deleteCategory(values);
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
      title: "카테고리",
      dataIndex: "name",
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
  ];

  useEffect(() => {
    getCategory();

    return () => {
      resetProject();
    };
  }, []);
  useEffect(() => {
    if (loading === false && category) {
      setList(category.result);
    } else if (loading === false && list) {
      getCategory();
    }
  }, [loading]);
  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <Flex className="mb-1" mobileFlex={false}>
            <div className="mr-md-3 mb-3"></div>
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
              카테고리 추가
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
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
