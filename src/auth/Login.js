import React from "react";
import "../dist/css/credential.css";

/** imported login images **/
import bKas from "../dist/images/icon/bkash.png";
import logo from "../dist/images/logo/logo.webp";
import rocket from "../dist/images/icon/rocket.png";
import dbbl from "../dist/images/icon/dbbl.png";

import UserWraper from "../components/layouts/UserWraper";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authentication/actionCreator";
import { Redirect } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";

function Login() {
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const isLoggedin = useSelector((state) => state.authReducer.isLoggedin);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "admin@gmail.com",
      password: "admin",
      scope: "admin",
    },
  });

  const onSubmit = (data, e) => {
    dispatch(login(data, addToast));
    e.target.reset();
  };

  /*   if (loading) {
      return <p>Loding....</p>;
    } */

  if (isLoggedin) {
    return <Redirect to="/admin" />;
  }

  return (
    <UserWraper>
      <section className="credential_section">
        <div className="section_cover">
          <div className="credential_div">
            <div className="form_box">
              <h2>
                We are <span>Admin {isLoggedin}</span>
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form_group">
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="form_control"
                    placeholder="Email"
                  />
                </div>

                <div className="form_group">
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className="form_control"
                    placeholder="Password"
                  />
                </div>
                <div className="form_group form-remeber">
                  <div className="form-check">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <Link to="/">Forgot password</Link>
                </div>
                <button
                  type="submit"
                  className="submit_btn adad"
                  onSubmit={handleSubmit(onSubmit)}
                  disabled={formState.isSubmitting}
                >
                  Login
                </button>
              </form>
            </div>
          </div>

          <div className="company_title">
            <div className="container_box">
              <div className="company_brand">
                <img src={logo} alt="" />
                <h3>Zepto Apps</h3>
              </div>
              <div className="company_info">
                <div className="info">
                  <h5>Dhaka Office</h5>
                  <p>Plot 60, Road 20, Sector 11, Uttara,</p>
                  <p>Dhaka -1230, BD.</p>
                  <p>Mobile : +8801708136034, +8801708136034</p>
                  <p>E-mail : abc@gmail.com</p>
                </div>
                <div className="info">
                  <h5>Dhaka Office</h5>
                  <p>Plot 60, Road 20, Sector 11, Uttara,</p>
                  <p> Dhaka -1230, BD.</p>
                  <p>Mobile : +8801708136034, +8801708136034</p>
                </div>
              </div>
              <div className="payment_method">
                <div className="payment_info">
                  <h4>
                    <img src={bKas} alt="" />
                    Bkash
                  </h4>
                  <p>
                    <i className="icon ion-ios-arrow-dropright-circle"></i> 0100
                    00000 (Personal)
                  </p>
                  <p>
                    <i className="icon ion-ios-arrow-dropright-circle"></i> 0100
                    00000 (Personal)
                  </p>
                </div>
                <div className="payment_info">
                  <h4>
                    <img src={rocket} alt="" /> Rocket
                  </h4>
                  <p>
                    <i className="icon ion-ios-arrow-dropright-circle"></i> 0100
                    00000 (Personal)
                  </p>
                </div>
                <div className="payment_info">
                  <h4>
                    <img src={dbbl} alt="" /> DBBL Bank
                  </h4>
                  <p>
                    <i className="icon ion-ios-arrow-dropright-circle"></i> A/C
                    Name : Zepto Apps
                  </p>
                  <p>
                    <i className="icon ion-ios-arrow-dropright-circle"></i> A/C
                    No : 156. 110. 10965
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </UserWraper>
  );
}

export default Login;
