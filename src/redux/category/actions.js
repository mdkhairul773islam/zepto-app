const actions = {
  CATEGORY_BEGIN: "CATEGORY_BEGIN",
  CATEGORY_SUCCESS: "CATEGORY_SUCCESS",
  CATEGORY_ERR: "CATEGORY_ERR",

  categoryBegin: () => {
    return {
      type: actions.CATEGORY_BEGIN,
    };
  },

  categorySuccess: (data) => {
    return {
      type: actions.CATEGORY_SUCCESS,
      data,
    };
  },

  categoryErr: (err) => {
    return {
      type: actions.CATEGORY_ERR,
      err,
    };
  },
};

export default actions;
