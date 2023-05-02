import { loginInfo, message } from "../initialValues/LoginItem";
import {
  LOGIN_TO_PRODUCT_PAGE_SUCCESS,
  LOGIN_TO_PRODUCT_PAGE_FAILURE,
} from "../actions/LoginAction";

const initialState = {
  loginInfo: loginInfo,
  message: message,
};

export  function loginReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_TO_PRODUCT_PAGE_SUCCESS:
      return {
        ...state,
        loginInfo:payload,
      };
    case LOGIN_TO_PRODUCT_PAGE_FAILURE:
      return {
        ...state,
        message: payload,
      };
    default:
      return state;
  }
}
