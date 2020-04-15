import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Table from "./Table";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/products' component={Table} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
