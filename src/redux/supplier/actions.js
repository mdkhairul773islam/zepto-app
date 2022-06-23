const actions = {
  SUPPLIER_BEGIN: "SUPPLIER_BEGIN",
  SUPPLIER_SUCCESS: "SUPPLIER_SUCCESS",
  SUPPLIER_GET: "SUPPLIER_GET",
  SUPPLIER_ERR: "SUPPLIER_ERR",

  supplierBegin: () => {
    return {
      type: actions.SUPPLIER_BEGIN,
    };
  },

  supplierSuccess: (data) => {
    return {
      type: actions.SUPPLIER_SUCCESS,
      data,
    };
  },

  supplierGet: (data) => {
    return {
      type: actions.SUPPLIER_GET,
      data,
    };
  },

  supplierErr: (err) => {
    return {
      type: actions.SUPPLIER_ERR,
      err,
    };
  },
};

export default actions;
