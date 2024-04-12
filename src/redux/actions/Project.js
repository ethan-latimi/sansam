import {
  ACCOUNT,
  CREATE_ACCOUNT,
  DASHBOARD,
  UPDATE_TRANSACTION,
  RESET_PROJECT,
  DELETE_TRANSACTION,
  GET_ORDER_LIST,
  GET_ORDER,
  GET_CUSTOMER_LIST,
  GET_CUSTOMER,
  CREATE_CUSTOMER,
  UPDATE_CUSTOEMR,
  DELETE_CUSTOMER,
  GET_PRODUCT_LIST,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_CATEGORY_LIST,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CREATE_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  CREATE_ORDERITEM,
  CREATE_ORDERIMAGE,
  GET_ORDERIMAGES,
  GET_ORDERITEMS,
  GET_FARM_LIST,
  CREATE_FARM,
  UPDATE_FARM,
  DELETE_FARM,
  GET_LOG_LIST,
  CREATE_LOG,
  UPDATE_LOG,
  DELETE_LOG,
  DELETE_ORDER_IN,
  CREATE_ORDER_PRICE,
  DELETE_ORDER_ITEM,
  GET_MEMO,
  QTY_PRODUCT,
  GET_RECENT_LOG_LIST,
} from "../constants/Project";

export const dashboard = () => {
  return {
    type: DASHBOARD,
  };
};

export const resetProject = () => {
  return {
    type: RESET_PROJECT,
  };
};

export const account = (date, sort, page) => {
  return {
    type: ACCOUNT,
    date,
    sort,
    page,
  };
};

export const createAccount = (value) => {
  return {
    type: CREATE_ACCOUNT,
    payload: value,
  };
};

export const updateTransaction = (value) => {
  return {
    type: UPDATE_TRANSACTION,
    payload: value,
  };
};

export const deleteTransaction = (pk) => {
  return {
    type: DELETE_TRANSACTION,
    payload: pk,
  };
};

// order 여기 보자
export const getOrderList = (data) => {
  return {
    type: GET_ORDER_LIST,
    data: data,
  };
};

export const getOrderImages = (data) => {
  return {
    type: GET_ORDERIMAGES,
    data: data,
  };
};

export const getOrderItems = (data) => {
  return {
    type: GET_ORDERITEMS,
    data: data,
  };
};

export const createOrder = (data) => {
  return {
    type: CREATE_ORDER,
    data,
  };
};

export const createOrderItem = (data) => {
  return {
    type: CREATE_ORDERITEM,
    data,
  };
};

export const updateOrder = (data) => {
  return {
    type: UPDATE_ORDER,
    data,
  };
};

export const deleteOrder = (pk) => {
  return {
    type: DELETE_ORDER,
    pk,
  };
};

export const deleteOrderItem = (pk, data) => {
  return {
    type: DELETE_ORDER_ITEM,
    data,
    pk,
  };
};
export const deleteOrderIn = (pk) => {
  return {
    type: DELETE_ORDER_IN,
    pk,
  };
};

export const createOrderImage = (data) => {
  return {
    type: CREATE_ORDERIMAGE,
    data,
  };
};
export const createOrderPrice = (pk, price) => {
  return {
    type: CREATE_ORDER_PRICE,
    pk,
    price,
  };
};

// customer
export const getCustomerList = (data) => {
  return {
    type: GET_CUSTOMER_LIST,
    data,
  };
};

export const getCustomer = (pk) => {
  return {
    type: GET_CUSTOMER,
    payload: pk,
  };
};

export const createCustomer = (data) => {
  return {
    type: CREATE_CUSTOMER,
    data,
  };
};

export const updateCustomer = (data) => {
  return {
    type: UPDATE_CUSTOEMR,
    data: data,
  };
};

export const deleteCustomer = (pk) => {
  return {
    type: DELETE_CUSTOMER,
    pk,
  };
};

export const getMemo = (pk) => {
  return {
    type: GET_MEMO,
    pk,
  };
};

//PRODUCT
export const getProduct = (data) => {
  return {
    type: GET_PRODUCT_LIST,
    data,
  };
};

export const postProduct = (data) => {
  return {
    type: CREATE_PRODUCT,
    data,
  };
};

export const updateProduct = (data) => {
  return {
    type: UPDATE_PRODUCT,
    data,
  };
};
export const qtyProduct = (data, kind) => {
  return {
    type: QTY_PRODUCT,
    data,
    kind,
  };
};
export const deleteProduct = (pk) => {
  return {
    type: DELETE_PRODUCT,
    pk,
  };
};

//Category
export const getCategory = (data) => {
  return {
    type: GET_CATEGORY_LIST,
    data,
  };
};

export const postCategory = (data) => {
  return {
    type: CREATE_CATEGORY,
    data,
  };
};

export const updateCategory = (data) => {
  return {
    type: UPDATE_CATEGORY,
    data,
  };
};

export const deleteCategory = (pk) => {
  return {
    type: DELETE_CATEGORY,
    pk,
  };
};

// Farms
export const getFarmList = (data) => {
  return {
    type: GET_FARM_LIST,
    data,
  };
};

export const createFarm = (data) => {
  return {
    type: CREATE_FARM,
    data,
  };
};

export const updateFarm = (data) => {
  return {
    type: UPDATE_FARM,
    data,
  };
};

export const deleteFarm = (pk) => {
  return {
    type: DELETE_FARM,
    pk,
  };
};

//LOGS
export const getLogList = (data, date, page) => {
  return {
    type: GET_LOG_LIST,
    data,
    date,
    page,
  };
};
export const getRecentLog = () => {
  return {
    type: GET_RECENT_LOG_LIST,
  };
};
export const createLog = (data, pk) => {
  return {
    type: CREATE_LOG,
    data,
    pk,
  };
};

export const updateLog = (data, pk) => {
  return {
    type: UPDATE_LOG,
    data,
    pk,
  };
};

export const deleteLog = (pk, logPk) => {
  return {
    type: DELETE_LOG,
    pk,
    logPk,
  };
};
