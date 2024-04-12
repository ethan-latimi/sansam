import fetch from "auth/FetchInterceptor";

const DashboardService = {};

DashboardService.getAccount = function () {
  return fetch({
    url: "/api/v1/accounts/",
    method: "get",
  });
};

DashboardService.getCustomer = function (order, keyword) {
  return fetch({
    url: "/api/v1/customers/?order=true",
    method: "get",
  });
};

DashboardService.getOrder = function () {
  return fetch({
    url: "/api/v1/orders/?dashboard=dashboard",
    method: "get",
  });
};

DashboardService.getTransaction = function (date, sort, page) {
  if (date != null) {
    return fetch({
      url: `/api/v1/accounts/transactions/?start=${date.start}&end=${date.end}&sort=${sort}&page=${page}`,
      method: "get",
    });
  } else {
    return fetch({
      url: `/api/v1/accounts/transactions/?sort=${sort}&page=${page}`,
      method: "get",
    });
  }
};

DashboardService.getProduct = function () {
  return fetch({
    url: "/api/v1/products/",
    method: "get",
  });
};

DashboardService.setTransaction = function (data) {
  return fetch({
    url: "/api/v1/accounts/transactions/create/",
    method: "post",
    data: data.payload,
  });
};

DashboardService.updateTransaction = function (data) {
  return fetch({
    url: `/api/v1/accounts/transactions/update/${data.payload.id}/`,
    method: "put",
    data: data.payload,
  });
};

DashboardService.deleteTransaction = function (payload) {
  return fetch({
    url: `/api/v1/accounts/transactions/delete/${payload.payload}/`,
    method: "delete",
  });
};

export default DashboardService;
