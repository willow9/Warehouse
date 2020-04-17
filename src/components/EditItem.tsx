import React, { Component } from "react";
import ProductContext from "../context/ProductsContext";
import { RouteComponentProps } from "react-router-dom";
import Item from "../interfaces/IItem";
import { EditItemForm } from "./EditItemForm";

interface ItemProps extends RouteComponentProps<{ ean: string }> {}

interface ItemtState {
  name: string;
  type: string;
  weight: number;
  color: string;
  active: boolean;
  ean: number;
  initialEan: number;
}

export default class EditItem extends Component<ItemProps, ItemtState> {
  static contextType = ProductContext;
  constructor(props: ItemProps, context: any) {
    super(props);
    const item: Item = context.items.find((item: any) => {
      return this.props.match.params.ean == item.ean;
    });

    this.state = {
      name: item.name,
      type: item.type,
      weight: item.weight,
      color: item.color,
      active: item.active,
      ean: item.ean,
      initialEan: item.ean,
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

  render() {
    return (
      <div className='container'>
        <EditItemForm
          title='Edit Item'
          name={this.state.name}
          type={this.state.type}
          weight={Number(this.state.weight)}
          color={this.state.color}
          active={Boolean(this.state.active)}
          ean={Number(this.state.ean)}
          handleChange={this.handleChange}
          handleCheckboxChange={this.handleCheckboxChange}
          changeItem={this.changeItem}
          addItem={() => {}}
          required={false}
          editItem={true}
        />
      </div>
    );
  }
}
