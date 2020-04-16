import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Table from "./Table";
import Product from "./Product";
import State from "./context/State";

const App = () => {
  return (
    <State>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Table} />
          <Route exact path='/products/:ean' component={Product} />
        </Switch>
      </BrowserRouter>
    </State>
  );
};

export default App;
