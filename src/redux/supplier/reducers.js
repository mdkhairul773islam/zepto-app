import actions from "./actions";

const { SUPPLIER_BEGIN, SUPPLIER_SUCCESS, SUPPLIER_GET, SUPPLIER_ERR } =
  actions;

const initState = {
  supplier: {},
  totalRows: 0,
  supplierList: [],
  loading: false,
  error: "",
};

/**
 *
 * @todo impure state mutation/explaination
 */

const Supplier = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SUPPLIER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SUPPLIER_SUCCESS:
      return {
        ...state,
        supplierList: data.data,
        totalRows: data.data.total,
        loading: false,
      };
    case SUPPLIER_GET:
      return {
        ...state,
        supplier: data,
      };
    case SUPPLIER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default Supplier;
