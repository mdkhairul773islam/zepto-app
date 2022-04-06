import React, { useEffect } from "react";

const UserWraper = ({ children }) => {
  useEffect(() => {
    document.title = "Login | React Dashboard";
  }, []);
  return <>{children}</>;
};

export default UserWraper;
