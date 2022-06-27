const actions = {
  HELPER_BEGIN: "HELPER_BEGIN",
  HELPER_SUCCESS: "HELPER_SUCCESS",
  HELPER_ERR: "HELPER_ERR",

  helperBegin: () => {
    return {
      type: actions.HELPER_BEGIN,
    };
  },

  helperSuccess: (data) => {
    return {
      type: actions.HELPER_SUCCESS,
      data,
    };
  },

  helperErr: (err) => {
    return {
      type: actions.HELPER_ERR,
      err,
    };
  },
};

export default actions;
