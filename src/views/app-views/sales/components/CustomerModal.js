import { Button, Divider, Input, Modal, Radio, Table } from "antd";
import AvatarStatus from "components/shared-components/AvatarStatus";
import { SearchOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function CustomerModal(props) {
  const { showModal, handleOk, handleCancel, where, visible, customerList, getCustomerList } = props;
  const [customer, setCustomer] = useState();
  const history = useHistory();
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setCustomer(selectedRows[0]);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };
  const columns = [
    {
      title: "이름",
      dataIndex: "name",

      render: (_, record) => (
        <Flex>
          <AvatarStatus size={30} name={record.name} subTitle={record.company} />
        </Flex>
      ),
    },
    {
      title: "전화번호",
      dataIndex: "phoneNumber",
    },
    {
      title: "전화번호2",
      dataIndex: "secondPhoneNumber",
    },
    {
      title: "주소",
      dataIndex: "address",
    },
  ];
  const onSearch = (e) => {
    const value = e.currentTarget.value;
    getCustomerList(value);
  };
  const initializeList = (e) => {
    if (e.currentTarget.value === "") {
      getCustomerList();
    }
  };
  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={() => {
          if (customer) {
            handleOk(customer, where);
          }
        }}
        onCancel={handleCancel}
        width={1000}
      >
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onPressEnter={(e) => onSearch(e)}
          onChange={(e) => initializeList(e)}
        />
        <Table
          columns={columns}
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          rowKey={"id"}
          dataSource={customerList ? customerList.result : ""}
        />
        <Button onClick={() => history.push("/app/customers/default")}>고객 등록</Button>
      </Modal>
    </div>
  );
}

export default CustomerModal;
