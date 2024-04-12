import {
  CATEGORY_FAIL,
  CATEGORY_SUCCESS,
  FARM_FAIL,
  FARM_SUCCESS,
  GET_ACCOUNT_FAIL,
  GET_ACCOUNT_SUCCESS,
  GET_CUSTOMER,
  GET_CUSTOMERLIST_FAIL,
  GET_CUSTOMERLIST_SUCCESS,
  GET_CUSTOMER_FAIL,
  GET_CUSTOMER_SUCCESS,
  GET_DASHBOARD_FAIL,
  GET_DASHBOARD_SUCCESS,
  GET_MEMOS_SUCCESS,
  GET_ORDERIMAGE_SUCCESS,
  GET_ORDERITEMS_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_LIST,
  GET_ORDER_SUCCESS,
  LOADING,
  LOG_FAIL,
  LOG_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_SUCCESS,
  RESET_PROJECT,
} from "../constants/Project";

const initState = {};

const project = (state = initState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        wallet: action.account,
        customer: action.customer,
        order: action.order,
        product: action.product,
        transaction: action.transaction,
      };
    case GET_DASHBOARD_FAIL:
      return {
        ...state,
        loading: false,
        message: action.err,
      };
    case GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        wallet: action.account,
        transaction: action.transaction,
      };
    case GET_ACCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        message: action.err,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.orderList,
        orderPk: action.orderPk,
      };
    case GET_ORDERIMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        orderImages: action.data,
      };
    case GET_ORDERITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        orderItems: action.data,
      };
    case GET_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        message: action.err,
      };
    case GET_CUSTOMERLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        customerList: action.data,
      };
    case GET_CUSTOMERLIST_FAIL:
      return {
        ...state,
        loading: false,
        message: action.err,
      };
    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customer: action.data,
      };
    case GET_MEMOS_SUCCESS:
      return {
        ...state,
        loading: false,
        memos: action.data,
      };
    case GET_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        message: action.err,
      };
    case PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.data,
      };
    case PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        message: action.err,
      };
    case CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.data,
      };
    case CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        message: action.err,
      };
    case FARM_SUCCESS:
      return {
        ...state,
        loading: false,
        recentLogs: action.recentLogs,
        farmList: action.data,
        farmPk: action.farmPk,
      };
    case FARM_FAIL:
      return {
        ...state,
        loading: false,
        message: action.err,
      };
    case LOG_SUCCESS:
      return {
        ...state,
        loading: false,
        logList: action.data,
        logPk: action.logPk,
      };
    case LOG_FAIL:
      return {
        ...state,
        loading: false,
        message: action.err,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case RESET_PROJECT:
      return {
        state: initState,
      };
    default:
      return state;
  }
};

export default project;
