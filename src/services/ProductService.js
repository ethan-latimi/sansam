import fetch from "auth/FetchInterceptor";

const ProductService = {};

ProductService.getProductList = function (data) {
  if (data) {
    return fetch({
      url: `/api/v1/products/?keyword=${data}`,
      method: "get",
    });
  }
  return fetch({
    url: `/api/v1/products/`,
    method: "get",
  });
};

ProductService.postProduct = function (data) {
  return fetch({
    url: `/api/v1/products/create/`,
    method: "post",
    data: data,
  });
};

ProductService.putProduct = function (data) {
  return fetch({
    url: `api/v1/products/update/${data.id}/`,
    method: "put",
    data: data,
  });
};

ProductService.qtyProduct = function (data, kind) {
  return fetch({
    url: `api/v1/products/updateQty/${data.id}/`,
    method: "put",
    data: { data, kind },
  });
};

ProductService.deleteProduct = function (pk) {
  return fetch({
    url: `api/v1/products/delete/${pk}/`,
    method: "delete",
  });
};

export default ProductService;
