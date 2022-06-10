import actions from "./actions";

const { UNIT_BEGIN, UNIT_SUCCESS, UNIT_ERR } = actions;

const initState = {
  unitList: [],
  loading: false,
  error: "",
};

/**
 *
 * @todo impure state mutation/explaination
 */

const Unit = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case UNIT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case UNIT_SUCCESS:
      return {
        ...state,
        unitList: typeof data.data !== 'undefined' ? data.data : [],
        loading: false,
      };
    case UNIT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default Unit;
