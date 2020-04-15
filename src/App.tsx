import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Table from "./Table";
import State from "./context/State";

const App = () => {
  return (
    <State>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Table} />
        </Switch>
      </BrowserRouter>
    </State>
  );
};

export default App;
