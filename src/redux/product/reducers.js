import actions from "./actions";

const { PRODUCT_BEGIN, PRODUCT_SUCCESS, PRODUCT_GET, PRODUCT_ERR } = actions;

const initState = {
  product: {},
  productList: [],
  totalRows: 0,
  loading: false,
  error: "",
};

/**
 *
 * @todo impure state mutation/explaination
 */

const Product = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case PRODUCT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_SUCCESS:
      return {
        ...state,
        productList: data.data,
        totalRows: data.total,
        loading: false,
      };
    case PRODUCT_GET:
      return {
        ...state,
        product: data,
      };
    case PRODUCT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default Product;
