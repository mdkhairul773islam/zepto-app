import actions from "./actions";
import { DataService } from "../../config/dataService/dataService";
const {
  loginBegin,
  loginSuccess,
  loginErr,
  logoutBegin,
  logoutSuccess,
  logoutErr,
} = actions;

const login = (data, addToast) => {
  return async (dispatch) => {
    try {
      dispatch(loginBegin());
      const res = await DataService.post("login", data);
      if (res.data.token !== undefined) {
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("isLoggedin", true);
        addToast("Admin Successfully Loggedin.", { appearance: "success" });
        dispatch(loginSuccess(res.data));
      } else {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("isLoggedin");
        addToast("Admin Successfully Not Loggedin.", { appearance: "error" });
      }
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const logOut = (addToast) => {
  return async (dispatch) => {
    try {
      dispatch(logoutBegin());
      window.localStorage.removeItem("isLoggedin");
      dispatch(logoutSuccess(null));
      window.localStorage.removeItem("token");
      addToast("Admin Successfully Logout.", { appearance: "success" });
    } catch (err) {
      dispatch(logoutErr(err));
      addToast("Admin Successfully Not Logout.", { appearance: "error" });
    }
  };
};

export { login, logOut };
