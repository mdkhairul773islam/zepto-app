const actions = {
  PRODUCT_BEGIN: "PRODUCT_BEGIN",
  PRODUCT_SUCCESS: "PRODUCT_SUCCESS",
  PRODUCT_GET: "PRODUCT_GET",
  PRODUCT_ERR: "PRODUCT_ERR",

  productBegin: () => {
    return {
      type: actions.PRODUCT_BEGIN,
    };
  },

  productSuccess: (data) => {
    return {
      type: actions.PRODUCT_SUCCESS,
      data,
    };
  },

  productGet: (data) => {
    return {
      type: actions.PRODUCT_GET,
      data,
    };
  },

  productErr: (err) => {
    return {
      type: actions.PRODUCT_ERR,
      err: err,
    };
  },
};

export default actions;
