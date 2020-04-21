import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import ProductContext from "../context/ProductsContext";
import ItemForm from "./ItemForm";

interface IProps extends RouteComponentProps<{}> {}

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
}

export default class AddItem extends Component<IProps, IState> {
  static contextType = ProductContext;
  constructor(props: IProps) {
    super(props);

    this.state = {
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
  }
  handleChange = (e: any) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  };
  handleCheckboxChange = () => {
    this.setState({ ...this.state, active: !this.state.active });
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
          title='Add New Item'
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
          addItem={this.addItem}
          editItem={false}
        />
      </div>
    );
  }
}
