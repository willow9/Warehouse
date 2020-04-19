import React from "react";
import Item from "../interfaces/IItem";

export default React.createContext({
  items: [{ name: "Cheese", type: "food", weight: 12.36, color: "blue", active: false, ean: 12121 }],

  removeItem: (productId: number) => {},
  changeActivation: (itemId: number) => {},
  addItem: (item: Item) => {},
  editItem: (item: Item, itemId: number) => {},
  changeQuantityOrPrice: (itemId: number, newValue: number, property: string) => {},
  // changePrice: (itemId: number, newValue: number) => {},
});
