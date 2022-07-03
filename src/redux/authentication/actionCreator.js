import actions from "./actions";
import { toast } from 'react-toastify';
import { DataService } from "../../config/dataService/dataService";

const {
  loginBegin,
  loginSuccess,
  loginErr,
  logoutBegin,
  logoutSuccess,
  logoutErr,
} = actions;

const login = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loginBegin());
      const res = await DataService.post("login", data);
      if (typeof res.data.token !== "undefined") {
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("isLoggedin", true);
        toast.success("Admin Successfully Loggedin.", {
          position: toast.POSITION.TOP_CENTER
        });
        dispatch(loginSuccess(res.data));
      } else {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("isLoggedin");
        toast.error("Admin Successfully Not Loggedin.", {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } catch (err) {
      dispatch(loginErr(err));
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };
};

const logOut = () => {
  return async (dispatch) => {
    try {
      dispatch(logoutBegin());
      window.localStorage.removeItem("isLoggedin");
      dispatch(logoutSuccess(null));
      window.localStorage.removeItem("token");
      toast.success("Admin Successfully Logout.", {
        position: toast.POSITION.TOP_CENTER
      });
      
    } catch (err) {
      dispatch(logoutErr(err));
      toast.error("Admin Successfully Not Logout.", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };
};

export { login, logOut };
