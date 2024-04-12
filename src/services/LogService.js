import fetch from "auth/FetchInterceptor";

const LogService = {};

LogService.getLogList = function (data, date, page) {
  if (date != null) {
    return fetch({
      url: `/api/v1/farms/logs/${data}/?start=${date.start}&end=${date.end}&page=${page}`,
      method: "get",
    });
  }
  return fetch({
    url: `/api/v1/farms/logs/${data}/?page=${page}`,
    method: "get",
  });
};

LogService.getRecentLogs = function () {
  return fetch({
    url: "/api/v1/farms/log/recentlogs/",
    method: "get",
  });
};

LogService.postLog = function (data, pk) {
  return fetch({
    url: `/api/v1/farms/log/create/${pk}/`,
    method: "post",
    data: data,
  });
};
LogService.putLog = function (data, pk) {
  return fetch({
    url: `/api/v1/farms/log/update/${pk}/`,
    method: "put",
    data: data,
  });
};

LogService.uploadLogImage = function (data, pk) {
  return fetch({
    url: `/api/v1/farms/log/upload/${pk}/`,
    method: "put",
    data: data,
  });
};

LogService.deleteLog = function (pk) {
  return fetch({
    url: `/api/v1/farms/log/delete/${pk}/`,
    method: "delete",
  });
};

export default LogService;
