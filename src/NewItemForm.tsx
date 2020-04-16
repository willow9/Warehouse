import React, { Component } from "react";
import ProductContext from "./context/ProductsContext";
import Item from "./interfaces/IItem";

class NewItemForm extends Component<{}, Item> {
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
    console.log(e.target.value);
  };
  handleCheckboxChange = () => {
    this.setState({ ...this.state, active: !this.state.active });
  };
  addItem = (e: any) => {
    e.preventDefault();
    const newItem: Item = {
      name: this.state.name,
      type: this.state.type,
      weight: Number(this.state.weight),
      color: this.state.color,
      active: this.state.active,
      ean: Number(this.state.ean),
    };
    this.context.addItem(newItem);
  };
  render() {
    return (
      <div className='container'>
        <h1>Add New Item</h1>
        <form>
          <div className='form-group'>
            <input
              id='name'
              type='text'
              className='form-control'
              placeholder='Name'
              required
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              id='type'
              type='text'
              className='form-control'
              placeholder='Type'
              required
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              id='weight'
              type='number'
              className='form-control'
              placeholder='Weight '
              required
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              id='color'
              type='text'
              className='form-control'
              placeholder='Color'
              required
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              id='ean'
              type='number'
              className='form-control'
              placeholder='EAN (Only numbers are allowed)'
              required
              onChange={this.handleChange}
            />
          </div>

          <div className='form-check'>
            <input type='checkbox' className='form-check-input' id='active' onChange={this.handleCheckboxChange} />
            <label className='form-check-label'>Active</label>
          </div>
          <button type='submit' className='btn btn-primary' onClick={this.addItem}>
            Save
          </button>
        </form>
      </div>
    );
  }
}
export default NewItemForm;
