import React from "react";
import Item from "../interfaces/IItem";

export default React.createContext({
  items: [{ name: "Cheese", type: "food", weight: 12.36, color: "blue", active: false, ean: 12121 }],

  removeItem: (productId: number) => {},
  changeActivation: (itemId: number) => {},
  addItem: (item: Item) => {},
});
