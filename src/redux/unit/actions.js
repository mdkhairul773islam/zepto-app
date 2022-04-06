const actions = {
  UNIT_BEGIN: "UNIT_BEGIN",
  UNIT_SUCCESS: "UNIT_SUCCESS",
  UNIT_ERR: "UNIT_ERR",

  unitBegin: () => {
    return {
      type: actions.UNIT_BEGIN,
    };
  },

  unitSuccess: (data) => {
    return {
      type: actions.UNIT_SUCCESS,
      data,
    };
  },

  unitErr: (err) => {
    return {
      type: actions.UNIT_ERR,
      err,
    };
  },
};

export default actions;
