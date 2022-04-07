import React from "react";
import { Link } from "react-router-dom";

import "../dist/frontend/css/master.css";
import "../dist/frontend/css/home.css";

export default function index() {
  return (
    <>
      <nav className="contact_nav">
        <div className="container">
          <div className="nav_content">
            <div className="contact_info">
              <span>Contact Us :</span>
              <Link to="#" className="whatsapp">
                <img src="frontend/images/icon/whatsapp.png" alt="" />
              </Link>
              <Link to="#" className="msg">
                <img src="frontend/images/icon/msg.png" alt="" />
              </Link>
              <Link to="#" className="email">
                <img src="frontend/images/icon/email.png" alt="" />
              </Link>
              <Link to="#" className="call">
                <img src="frontend/images/icon/call.png" alt="" />
              </Link>
            </div>

            <p className="d-xl-block d-none">
              <img className="car" src="frontend/images/icon/car.png" alt="" />{" "}
              Free Deliver /y Over TK999 For Inside Dhaka & TK 1999 For Ouside
              Dhaka
            </p>

            <div className="contact_info">
              <Link to="#" className="flug">
                <img src="frontend/images/icon/flug.png" alt="" />
              </Link>
              <Link to="#" className="app">
                <img src="frontend/images/icon/app.png" alt="" />
              </Link>
              <Link to="#">
                <img src="frontend/images/icon/android.png" alt="" />
              </Link>
              <span className="d-md-inline-block d-none">
                Download the app for exclusive offers
              </span>
            </div>
          </div>
        </div>
      </nav>

      <nav className="brand_nav">
        <div className="container">
          <div className="nav_content">
            <Link to="#" className="brand order-lg-1 order-1">
              <img src="frontend/images/logo/01.png" alt="" />
            </Link>
            <form
              className="search_form order-lg-2 order-3"
              action="#"
              method="POST"
            >
              <div className="form-group">
                <input
                  type="text"
                  name="search"
                  placeholder="Search for a product or brand.."
                />
                <button type="submit" className="sendBtn">
                  <i className="icon ion-md-search"></i>
                </button>
              </div>
            </form>
            <div className="authentic order-lg-3 order-2">
              <Link to="#">
                <img src="frontend/images/icon/login.png" alt="" />{" "}
                LOGIN/REGISTER
              </Link>
              <Link to="#" className="basket">
                <img src="frontend/images/icon/basket.png" alt="" />
                <span>0</span> My Basket
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <nav className="navbar navbar_nav navbar-expand-lg">
        <div className="container">
          <Link to="#" className="brand d-lg-none">
            Summer Sale
          </Link>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#nav"
          >
            <i className="icon ion-ios-menu"></i>
          </button>
          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav">
              <li className="dropdown_li">
                <span className="nav-link">Summer Sale</span>
              </li>
              <li className="dropdown_li">
                <span className="nav-link">Brands</span>
              </li>
              <li>
                <Link to="#" className="nav-link">
                  Makeup
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link">
                  Skincare
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link">
                  Hair
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link">
                  The Body Shop
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link">
                  Fragrance
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link">
                  Men
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link">
                  Baby
                </Link>
              </li>
              <li className="dropdown_li">
                <span className="nav-link">Healthcare</span>
              </li>
              <li>
                <Link to="#" className="nav-link">
                  Gifts
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link">
                  Skin type
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link">
                  UK Shops
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="purchase_cart">
        <div className="card_title">
          <div className="title">
            <Link to="#" className="close_bar">
              <i className="icon ion-ios-close"></i>
            </Link>
            <h6>
              Totol <small>(including savings)</small>
            </h6>
          </div>
          <h5>BDT. 2000.00</h5>
        </div>
        <div className="purchase_body">
          <div className="btn_group">
            <Link to="#">Checkout</Link>
            <Link to="#">Clear Basket</Link>
          </div>

          <div className="product_box">
            <img src="frontend/images/product/01.png" alt="" />
            <div className="product_article">
              <div className="product_title">
                <h5>Lorem ipsum</h5>
                <p>lorem ipsum dolor sit amet. consectetur adipiscing elit.</p>
              </div>
              <div className="price_qty">
                <div className="group">
                  <label>Qty</label>
                  <select className="form-control">
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                  <button className="btn" type="submit">
                    <i className="icon ion-md-trash"></i>
                  </button>
                </div>
                <h4>BDT. 1500.00</h4>
              </div>
            </div>
          </div>
          <div className="product_box">
            <img src="frontend/images/product/01.png" alt="" />
            <div className="product_article">
              <div className="product_title">
                <h5>Lorem ipsum</h5>
                <p>lorem ipsum dolor sit amet. consectetur adipiscing elit.</p>
              </div>
              <div className="price_qty">
                <div className="group">
                  <label>Qty</label>
                  <select className="form-control">
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                  <button className="btn" type="submit">
                    <i className="icon ion-md-trash"></i>
                  </button>
                </div>
                <h4>BDT. 1500.00</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="product_section sale_now">
        <div className="container">
          <div className="section_title">
            <h3>Sale Now</h3>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product_area">
                <img
                  className="offer_tags"
                  src="frontend/images/icon/offer.png"
                  alt=""
                />
                <figure className="product_img">
                  <img src="frontend/images/product/01.png" alt="" />
                  <Link to="#" className="favorit">
                    <i className="icon ion-md-heart"></i>
                    <i className="icon ion-md-heart-empty"></i>
                  </Link>
                </figure>
                <div className="product_title">
                  <h4>Product Name</h4>
                  <p>
                    BDT 200.00 - <del>420 Tk</del>
                  </p>
                  <div className="product_action">
                    <button className="minus">
                      <i className="icon ion-md-remove"></i>
                    </button>
                    <div className="product_value">
                      <input
                        type="text"
                        className="quantity_value"
                        value="1"
                        readOnly
                      />
                      <small>Product added to your Basket</small>
                      <Link to="#"></Link>
                    </div>
                    <button className="plus">
                      <i className="icon ion-md-add"></i>
                    </button>
                    <button className="btnadd">Add to Basket</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product_area">
                <figure className="product_img">
                  <img src="frontend/images/product/02.png" alt="" />
                  <Link to="#" className="favorit">
                    <i className="icon ion-md-heart"></i>
                    <i className="icon ion-md-heart-empty"></i>
                  </Link>
                </figure>
                <div className="product_title">
                  <h4>Product Name</h4>
                  <p>
                    BDT 200.00 - <del>420 Tk</del>
                  </p>
                  <div className="product_action">
                    <button className="minus">
                      <i className="icon ion-md-remove"></i>
                    </button>
                    <div className="product_value">
                      <input
                        type="text"
                        className="quantity_value"
                        value="1"
                        readOnly
                      />
                      <small>Product added to your Basket</small>
                      <Link to="#"></Link>
                    </div>
                    <button className="plus">
                      <i className="icon ion-md-add"></i>
                    </button>
                    <button className="btnadd">Add to Basket</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product_area">
                <figure className="product_img">
                  <img src="frontend/images/product/03.png" alt="" />
                  <Link to="#" className="favorit">
                    <i className="icon ion-md-heart"></i>
                    <i className="icon ion-md-heart-empty"></i>
                  </Link>
                </figure>
                <div className="product_title">
                  <h4>Product Name</h4>
                  <p>
                    BDT 200.00 - <del>420 Tk</del>
                  </p>
                  <small className="condition">
                    If you like we can notify you when back in stock
                  </small>
                  <div className="product_action">
                    <button className="minus">
                      <i className="icon ion-md-remove"></i>
                    </button>
                    <div className="product_value">
                      <input
                        type="text"
                        className="quantity_value"
                        value="1"
                        readOnly
                      />
                      <small>Product added to your Basket</small>
                      <Link to="#"></Link>
                    </div>
                    <button className="plus">
                      <i className="icon ion-md-add"></i>
                    </button>
                    <button className="btnadd">Sold Out Notify me</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product_area">
                <figure className="product_img">
                  <img src="frontend/images/product/04.png" alt="" />
                  <Link to="#" className="favorit">
                    <i className="icon ion-md-heart"></i>
                    <i className="icon ion-md-heart-empty"></i>
                  </Link>
                </figure>
                <div className="product_title">
                  <h4>Product Name</h4>
                  <p>
                    BDT 200.00 - <del>420 Tk</del>
                  </p>
                  <div className="product_action">
                    <button className="minus">
                      <i className="icon ion-md-remove"></i>
                    </button>
                    <div className="product_value">
                      <input
                        type="text"
                        className="quantity_value"
                        value="1"
                        readOnly
                      />
                      <small>Product added to your Basket</small>
                      <Link to="#"></Link>
                    </div>
                    <button className="plus">
                      <i className="icon ion-md-add"></i>
                    </button>
                    <button className="btnadd">Add to Basket</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product_area">
                <figure className="product_img">
                  <img src="frontend/images/product/05.png" alt="" />
                  <Link to="#" className="favorit">
                    <i className="icon ion-md-heart"></i>
                    <i className="icon ion-md-heart-empty"></i>
                  </Link>
                </figure>
                <div className="product_title">
                  <h4>Product Name</h4>
                  <p>
                    BDT 200.00 - <del>420 Tk</del>
                  </p>
                  <div className="product_action">
                    <button className="minus">
                      <i className="icon ion-md-remove"></i>
                    </button>
                    <div className="product_value">
                      <input
                        type="text"
                        className="quantity_value"
                        value="1"
                        readOnly
                      />
                      <small>Product added to your Basket</small>
                      <Link to="#"></Link>
                    </div>
                    <button className="plus">
                      <i className="icon ion-md-add"></i>
                    </button>
                    <button className="btnadd">Add to Basket</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product_area">
                <figure className="product_img">
                  <img src="frontend/images/product/06.png" alt="" />
                  <Link to="#" className="favorit">
                    <i className="icon ion-md-heart"></i>
                    <i className="icon ion-md-heart-empty"></i>
                  </Link>
                </figure>
                <div className="product_title">
                  <h4>Product Name</h4>
                  <p>
                    BDT 200.00 - <del>420 Tk</del>
                  </p>
                  <div className="product_action">
                    <button className="minus">
                      <i className="icon ion-md-remove"></i>
                    </button>
                    <div className="product_value">
                      <input
                        type="text"
                        className="quantity_value"
                        value="1"
                        readOnly
                      />
                      <small>Product added to your Basket</small>
                      <Link to="#"></Link>
                    </div>
                    <button className="plus">
                      <i className="icon ion-md-add"></i>
                    </button>
                    <button className="btnadd">Add to Basket</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product_area">
                <img
                  className="offer_tags"
                  src="frontend/images/icon/offer.png"
                  alt=""
                />
                <figure className="product_img">
                  <img src="frontend/images/product/07.png" alt="" />
                  <Link to="#" className="favorit">
                    <i className="icon ion-md-heart"></i>
                    <i className="icon ion-md-heart-empty"></i>
                  </Link>
                </figure>
                <div className="product_title">
                  <h4>Product Name</h4>
                  <p>
                    BDT 200.00 - <del>420 Tk</del>
                  </p>
                  <div className="product_action">
                    <button className="minus">
                      <i className="icon ion-md-remove"></i>
                    </button>
                    <div className="product_value">
                      <input
                        type="text"
                        className="quantity_value"
                        value="1"
                        readOnly
                      />
                      <small>Product added to your Basket</small>
                      <Link to="#"></Link>
                    </div>
                    <button className="plus">
                      <i className="icon ion-md-add"></i>
                    </button>
                    <button className="btnadd">Add to Basket</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product_area">
                <img
                  className="offer_tags"
                  src="frontend/images/icon/offer.png"
                  alt=""
                />
                <figure className="product_img">
                  <img src="frontend/images/product/08.png" alt="" />
                  <Link to="#" className="favorit">
                    <i className="icon ion-md-heart"></i>
                    <i className="icon ion-md-heart-empty"></i>
                  </Link>
                </figure>
                <div className="product_title">
                  <h4>Product Name</h4>
                  <p>
                    BDT 200.00 - <del>420 Tk</del>
                  </p>
                  <div className="product_action">
                    <button className="minus">
                      <i className="icon ion-md-remove"></i>
                    </button>
                    <div className="product_value">
                      <input
                        type="text"
                        className="quantity_value"
                        value="1"
                        readOnly
                      />
                      <small>Product added to your Basket</small>
                      <Link to="#"></Link>
                    </div>
                    <button className="plus">
                      <i className="icon ion-md-add"></i>
                    </button>
                    <button className="btnadd">Add to Basket</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="#" className="load_more" href="">
              Load More
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="contact_info">
                <h4>Our Company</h4>
                <ul className="info_link">
                  <li>
                    <Link to="#">About Eurasia Supplies</Link>
                  </li>
                  <li>
                    <Link to="#">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="#">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="#">Privacy policy</Link>
                  </li>
                  <li>
                    <Link to="#">Sitemap</Link>
                  </li>
                  <li>
                    <Link to="#">Copyright & Warranties</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="contact_info">
                <h4>Quick Link</h4>
                <ul className="info_link">
                  <li>
                    <Link to="#">Blog: Tips & Turorials</Link>
                  </li>
                  <li>
                    <Link to="#">Shipping & Delevery</Link>
                  </li>
                  <li>
                    <Link to="#">Return Policy</Link>
                  </li>
                  <li>
                    <Link to="#">How to Buy</Link>
                  </li>
                  <li>
                    <Link to="#">Payments</Link>
                  </li>
                  <li>
                    <Link to="#">Reward & VIP Membership</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="contact_info">
                <h4>Download Our App</h4>
                <div className="apps">
                  <Link to="#">
                    <img src="frontend/images/logo/app_1.png" alt="" />
                  </Link>
                  <Link to="#">
                    <img src="frontend/images/logo/app_2.png" alt="" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="contact_info">
                <h4>Contact Us</h4>
                <ul className="info_link">
                  <li>H # 358; R # 27,</li>
                  <li>New DOHS, Mohakhali,</li>
                  <li>Dhaka - 1206.</li>
                  <li>
                    Mobail : <Link to="#">tel:01889841414</Link>, <br />
                    <Link to="#">tel:01889841414</Link>
                  </li>
                  <li>
                    Email
                    <Link to="#">care@urasiasupplies.com</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-6 order-lg-1 order-2">
              <div className="footer_info left">
                <h4>Follow Us</h4>
                <ul className="social_link left">
                  <li>
                    <Link to="#">
                      <img src="frontend/images/social/ff.png" alt="" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="frontend/images/social/ft.png" alt="" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="frontend/images/social/fi.png" alt="" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="frontend/images/social/fy.png" alt="" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="frontend/images/social/fin.png" alt="" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src="frontend/images/social/fp.png" alt="" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 order-lg-2 order-1">
              <div className="footer_info">
                <h4>Sign up for our newsletter</h4>
                <form className="newsletter" action="#" method="POST">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="example@gmail.com"
                    />
                    <button type="submit" className="sendBtn">
                      <i className="icon ion-ios-send"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 order-lg-3 order-3">
              <div className="footer_info right">
                <h4>Accepted payment options</h4>
                <figure className="payment_option">
                  <img src="frontend/images/payment/01.png" alt="" />
                  <img src="frontend/images/payment/02.png" alt="" />
                  <img src="frontend/images/payment/03.png" alt="" />
                  <img src="frontend/images/payment/04.png" alt="" />
                  <img src="frontend/images/payment/05.png" alt="" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="copyright">
        <p>© 2021 Copyright</p>
        <img src="frontend/images/logo/02.png" alt="" />
      </footer>
    </>
  );
}
