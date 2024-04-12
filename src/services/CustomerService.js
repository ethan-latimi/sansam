import fetch from "auth/FetchInterceptor";

const CustomerService = {};

CustomerService.getCustomerList = function (data) {
  let value;
  let temp = parseInt(data);
  if (!isNaN(temp)) {
    value = temp;
  } else {
    value = data;
  }
  if (typeof value === "string") {
    return fetch({
      url: `/api/v1/customers/?keyword=${value}`,
      method: "get",
    });
  } else if (typeof value === "number") {
    value = String(value);
    let phoneNumber;
    if (value.length > 7) {
      phoneNumber = "0" + value.slice(0, 2) + "-" + value.slice(2, 6) + "-" + value.slice(6);
    } else {
      phoneNumber = "0" + value.slice(0, 2) + "-" + value.slice(2, 6);
    }
    return fetch({
      url: `/api/v1/customers/?phoneNumber=${phoneNumber}`,
      method: "get",
    });
  }
  return fetch({
    url: "/api/v1/customers/",
    method: "get",
  });
};

CustomerService.postCustomer = function (data) {
  return fetch({
    url: `/api/v1/customers/create/`,
    method: "post",
    data: data,
  });
};

CustomerService.getCustomer = function (pk) {
  return fetch({
    url: `/api/v1/customer/${pk}`,
    method: "get",
  });
};

CustomerService.putCustomer = function (data) {
  return fetch({
    url: `/api/v1/customers/update/${data.id}`,
    method: "put",
    data: data,
  });
};

CustomerService.deleteCustomer = function (pk) {
  return fetch({
    url: `/api/v1/customers/delete/${pk}`,
    method: "delete",
  });
};

CustomerService.getMemo = function (pk) {
  return fetch({
    url: `/api/v1/customers/memos/${pk}`,
    method: "get",
  });
};

export default CustomerService;
