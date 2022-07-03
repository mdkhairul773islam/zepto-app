import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Erorr404 from "./auth/Erorr404";

// All Routes Importet here.
import RouterList from "./routes";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
      <div className="App">
        <Router>
          <Switch>
            {RouterList}
            <Route component={Erorr404} />
          </Switch>
        </Router>
        <ToastContainer />
      </div>
  );
}

export default App;
