import React, { useState, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Link } from "react-router-dom";
function SideBar(props) {
  const [menuOpen, setMenuOpen] = useState(props.menuOpen);

  useEffect(() => {
    var sidebar_nav = document.querySelectorAll(".aside_nav>li>a");
    if (sidebar_nav) {
      sidebar_nav.forEach((value) => {
        value.addEventListener("click", (event) => {
          if (event.target.closest("li").classList.contains("active")) {
            event.target.closest("li").classList.remove("active");
            if (event.target.nextElementSibling) {
              event.target.nextElementSibling.style.cssText = ``;
            }
          } else {
            sidebar_nav.forEach((value1) => {
              value1.parentElement.classList.remove("active");
              value1.parentElement.lastElementChild.style.cssText = ``;
            });
            event.target.closest("li").classList.add("active");
            if (event.target.nextElementSibling) {
              event.target.nextElementSibling.style.cssText = `height:${event.target.nextElementSibling.scrollHeight}px`;
            }
          }
        });
      });
    }
  }, []);

  const menuOpenFn = (e) => {
    setMenuOpen(e.currentTarget.dataset.id);
  };
  return (
    <aside className="panel_aside">
      <div className="brand">
        <span className="brand_icon">
          <i className="icon ion-md-home"></i>
        </span>
        <h3>Point of sale</h3>
        <Link to="#" id="panelClose_btn" onClick={() => props.asideToggle()}>
          <i className="icon ion-ios-close io-36"></i>
        </Link>
        <Link to="#" id="panelOpen_btn" onClick={() => props.asideToggle()}>
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>

      <Scrollbars style={{ height: "calc(100vh - 60px)" }} autoHide>
        <ul className="aside_nav">
          <li
            data-id="dashboard"
            className={`dropdown ${menuOpen === "dashboard" ? "active" : ""}`}
            onClick={menuOpenFn}
          >
            <Link to="/admin">
              <i class="fab fa-stack-overflow"></i>
              <span className="menu_title">Dashboard</span>
            </Link>
          </li>
          <li
            data-id="product"
            className={`dropdown ${menuOpen === "product" ? "active" : ""}`}
            onClick={menuOpenFn}
          >
            <Link to="#">
              <i class="fab fa-product-hunt"></i>
              <span className="menu_title">Product</span>
              <span className="menu_arrow">
                <i className="icon ion-ios-arrow-forward right"></i>
                <i className="icon ion-ios-arrow-down down"></i>
              </span>
            </Link>
            <ul>
              <li>
                <Link to="/product/add">Add Product</Link>
              </li>
              <li>
                <Link to="/product/all">All Product</Link>
              </li>
              <li>
                <Link to="/product/category/">Category</Link>
              </li>
              <li>
                <Link to="/product/brand">Brand</Link>
              </li>
              <li>
                <Link to="/product/unit">Unit</Link>
              </li>
            </ul>
          </li>
          <li
            data-id="warehouse"
            className={`dropdown ${menuOpen === "warehouse" ? "active" : ""}`}
            onClick={menuOpenFn}
          >
            <Link to="#">
              <i className="fas fa-bezier-curve"></i>
              <span className="menu_title">Warehouse</span>
              <span className="menu_arrow">
                <i className="icon ion-ios-arrow-forward right"></i>
                <i className="icon ion-ios-arrow-down down"></i>
              </span>
            </Link>
            <ul>
              <li>
                <Link to="/warehouse/add">Add Warehouse</Link>
              </li>
              <li>
                <Link to="/warehouse/all">All Warehouse</Link>
              </li>
            </ul>
          </li>
          <li
            data-id="supplier"
            className={`dropdown ${menuOpen === "supplier" ? "active" : ""}`}
            onClick={menuOpenFn}
          >
            <Link to="#">
              <i className="fas fa-user"></i>
              <span className="menu_title">Supplier</span>
              <span className="menu_arrow">
                <i className="icon ion-ios-arrow-forward right"></i>
                <i className="icon ion-ios-arrow-down down"></i>
              </span>
            </Link>
            <ul>
              <li>
                <Link to="/supplier/add">Add Supplier</Link>
              </li>
              <li>
                <Link to="/supplier/all">All Supplier</Link>
              </li>
              <li>
                <Link to="/supplier/new-transaction">New Transaction</Link>
              </li>
              <li>
                <Link to="/supplier/all-transaction">All Transaction</Link>
              </li>
            </ul>
          </li>
          <li
            data-id="privilege"
            className={`dropdown ${menuOpen === "privilege" ? "active" : ""}`}
            onClick={menuOpenFn}
          >
            <Link to="#">
              <i className="fas fa-cart-arrow-down"></i>
              <span className="menu_title">Privilege</span>
            </Link>
          </li>
        </ul>
      </Scrollbars>
    </aside>
  );
}

export default SideBar;
