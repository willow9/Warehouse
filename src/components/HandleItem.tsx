import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import ProductContext from "../context/ProductsContext";
import ItemForm from "./ItemForm";

interface IProps extends RouteComponentProps<{ ean: string }> {}

interface IState {
  name: string;
  type: string;
  weight: number;
  color: string;
  active: boolean;
  ean: number;
  price: number;
  quantity: number;
  priceHistory: Array<number>;
  quantityHistory: Array<number>;
  initialEan: number;
  editItem: boolean;
}

export default class HandleItem extends Component<IProps, IState> {
  static contextType = ProductContext;
  constructor(props: IProps, context: any) {
    super(props);
    let item;
    let editItem;

    if (this.props.match.path === "/create") {
      item = {
        name: "",
        type: "",
        weight: 0,
        color: "",
        active: false,
        ean: 0,
        price: 0,
        quantity: 0,
        priceHistory: [],
        quantityHistory: [],
      };
      editItem = false;
    } else {
      item = context.items.find((item: any) => {
        return this.props.match.params.ean == item.ean;
      });
      editItem = true;
    }
    this.state = {
      name: item.name,
      type: item.type,
      weight: item.weight,
      color: item.color,
      active: item.active,
      ean: item.ean,
      price: item.price,
      quantity: item.quantity,
      priceHistory: item.priceHistory,
      quantityHistory: item.quantityHistory,
      initialEan: item.ean,
      editItem: editItem,
    };
  }
  handleChange = (e: any) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  };
  handleCheckboxChange = () => {
    this.setState({ ...this.state, active: !this.state.active });
  };
  changeItem = (e: any) => {
    e.preventDefault();
    const newItem: any = {
      name: this.state.name,
      type: this.state.type,
      weight: Number(this.state.weight),
      color: this.state.color,
      active: this.state.active,
      ean: Number(this.state.ean),
      price: Number(this.state.price),
      quantity: Number(this.state.quantity),
      priceHistory: this.state.priceHistory,
      quantityHistory: this.state.quantityHistory,
    };
    console.log("after editing");
    console.log(newItem.priceHistory);

    const initialEan: number = this.state.initialEan;
    this.context.editItem(newItem, initialEan);
    this.props.history.push("/");
  };
  addItem = () => {
    if (this.validateInput()) {
      const newItem: any = {
        name: this.state.name,
        type: this.state.type,
        weight: Number(this.state.weight),
        color: this.state.color,
        active: this.state.active,
        ean: Number(this.state.ean),
        price: Number(this.state.price),
        quantity: Number(this.state.quantity),
        priceHistory: [Number(this.state.price)],
        quantityHistory: [Number(this.state.quantity)],
      };
      this.context.addItem(newItem);
      this.props.history.push("/");
    }
  };
  validateInput = () => {
    if (
      this.state.name === "" ||
      this.state.type === "" ||
      this.state.weight === 0 ||
      this.state.color === "" ||
      this.state.ean === 0 ||
      this.state.price === 0 ||
      this.state.quantity === 0
    ) {
      return false;
    } else return true;
  };

  render() {
    return (
      <div className='container'>
        <ItemForm
          title={this.state.editItem ? "Edit Item" : "Add New Item"}
          name={this.state.name}
          type={this.state.type}
          weight={Number(this.state.weight)}
          color={this.state.color}
          active={Boolean(this.state.active)}
          ean={Number(this.state.ean)}
          price={Number(this.state.price)}
          quantity={Number(this.state.quantity)}
          handleChange={this.handleChange}
          handleCheckboxChange={this.handleCheckboxChange}
          changeItem={this.changeItem}
          addItem={this.addItem}
          editItem={this.state.editItem}
        />
      </div>
    );
  }
}
