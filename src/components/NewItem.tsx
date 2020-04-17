import React, { Component } from "react";
import ProductContext from "../context/ProductsContext";
import Item from "../interfaces/IItem";
import { RouteComponentProps } from "react-router-dom";
import { EditItemForm } from "./EditItemForm";

interface NewItemProps extends RouteComponentProps<{}> {}

class NewItemForm extends Component<NewItemProps, Item> {
  static contextType = ProductContext;
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      type: "",
      weight: 0,
      color: "",
      active: false,
      ean: 0,
    };
  }
  handleChange = (e: any) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  };
  handleCheckboxChange = () => {
    this.setState({ ...this.state, active: !this.state.active });
  };
  addItem = (e: any) => {
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
        <EditItemForm
          title='Add New Item'
          name={this.state.name}
          type={this.state.type}
          weight={Number(this.state.weight)}
          color={this.state.color}
          active={Boolean(this.state.active)}
          ean={Number(this.state.ean)}
          handleChange={this.handleChange}
          handleCheckboxChange={this.handleCheckboxChange}
          changeItem={() => {}}
          addItem={this.addItem}
          required={true}
          editItem={false}
        />
      </div>
    );
  }
}
export default NewItemForm;
