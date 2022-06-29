const actions = {
  TRANSACTION_BEGIN: "TRANSACTION_BEGIN",
  TRANSACTION_SUCCESS: "TRANSACTION_SUCCESS",
  TRANSACTION_ERR: "TRANSACTION_ERR",

  transactionBegin: () => {
    return {
      type: actions.TRANSACTION_BEGIN,
    };
  },

  transactionSuccess: (data) => {
    return {
      type: actions.TRANSACTION_SUCCESS,
      data,
    };
  },

  transactionErr: (err) => {
    return {
      type: actions.TRANSACTION_ERR,
      err,
    };
  },
};

export default actions;
