const actions = {
  BRAND_BEGIN: "BRAND_BEGIN",
  BRAND_SUCCESS: "BRAND_SUCCESS",
  BRAND_ERR: "BRAND_ERR",

  brandBegin: () => {
    return {
      type: actions.BRAND_BEGIN,
    };
  },

  brandSuccess: (data) => {
    return {
      type: actions.BRAND_SUCCESS,
      data,
    };
  },

  brandErr: (err) => {
    return {
      type: actions.BRAND_ERR,
      err,
    };
  },
};

export default actions;
