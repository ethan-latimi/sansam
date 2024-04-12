import fetch from "auth/FetchInterceptor";

const CategoryService = {};

CategoryService.getCategoryList = function () {
  return fetch({
    url: "/api/v1/products/categories/",
    method: "get",
  });
};

CategoryService.postCategory = function (data) {
  return fetch({
    url: `/api/v1/products/categories/create/`,
    method: "post",
    data: data,
  });
};

CategoryService.putCategory = function (data) {
  return fetch({
    url: `api/v1/products/categories/update/${data.id}/`,
    method: "put",
    data: data,
  });
};

CategoryService.deleteCategory = function (pk) {
  return fetch({
    url: `api/v1/products/categories/delete/${pk}/`,
    method: "delete",
  });
};

export default CategoryService;
