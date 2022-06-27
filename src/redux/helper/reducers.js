import actions from "./actions";

const { HELPER_BEGIN, HELPER_SUCCESS, HELPER_ERR } = actions;

const initState = {
  dataList: [],
  loading: false,
  error: "",
};

/**
 *
 * @todo impure state mutation/explaination
 */

const Helper = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case HELPER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case HELPER_SUCCESS:
      return {
        ...state,
        dataList: data.length ? data : [],
        loading: false,
      };
    case HELPER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default Helper;
