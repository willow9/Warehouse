import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Table from "./components/Table";
import Product from "./components/Product";
import NewItemForm from "./components/NewItemForm";
import EditItemForm from "./components/EditItemForm";
import State from "./context/State";

const App = () => {
  return (
    <State>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Table} />
          <Route exact path='/products/create' component={NewItemForm} />
          <Route exact path='/products/:ean/edit' component={EditItemForm} />
          <Route exact path='/products/:ean' component={Product} />
        </Switch>
      </BrowserRouter>
    </State>
  );
};

export default App;
