import LoginService from "../../services/LoginService";

export const LOGIN_TO_PRODUCT_PAGE_SUCCESS = "LOGIN_TO_PRODUCT_PAGE_SUCCESS";
export const LOGIN_TO_PRODUCT_PAGE_FAILURE = "LOGIN_TO_PRODUCT_PAGE_FAILURE";

let loginService = new LoginService();

export const loginToProductPage = (dispatch) => (i32StationCode) =>

  loginService
    .getByProductName(i32StationCode)
    .then((response) => {
      dispatch({ type: LOGIN_TO_PRODUCT_PAGE_SUCCESS, payload: response.data });
      console.log(response.data);
    }
    ).catch((error) =>
      dispatch({
        type: LOGIN_TO_PRODUCT_PAGE_FAILURE,
        payload: error.message,
      })
    );

export const validateCode = (i32StationCode) =>
  loginService.getByProductName(i32StationCode);

export const validateCodePassword = (password) =>
  loginService.getByPassword(password);