import fetch from "auth/FetchInterceptor";

const SaleService = {};

SaleService.getOrderList = function (receiver) {
  let value;
  let page;
  let start;
  let end;
  let status;
  if (receiver) {
    let temp = parseInt(receiver.value);
    if (!isNaN(temp)) {
      value = temp;
    } else {
      value = receiver.value;
    }
    if (receiver.page) {
      page = receiver.page;
    } else {
      page = 1;
    }
    start = receiver.start;
    end = receiver.end;
    if (receiver.status !== undefined) {
      status = receiver.status;
    } else {
      status = "";
    }
  }
  if (typeof value === "string") {
    //주문자 검색
    return fetch({
      url: `/api/v1/orders/?receiver=${value}&paid=${status}&page=${page}`,
      method: "get",
    });
  } else if (typeof value === "number") {
    //주문번호 검색
    return fetch({
      url: `/api/v1/orders/?orderNumber=${value}`,
      method: "get",
    });
  } else if (start && end) {
    //주문 날짜 검색
    return fetch({
      url: `/api/v1/orders/?start=${start}&end=${end}&page=${page}&paid=${status}&byPrice=true`,
      method: "get",
    });
  } else {
    if (status !== "") {
      console.log("여기");
      return fetch({
        url: `/api/v1/orders/?page=${page}&paid=${status}`,
        method: "get",
      });
    } else {
      return fetch({
        url: `/api/v1/orders/?page=${page}`,
        method: "get",
      });
    }
  }
};

export default SaleService;
