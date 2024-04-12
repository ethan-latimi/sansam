import fetch from "auth/FetchInterceptor";

const FarmService = {};

FarmService.getFarmList = function () {
  return fetch({
    url: "/api/v1/farms/",
    method: "get",
  });
};

FarmService.postFarm = function (data) {
  return fetch({
    url: `/api/v1/farms/create/`,
    method: "post",
    data: data,
  });
};
FarmService.putFarm = function (data) {
  return fetch({
    url: `/api/v1/farms/update/${data.id}/`,
    method: "put",
    data: data,
  });
};

FarmService.deleteFarm = function (pk) {
  return fetch({
    url: `/api/v1/farms/delete/${pk}/`,
    method: "delete",
  });
};

export default FarmService;
