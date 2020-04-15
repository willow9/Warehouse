import React, { Component } from "react";
import ProductContext from "./ProductsContext";

type MyProps = {};
type MyState = { items: Array<Item> };
interface Item {
  name: string;
  type: string;
  weight: number;
  color: string;
  active: boolean;
  ean: number;
}

export default class State extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
    };
  }
  removeItem = (productId: number) => {
    const newItems = this.state.items.filter((item) => {
      return item.ean !== productId;
    });
    this.setState({ items: newItems });
    localStorage.removeItem("items");
    localStorage.setItem("items", JSON.stringify(newItems));
  };
  componentDidMount() {
    const items = [
      { name: "Cheese", type: "food", weight: 12.36, color: "blue", active: false, ean: 12121 },
      { name: "Book", type: "entertainment", weight: 2.36, color: "white", active: false, ean: 123221 },
      { name: "Game", type: "entertainment", weight: 1.3, color: "NA", active: false, ean: 98 },
      { name: "Scissors", type: "tools", weight: 5.3, color: "silver", active: false, ean: 1258 },
    ];
    if (!localStorage.getItem("items")) {
      localStorage.setItem("items", JSON.stringify(items));
    }

    this.setState({ items: JSON.parse(localStorage.getItem("items")!) });
  }
  render() {
    return (
      <ProductContext.Provider value={{ items: this.state.items, removeItem: this.removeItem }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
