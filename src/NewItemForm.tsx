import React, { Component } from "react";

class NewItemForm extends Component {
  render() {
    return (
      <div className='container'>
        <h1>Add New Item</h1>
        <form>
          <div className='form-group'>
            <input type='text' className='form-control' placeholder='Name' required />
          </div>
          <div className='form-group'>
            <input type='text' className='form-control' placeholder='Type' required />
          </div>
          <div className='form-group'>
            <input type='text' className='form-control' placeholder='Weight' required />
          </div>
          <div className='form-group'>
            <input type='text' className='form-control' placeholder='Color' required />
          </div>
          <div className='form-group'>
            <input type='text' className='form-control' placeholder='EAN' required />
          </div>

          <div className='form-check'>
            <input type='checkbox' className='form-check-input' id='exampleCheck1' />
            <label className='form-check-label' htmlFor='exampleCheck1'>
              Active
            </label>
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default NewItemForm;
