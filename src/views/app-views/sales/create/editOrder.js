import { Button, Card, Form, Input, InputNumber, Modal, Row, Table, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ProductModal from "../components/ProductModal";
import {
  createOrderItem,
  createOrderPrice,
  deleteOrder,
  deleteOrderItem,
  getProduct,
  qtyProduct,
  resetProject,
} from "redux/actions/Project";
import { connect } from "react-redux";
import { API_BASE_URL } from "configs/AppConfig";
import { useHistory } from "react-router-dom";
import utils from "utils";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
const uploadButton = (
  <div>
    <PlusOutlined />
    <div className="ant-upload-text">Upload</div>
  </div>
);

function editOrder(props) {
  const {
    location,
    loading,
    getProduct,
    product,
    resetProject,
    createOrderItem,
    createOrderPrice,
    qtyProduct,
    deleteOrderItem,
  } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [validator, setValidator] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [fileList, setFileList] = useState([]);
  const [products, setProducts] = useState([]);
  const [fields, setFields] = useState();
  // productModal
  const [showProductModal, setShowProductModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [deleteOrderItems, setDeleteOrderItems] = useState();
  const history = useHistory();

  const handleCancel = () => {
    setPreviewVisible(false);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };
  const handleproducts = (id, value, price) => {
    if (products.length != 0) {
      for (const i in products) {
        if (products[i].id === id) {
          setProducts((prev) => {
            prev[i].value = value;
            prev[i].price = value * price;
            return [...prev];
          });
        }
      }
    }
  };
  const deleteProduct = (id) => {
    setProducts(products.filter((item) => item.id != id));
    setCart(cart.filter((item) => item.id != id));
  };
  const goToOrder = (value) => {
    if (products.length !== 0) {
      const promise = new Promise((resolve, reject) => {
        createOrderPrice(location.state.orderPk, value);
        if (deleteOrderItems.length > 0) {
          for (const i in deleteOrderItems) {
            deleteOrderItem(deleteOrderItems[i], location.state.orderItems[i]);
          }
        }
        setTimeout(() => {
          resolve("finished");
          reject(new Error("broke"));
        }, 500);
      });
      promise
        .then(() => {
          if (products.length > 0) {
            for (const i in products) {
              createOrderItem(products[i]);
            }
            setValidator(true);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          if (products.length !== 0) {
            location.state.orderPk = null;
            location.state.orderItems = null;
            history.push("/app/sales");
          }
        });
    } else {
      window.alert("상품이 없습니다.");
    }
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      render: (_, record) => <span>{record.id}</span>,
    },
    {
      title: "상품",
      dataIndex: "name",
      render: (_, record) => <span>{record.name}</span>,
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "수량",
      dataIndex: "qty",
      render: (_, record) => (
        <InputNumber
          min={1}
          max={record.qty}
          onChange={(value) => handleproducts(record.id, value, record.price)}
          required
        />
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "qty"),
    },
    {
      title: "가격",
      dataIndex: "price",
      render: (_, record) => (
        <span>{products.length != 0 ? products.find((x) => x.id === record.id).value * record.price : ""}원</span>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "price"),
    },
    {
      render: (_, record) => (
        <Button
          type="danger"
          onClick={() => {
            deleteProduct(record.id);
          }}
        >
          삭제
        </Button>
      ),
    },
  ];

  // Product Functions
  const handleShowModal = () => {
    setShowProductModal(true);
  };
  const handleProductCancel = () => {
    setShowProductModal(false);
  };
  const handleOk = (data) => {
    if (!cart.includes(data)) {
      setCart([...cart, data]);
      setProducts([...products, { id: data.id, value: 1, price: data.price, order: location.state.orderPk }]);
    }
    setShowProductModal(false);
  };
  const handlePrice = () => {
    setFields([
      {
        name: ["price"],
        value: products.reduce((acc, cur) => {
          return acc + cur.price;
        }, 0),
      },
    ]);
  };

  // product id를 통해서 상품관련사항을 가져온다.
  useEffect(() => {
    getProduct();
    return () => {
      if (location.state.orderItems != null) {
        for (const i in location.state.orderItems) {
          qtyProduct(location.state.orderItems[i], "minus");
        }
      }
      resetProject();
    };
  }, []);
  useEffect(() => {
    if (!location.state.orderPk) {
      history.goBack();
    }
  }, [location.state.orderPk]);
  useEffect(() => {
    if (product) {
      const foreignCarts = [];
      const foreignProducts = [];
      const deleteOrderItems = [];
      location.state.orderItems.forEach((element) => {
        foreignCarts.push(product.result.find((ele) => ele.id === element.product));
        foreignProducts.push({ id: element.product, value: element.qty, price: element.price, order: element.order });
        deleteOrderItems.push(element.id);
      });
      setTimeout(() => {
        setCart(foreignCarts);
        setProducts(foreignProducts);
        setDeleteOrderItems(deleteOrderItems);
      }, 600);
    }
  }, [product]);
  return (
    <Form onFinish={goToOrder} fields={fields}>
      <Card title={"주문 상품"}>
        <Button onClick={handleShowModal}>상품 추가</Button>
        <Table dataSource={cart} rowKey={"id"} columns={columns}></Table>
        <Row justify="space-between">
          <Row>
            <h2>총 가격:</h2>
            <h2>
              {products.reduce((acc, cur) => {
                return acc + cur.price;
              }, 0)}
            </h2>
          </Row>
          <Row>
            <h2>받은 금액:</h2>
            <Form.Item name={"price"} initialValue={0}>
              <InputNumber style={{ width: "150px" }} controls={false} />
            </Form.Item>
            <Button onClick={handlePrice}>가격 동일</Button>
          </Row>
        </Row>
      </Card>
      <Card title={"주문 사진"}>
        <div className="clearfix">
          <Upload
            name="file"
            action={`${API_BASE_URL}/api/v1/orders/orderImage/create/${location.state.orderPk["orderPk"]}`}
            headers={{
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            }}
            withCredentials={true}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 4 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </div>
      </Card>
      <Button type="primary" htmlType="submit">
        저장
      </Button>
      <ProductModal
        visible={showProductModal}
        getProduct={getProduct}
        product={product}
        handleOk={handleOk}
        handleCancel={handleProductCancel}
      />
    </Form>
  );
}

const mapStateToProps = ({ project }) => {
  const { loading, category, product, pages, orderPk } = project;
  return { loading, product, pages, category, orderPk };
};

const mapDispatchToProps = {
  resetProject,
  getProduct,
  createOrderItem,
  deleteOrder,
  createOrderPrice,
  deleteOrderItem,
  qtyProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(editOrder);
