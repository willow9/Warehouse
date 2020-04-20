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
    // localStorage.removeItem("items");
    // localStorage.setItem("items", JSON.stringify(newItems));
  };

  addItem = (item: Item) => {
    this.setState({
      items: [item, ...this.state.items],
    });
  };
  editItem = (item: Item, initialItemId: number) => {
    const newItems = this.state.items.filter((item) => {
      return item.ean !== initialItemId;
    });
    this.setState({ items: [item, ...newItems] });
  };
  changeItemActivation = (itemId: number) => {
    const changedItems = this.state.items;
    changedItems.find((item) => {
      if (item.ean == itemId) {
        item.active = !item.active;
      }
    });
    this.setState({ items: [...changedItems] });

    // localStorage.removeItem("items");
    // localStorage.setItem("items", JSON.stringify(this.state.items));
  };

  changeQuantityOrPrice = (itemId: number, newValue: number, property: string) => {
    console.log(newValue);

    const changedItems = this.state.items;
    changedItems.find((item) => {
      if (item.ean == itemId) {
        if (property == "price") {
          item["price"] = newValue;
          this.changePriceHistory(itemId, newValue);
        }
        if (property == "quantity") {
          item["quantity"] = newValue;
          this.changeQuantityHistory(itemId, newValue);
        }
      }
    });
    this.setState({ items: [...changedItems] });
  };

  changePriceHistory = (itemId: number, newValue: number) => {
    const changedItems = this.state.items;
    changedItems.find((item) => {
      if (item.ean == itemId) {
        if (item.priceHistory.length === 5 && item.priceHistory[4] != newValue) {
          for (let i = 0; i <= 4; i++) {
            item.priceHistory[i] = item.priceHistory[i + 1];
          }
          item.priceHistory[4] = Number(newValue);
        } else {
          if (item.priceHistory[item.priceHistory.length - 1] != newValue) {
            item.priceHistory[item.priceHistory.length] = Number(newValue);
          }
        }
      }
    });
    this.setState({ items: [...changedItems] });
  };
  changeQuantityHistory = (itemId: number, newValue: number) => {
    const changedItems = this.state.items;
    changedItems.find((item) => {
      if (item.ean == itemId) {
        if (item.quantityHistory.length === 5 && item.quantityHistory[4] != newValue) {
          for (let i = 0; i <= 4; i++) {
            item.quantityHistory[i] = item.quantityHistory[i + 1];
          }
          item.quantityHistory[4] = Number(newValue);
        } else {
          if (item.quantityHistory[item.quantityHistory.length - 1] != newValue) {
            item.quantityHistory[item.quantityHistory.length] = Number(newValue);
          }
        }
      }
    });
    this.setState({ items: [...changedItems] });
  };
  componentDidUpdate() {
    console.log("reender");
    console.log(this.state.items);
  }
  componentDidMount() {
    const items = [
      {
        name: "Cheese",
        type: "food",
        weight: 12.36,
        color: "blue",
        active: true,
        ean: 12121,
        quantity: 1,
        price: 23.65,
        priceHistory: [1, 2, 3, 4, 5],
        quantityHistory: [123, 0],
      },
      {
        name: "Book",
        type: "entertainment",
        weight: 2.36,
        color: "white",
        active: true,
        ean: 123221,
        quantity: 1,
        price: 23.65,
        priceHistory: [1, 2, 3],
        quantityHistory: [123, 0, 23, 65.25],
      },
      {
        name: "Game",
        type: "entertainment",
        weight: 1.3,
        color: "NA",
        active: true,
        ean: 98,
        quantity: 1,
        price: 23.65,
        priceHistory: [1, 2, 3],
        quantityHistory: [123, 0, 23, 65.25],
      },
      {
        name: "Scissors",
        type: "tools",
        weight: 5.3,
        color: "silver",
        active: false,
        ean: 1258,
        quantity: 0,
        price: 23.65,
        priceHistory: [1],
        quantityHistory: [123, 0, 23, 65.25],
      },
    ];
    if (!localStorage.getItem("items")) {
      localStorage.setItem("items", JSON.stringify(items));
    }

    this.setState({ items: JSON.parse(localStorage.getItem("items")!) });
  }
  render() {
    return (
      <ProductContext.Provider
        value={{
          items: this.state.items,
          removeItem: this.removeItem,
          changeActivation: this.changeItemActivation,
          addItem: this.addItem,
          editItem: this.editItem,
          changeQuantityOrPrice: this.changeQuantityOrPrice,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
