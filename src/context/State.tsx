import React, { Component } from "react";
import ProductContext from "./ProductsContext";
import Item from "../interfaces/IItem";

type ItemsState = { items: Array<Item> };

export default class State extends Component<{}, ItemsState> {
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

  addItem = (item: Item) => {
    this.setState({
      items: [...this.state.items, item],
    });
  };
  changeItemActivation = (itemId: number) => {
    this.state.items.find((item) => {
      if (item.ean == itemId) {
        item.active = !item.active;
      }
    });

    // localStorage.removeItem("items");
    // localStorage.setItem("items", JSON.stringify(this.state.items));
  };

  componentDidMount() {
    const items = [
      { name: "Cheese", type: "food", weight: 12.36, color: "blue", active: true, ean: 12121 },
      { name: "Book", type: "entertainment", weight: 2.36, color: "white", active: false, ean: 123221 },
      { name: "Game", type: "entertainment", weight: 1.3, color: "NA", active: true, ean: 98 },
      { name: "Scissors", type: "tools", weight: 5.3, color: "silver", active: false, ean: 1258 },
    ];
    if (!localStorage.getItem("items")) {
      localStorage.setItem("items", JSON.stringify(items));
    }

    this.setState({ items: JSON.parse(localStorage.getItem("items")!) });
  }
  render() {
    console.log(this.state.items);

    return (
      <ProductContext.Provider
        value={{
          items: this.state.items,
          removeItem: this.removeItem,
          changeActivation: this.changeItemActivation,
          addItem: this.addItem,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
