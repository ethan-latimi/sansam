import fetch from "auth/FetchInterceptor";

const OrderService = {};

OrderService.postOrder = function (data) {
  return fetch({
    url: `/api/v1/orders/create/`,
    method: "post",
    data: data,
  });
};

OrderService.postOrderItem = function (data) {
  return fetch({
    url: `/api/v1/orders/orderItem/create/`,
    method: "post",
    data: data,
  });
};

OrderService.postOrderImage = function (data) {
  return fetch({
    url: `/api/v1/orders/orderImage/create/`,
    method: "post",
    data: data,
  });
};

OrderService.putOrder = function (data) {
  return fetch({
    url: `/api/v1/orders/update/${data.id}`,
    method: "put",
    data: data,
  });
};

OrderService.putPrice = function (pk, price) {
  return fetch({
    url: `/api/v1/orders/price/${pk}`,
    method: "put",
    data: price,
  });
};

OrderService.deleteOrder = function (pk) {
  return fetch({
    url: `/api/v1/orders/delete/${pk}`,
    method: "delete",
  });
};

OrderService.getOrderItems = function (pk) {
  return fetch({
    url: `/api/v1/orders/orderItems/${pk}`,
    method: "get",
  });
};
OrderService.getOrderImages = function (pk) {
  return fetch({
    url: `/api/v1/orders/orderImages/${pk}`,
    method: "get",
  });
};

OrderService.deleteOrderItem = function (pk) {
  return fetch({
    url: `/api/v1/orders/orderItem/delete/${pk}`,
    method: "delete",
  });
};

export default OrderService;
