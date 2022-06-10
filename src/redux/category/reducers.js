import actions from "./actions";

const { CATEGORY_BEGIN, CATEGORY_SUCCESS, CATEGORY_ERR } = actions;

const initState = {
  categoryList: [],
  loading: false,
  error: "",
};

/**
 *
 * @todo impure state mutation/explaination
 */

const Category = (state = initState, action) => {
  const { type, data, err } = action;

  switch (type) {
    case CATEGORY_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: data.length ? data : [],
        loading: false,
      };
    case CATEGORY_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default Category;
