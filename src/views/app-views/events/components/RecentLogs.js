import { Card, Table } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { DetailModal } from "../components/Dashboard";
import Swal from "sweetalert2";

export const dateVerifier = (value) => {
  let newDate = new Date();
  let date = newDate.getDate();
  let yesterday = newDate.getDate() - 1;
  let yesterdayday = newDate.getDate() - 2;
  if (value == date) {
    return "오늘";
  } else if (value == yesterday) {
    return "어제";
  } else if (value == yesterdayday) {
    return "그저께";
  }
  return date;
};
export const tableColumns = [
  {
    title: "날짜",
    dataIndex: "created",
    key: "created",
    render: (_, record) => <span style={{ fontWeight: 800 }}>{dateVerifier(moment(record.created).format("DD"))}</span>,
  },
  {
    title: "밭",
    dataIndex: "farmName",
    render: (_, record) => <span style={{ fontWeight: 800 }}>{record.farmName}</span>,
  },
  {
    title: "제목",
    dataIndex: "title",
    key: "title",
    render: (_, record) => (
      <div className="d-flex align-items-center">
        <span className="ml-2">{record.title === "" ? "내용 없음" : record.title}</span>
      </div>
    ),
  },
  {
    title: "내용",
    dataIndex: "content",
    key: "content",
    render: (_, record) => <span className="ml-2">{record.content === "" ? "내용 없음" : record.content}</span>,
  },
];

export const RecentLogs = ({ recentLogs, getFarmList, createLog, updateLog, deleteLog }) => {
  const [detail, setDetail] = useState();
  const [detailModal, setDetailModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [fields, setFields] = useState();
  const [id, setId] = useState();
  const showDetailModal = (record) => {
    setFields([
      {
        name: ["id"],
        value: record.id,
      },
      {
        name: ["created"],
        value: moment(record.created),
      },
      {
        name: ["title"],
        value: record.title,
      },
      {
        name: ["content"],
        value: record.content,
      },
      {
        name: ["worker"],
        value: record.worker,
      },
      {
        name: ["note"],
        value: record.note,
      },
      {
        name: ["weather"],
        value: record.weather,
      },
    ]);
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
  const onUpdate = (values) => {
    updateLog(values, id);
    setDetailModal(false);
    getFarmList();
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
        deleteLog(values, id);
        Swal.fire("삭제 완료", "정상적으로 삭제 되었습니다.", "success");
        setDetailModal(false);
        getFarmList();
      }
    });
  };
  return (
    <Card title={"최근 영농일지"}>
      <Table
        columns={tableColumns}
        dataSource={recentLogs}
        pageSize={5}
        rowKey={"id"}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              showDetailModal(record);
              setId(record.farm);
            },
          };
        }}
      />
      {detailModal ? (
        <DetailModal
          handleOk={handleOk}
          fields={fields}
          handleCancel={handleCancel}
          onUpdate={onUpdate}
          onDelete={onDelete}
          modal={detailModal}
          id={id}
          detail={detail}
        />
      ) : (
        ""
      )}
    </Card>
  );
};
