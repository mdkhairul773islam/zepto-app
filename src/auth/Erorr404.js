import React from "react";
import { Link } from "react-router-dom";
import UserWraper from "../components/layouts/UserWraper";
import "../dist/css/error404.css";
export default function erorr404() {
  return (
    <UserWraper>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="error-template">
              <h1>Oops!</h1>
              <h2>404 Not Found</h2>
              <div className="error-details">
                Sorry, an error has occured, Requested page not found!
              </div>
              <div className="error-actions">
                <Link to="/admin" className="btn btn-primary btn-lg">
                  <span className="glyphicon glyphicon-home"></span>
                  Take Me Home
                </Link>
                <Link to="#" className="btn btn-default btn-lg">
                  <span className="glyphicon glyphicon-envelope"></span>
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserWraper>
  );
}
