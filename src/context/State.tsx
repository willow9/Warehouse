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
      items: [...this.state.items, item],
    });
  };
  editItem = (item: Item, initialItemId: number) => {
    const newItems = this.state.items.filter((item) => {
      return item.ean !== initialItemId;
    });
    this.setState({ items: [...newItems, item] });
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
  changeQuantity = (itemId: number, newValue: number) => {
    this.state.items.find((item) => {
      if (item.ean == itemId) {
        item.quantity = newValue;
      }
    });
    // console.log(this.state);
  };
  changeQuantityOrPrice = (itemId: number, newValue: number, property: string) => {
    // this.state.items.find((item) => {
    //   if (item.ean == itemId) {
    //     item.price = newValue;
    //   }
    // });
    // console.log(itemId);
    // console.log(newValue);
    // console.log(property);

    const newItem = this.changeItemProperty(itemId, newValue, property);
    // console.log(newItem);

    this.changeItemProperty(itemId, newValue, property);
    this.changePriceHistory(itemId, newValue);
    // console.log(this.state.items);
  };
  changeItemProperty = (itemId: number, newValue: number, property: string) => {
    const item = this.state.items.find((item) => {
      return item.ean == itemId;
    });
    return { item, [property]: newValue };
  };
  changePriceHistory = (itemId: number, newValue: number) => {
    this.state.items.find((item) => {
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
    // console.log(this.state.items);
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
        priceHistory: [1, 2, 3],
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
          // changePrice: this.changePrice,
          changeQuantityOrPrice: this.changeQuantityOrPrice,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
