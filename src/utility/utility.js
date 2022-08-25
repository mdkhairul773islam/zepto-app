/**
 * Return ellipsis of a given string
 * @param {string} text
 * @param {number} size
 */
const ellipsis = (text, size) => {
  return `${text.split(" ").slice(0, size).join(" ")}...`;
};

const toUpperCase = (text) => {
  return text.toUpperCase();
};
//Output: FLEXIPLE

const toCapitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
//Output: Abc efg

const toFilter = (str) => {
  var i,
    frags = str.split("_");
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(" ");
};
//Output: Humpdey Dumpdey

const numberFormat = (x) => {
  return Number.parseFloat(x).toFixed(0);
};

// Get Date YYYY-MM-DD
const getDate = (str) => {
  if (str !== undefined && str !== null) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  } else {
    return null;
  }
};

const getPaymentMethods = () => {
  return [
    { label: "Cash", value: "cash" },
    { label: "Commission", value: "Commission" },
    { label: "Remission", value: "Remission" },
    { label: "Bank", value: "bank" },
    { label: "Cheque", value: "cheque" },
    { label: "bKsah", value: "bKash" },
    { label: "T.T", value: "tt" },
    { label: "Cash To T.T", value: "cash_to_tt" },
  ];
};

const getTransactionTypes = () => {
  return [
    { label: "Paid To Supplier", value: "paid" },
    { label: "Receive From Supplier", value: "receive" },
  ];
};

const getBalanceStatusList = () => {
  return [
    { label: "Payable", value: "payable" },
    { label: "Receivable", value: "receivable" },
  ];
};

const serverPath = (file = "") => {
  return process.env.REACT_APP_SERVER_PATH + file;
};

export {
  ellipsis,
  toUpperCase,
  toCapitalize,
  toFilter,
  numberFormat,
  getDate,
  getPaymentMethods,
  getTransactionTypes,
  getBalanceStatusList,
  serverPath,
};
