import React, { Component } from "react";

type IProps = {
  title: string;
  name: string;
  type: string;
  weight: number;
  color: string;
  active: boolean;
  ean: number;
  required: boolean;
  editItem: boolean;

  handleChange: (e: any) => void;
  handleCheckboxChange: (e: any) => void;
  changeItem: (e: any) => void;
  addItem: (e: any) => void;
};

export class EditItemForm extends Component<IProps> {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <form>
          <div className='form-group'>
            <input
              id='name'
              type='text'
              className='form-control'
              placeholder={this.props.name}
              required={this.props.required}
              onChange={this.props.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              id='type'
              type='text'
              className='form-control'
              placeholder={this.props.type}
              value={this.props.type}
              required={this.props.required}
              onChange={this.props.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              id='weight'
              type='number'
              className='form-control'
              placeholder={String(this.props.weight)}
              required={this.props.required}
              onChange={this.props.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              id='color'
              type='text'
              className='form-control'
              placeholder={this.props.color}
              required={this.props.required}
              onChange={this.props.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              id='ean'
              type='number'
              className='form-control'
              placeholder={`${String(this.props.ean)} (Only numbers are allowed)`}
              required={this.props.required}
              onChange={this.props.handleChange}
            />
          </div>

          <div className='form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='active'
              checked={this.props.active}
              onChange={this.props.handleCheckboxChange}
            />
            <label className='form-check-label'>Active</label>
          </div>
          <button
            type='submit'
            className='btn btn-primary'
            onClick={this.props.editItem ? this.props.changeItem : this.props.addItem}
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}
