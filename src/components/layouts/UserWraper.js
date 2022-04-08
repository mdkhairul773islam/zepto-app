import React, { useEffect } from "react";

const UserWraper = ({ children }) => {
  useEffect(() => {
    document.title = "Login | Dashboard";
  }, []);
  return <>{children}</>;
};

export default UserWraper;
