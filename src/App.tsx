import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddItem from "./components/AddItem";
import EditItem from "./components/EditItem";
import ItemPreview from "./components/ItemPreview";
import ItemTable from "./components/ItemTable";
import State from "./context/State";

const App = () => {
  return (
    <State>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path='/' component={ItemTable} />
          <Route exact path='/create' component={AddItem} />
          <Route exact path='/:ean/edit' component={EditItem} />
          <Route exact path='/:ean' component={ItemPreview} />
        </Switch>
      </BrowserRouter>
    </State>
  );
};

export default App;
