import { combineReducers } from "redux";
import authReducer from "./authentication/reducers";
import sideBarReducer from "./sideBar/reducers";
import categoryReducer from "./category/reducers";
import brandReducer from "./brand/reducers";
import unitReducer from "./unit/reducers";
import productReducer from "./product/reducers";
import supplierReducer from "./supplier/reducers";
import helperReducer from "./helper/reducers";
import suplierTransactionReducer from "./suplierTransaction/reducers";

export default combineReducers({
  authReducer,
  sideBarReducer,
  categoryReducer,
  brandReducer,
  unitReducer,
  productReducer,
  supplierReducer,
  helperReducer,
  suplierTransactionReducer,
});
