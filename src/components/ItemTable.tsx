import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductContext from "../context/ProductsContext";
import TableBody from "./TableBody";
import { TableHeader } from "./TableHeader";

type IState = { isValueChanged: boolean };

class ItemTable extends Component<{}, IState> {
  static contextType = ProductContext;

  constructor(props: any) {
    super(props);
    this.state = {
      isValueChanged: false,
    };
  }

  handleDelete = (e: any) => {
    const removedItem = this.context.items.find((item: any) => {
      return item.ean == e.target.id;
    });
    this.context.removeItem(removedItem.ean);
  };

  toggleCheckbox = (e: any) => {
    this.context.changeActivation(e.target.id);
  };

  changeQuantityOrPrice = (e: any) => {
    if (this.state.isValueChanged) {
      this.context.changeQuantityOrPrice(e.target.id, Number(e.target.value), e.target.name);
      this.setState({ isValueChanged: false });
    }
  };

  preventEmptyInputs = () => {
    this.setState({ isValueChanged: true });
  };

  saveToDB = () => {
    this.context.saveToDB();
  };

  render() {
    return (
      <div className='container'>
        <h1>Products</h1>
        <Table striped bordered hover>
          <TableHeader withActions={true}></TableHeader>
          <TableBody
            handleDelete={this.handleDelete}
            preventEmptyInputs={this.preventEmptyInputs}
            changeQuantityOrPrice={this.changeQuantityOrPrice}
            toggleCheckbox={this.toggleCheckbox}
          />
        </Table>
        <div className='text-center'>
          <Link to='create'>
            <button className='btn btn-info'>Create New Item</button>
          </Link>
          &nbsp;
          <button className='btn btn-info' onClick={this.saveToDB}>
            Save All Changes
          </button>
        </div>
      </div>
    );
  }
}
export default ItemTable;
