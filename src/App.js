import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Erorr404 from "./auth/Erorr404";
// All Routes Importet here.
import RouterList from "./routes";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-right">
      <div className="App">
        <Router>
          <Switch>
            {RouterList}
            <Route component={Erorr404} />
          </Switch>
        </Router>
      </div>
    </ToastProvider>
  );
}

export default App;
