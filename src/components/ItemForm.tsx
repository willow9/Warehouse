import React from "react";

type IProps = {
  title: string;
  name: string;
  type: string;
  weight: number;
  color: string;
  active: boolean;
  ean: number;
  price: number;
  quantity: number;
  editItem: boolean;

  handleChange: (e: any) => void;
  handleCheckboxChange: (e: any) => void;
  changeItem: (e: any) => void;
  addItem: (e: any) => void;
};

const ItemForm: React.SFC<IProps> = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <form>
        <div className='form-group row'>
          <label className='col-sm-1 col-form-label'>Name</label>
          <div className='col-sm-11'>
            <input
              id='name'
              type='text'
              className='form-control'
              placeholder={props.name}
              required={!props.editItem}
              onChange={props.handleChange}
            />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-1 col-form-label'>Type</label>
          <div className='col-sm-11'>
            <input
              id='type'
              type='text'
              className='form-control'
              placeholder={props.type}
              required={!props.editItem}
              onChange={props.handleChange}
            />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-1 col-form-label'>Weight</label>
          <div className='col-sm-11'>
            <input
              id='weight'
              type='number'
              className='form-control'
              placeholder={String(props.weight)}
              required={!props.editItem}
              onChange={props.handleChange}
            />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-1 col-form-label'>Color</label>
          <div className='col-sm-11'>
            <input
              id='color'
              type='text'
              className='form-control'
              placeholder={props.color}
              required={!props.editItem}
              onChange={props.handleChange}
            />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-1 col-form-label'>EAN</label>
          <div className='col-sm-11'>
            <input
              id='ean'
              type='number'
              className='form-control'
              placeholder={String(props.ean)}
              required={!props.editItem}
              onChange={props.handleChange}
            />

            <small className='form-text text-muted'>Only numbers are allowed.</small>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-1 col-form-label'>Price</label>
          <div className='col-sm-11'>
            <input
              id='price'
              type='number'
              className='form-control'
              placeholder={String(props.price)}
              required={!props.editItem}
              disabled={props.editItem}
              onChange={props.handleChange}
            />
            <small className='form-text text-muted'>Only numbers are allowed.</small>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-1 col-form-label'>Quantity</label>
          <div className='col-sm-11'>
            <input
              id='quantity'
              type='number'
              className='form-control'
              placeholder={String(props.quantity)}
              required={!props.editItem}
              disabled={props.editItem}
              onChange={props.handleChange}
            />
            <small className='form-text text-muted'>Only numbers are allowed.</small>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-1'>
            <label className='form-check-label'>Active</label>
          </div>
          <div className='col-sm-1'>
            <div className='form-check'>
              <input
                type='checkbox'
                className='form-check-input'
                id='active'
                checked={props.active}
                onChange={props.handleCheckboxChange}
              />
            </div>
          </div>
        </div>
        <div className='text-center'>
          <button type='submit' className='btn btn-info' onClick={props.editItem ? props.changeItem : props.addItem}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default ItemForm;
