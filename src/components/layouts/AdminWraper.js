import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import SideBar from "../../secure/SideBar/SideBar";
import TopHeader from "../../secure/TopHeader/TopHeader";

const AdminWraper = (props, { children }) => {
  const [loading, setLoading] = useState(true);

  const [isAside, setAside] = useState(
    localStorage.getItem("aside_close") === "true"
  );
  const [dark, setDark] = useState(
    localStorage.getItem("dark-mode") === "true"
  );

  const asideToggleFn = () => {
    setAside(!isAside);
    setDark(!dark);
  };

  useEffect(() => {
    localStorage.setItem("aside_close", isAside);
    localStorage.setItem("dark-mode", dark);
    document.title = "Admin Dashboard";
  }, [isAside, dark]);

  useEffect(() => {
    const loadData = async () => {
      // Wait for 100 ml second
      await new Promise((r) => setTimeout(r, 60));
      // Toggle loading state
      setLoading((loading) => !loading);
    };
    loadData();
  }, []);

  return (
    <>
      {/* <section
        className={`wrapper ${isAside ? "aside_close" : ""} ${
          dark ? "dark-mode" : ""
        }`}
        data-menu="dashboard"
        data-submenu=""
      > */}
      <section
        className={`wrapper ${isAside ? "aside_close" : ""}`}
        data-menu="dashboard"
        data-submenu=""
      >
        <SideBar asideToggle={asideToggleFn} menuOpen={props.menuOpen} />

        <div className="main_body">
          <TopHeader asideToggle={asideToggleFn} />
          <div className="body_container">
            <div className="body_content">
              {loading ? <Skeleton count={21} /> : props.children}
            </div>
          </div>
        </div>

        <div className="developer">
          <p>
            Developed By : &nbsp;
            <a href="https://khairulislam.xyz/">Khairul Islam</a>
          </p>
        </div>
        <div className="wrapper_background" onClick={asideToggleFn}></div>
      </section>
    </>
  );
};

export default AdminWraper;
