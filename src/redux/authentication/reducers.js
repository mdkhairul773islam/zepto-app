import actions from "./actions";

const {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERR,
  LOGOUT_BEGIN,
  LOGOUT_SUCCESS,
  LOGOUT_ERR,
} = actions;

const initState = {
  isLoggedin: window.localStorage.getItem("isLoggedin"),
  loginUser: {},
  loading: false,
  error: "",
};

/**
 *
 * @todo impure state mutation/explaination
 */

const AuthReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedin: data.error
          ? false
          : window.localStorage.getItem("isLoggedin"),
        loginUser: data.error ? {} : data,
        loading: false,
        error: data.error,
      };
    case LOGIN_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case LOGOUT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedin: false,
        loading: false,
      };
    case LOGOUT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default AuthReducer;
