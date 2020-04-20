import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HandleItem from "./components/HandleItem";
import Product from "./components/ItemPreview";
import ItemTable from "./components/ItemTable";
import State from "./context/State";

const App = () => {
  return (
    <State>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path='/' component={ItemTable} />
          <Route exact path='/create' component={HandleItem} />
          <Route exact path='/:ean/edit' component={HandleItem} />
          <Route exact path='/:ean' component={Product} />
        </Switch>
      </BrowserRouter>
    </State>
  );
};

export default App;
