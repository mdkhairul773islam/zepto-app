import actions from "./actions";

const { BRAND_BEGIN, BRAND_SUCCESS, BRAND_ERR } = actions;

const initState = {
  brandList: [],
  loading: false,
  error: "",
};

/**
 *
 * @todo impure state mutation/explaination
 */

const Brand = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case BRAND_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case BRAND_SUCCESS:
      return {
        ...state,
        brandList: typeof data.data !== 'undefined' ? data.data : [],
        loading: false,
      };
    case BRAND_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default Brand;
