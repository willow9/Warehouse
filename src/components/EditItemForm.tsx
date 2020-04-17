import React, { Component } from "react";
import ProductContext from "../context/ProductsContext";
import { RouteComponentProps } from "react-router-dom";
import Item from "../interfaces/IItem";

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

export default class EditItemForm extends Component<ItemProps, ItemtState> {
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
    this.context.changeItem(newItem, initialEan);
    this.props.history.push("/");
  };

  render() {
    console.log(this.context);

    return (
      <div className='container'>
        <h1>Edit Item</h1>
        <form>
          <div className='form-group'>
            <input
              id='name'
              type='text'
              className='form-control'
              placeholder={this.state.name}
              required
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              id='type'
              type='text'
              className='form-control'
              placeholder={this.state.type}
              required
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              id='weight'
              type='number'
              className='form-control'
              placeholder={String(this.state.weight)}
              required
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              id='color'
              type='text'
              className='form-control'
              placeholder={this.state.color}
              required
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              id='ean'
              type='number'
              className='form-control'
              placeholder={`${String(this.state.ean)} (Only numbers are allowed)`}
              required
              onChange={this.handleChange}
            />
          </div>

          <div className='form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='active'
              checked={this.state.active}
              onChange={this.handleCheckboxChange}
            />
            <label className='form-check-label'>Active</label>
          </div>
          <button type='submit' className='btn btn-primary' onClick={this.changeItem}>
            Save Changes
          </button>
        </form>
      </div>
    );
  }
}
