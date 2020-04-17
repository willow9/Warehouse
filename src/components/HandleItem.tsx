import React, { Component } from "react";
import ProductContext from "../context/ProductsContext";
import { RouteComponentProps } from "react-router-dom";
import Item from "../interfaces/IItem";
import ItemForm from "./ItemForm";

interface IProps extends RouteComponentProps<{ ean: string }> {}

interface IState {
  name: string;
  type: string;
  weight: number;
  color: string;
  active: boolean;
  ean: number;
  initialEan: number;
  editItem: boolean;
}

export default class HandleItem extends Component<IProps, IState> {
  static contextType = ProductContext;
  constructor(props: IProps, context: any) {
    super(props);
    let item;
    let editItem;

    if (this.props.match.path === "/products/create") {
      item = { name: "", type: "", weight: 0, color: "", active: false, ean: 0 };
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
    const newItem: Item = {
      name: this.state.name,
      type: this.state.type,
      weight: Number(this.state.weight),
      color: this.state.color,
      active: this.state.active,
      ean: Number(this.state.ean),
    };
    const initialEan: number = this.state.initialEan;
    this.context.editItem(newItem, initialEan);
    this.props.history.push("/");
  };
  addItem = () => {
    if (this.validateInput()) {
      const newItem: Item = {
        name: this.state.name,
        type: this.state.type,
        weight: Number(this.state.weight),
        color: this.state.color,
        active: this.state.active,
        ean: Number(this.state.ean),
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
      this.state.ean === 0
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
