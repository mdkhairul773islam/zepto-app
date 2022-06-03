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
  if (str !== undefined) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  } else {
    return "";
  }
};

const getShowroom = () => {
  const showroomList = [
    { label: "Showroom-1", value: "0001" },
    { label: "Showroom-2", value: "0002" },
  ];
  return showroomList;
};

const serverPath = (file = '') => {
  return process.env.REACT_APP_LOCAL_SERVER_PATH + file;
}

export {
  ellipsis,
  toUpperCase,
  toCapitalize,
  toFilter,
  numberFormat,
  getDate,
  getShowroom,
  serverPath
};
