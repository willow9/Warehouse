import React, { Component } from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductContext from "../context/ProductsContext";
import { TableHeader } from "./TableHeader";

type MyProps = {};
type MyState = { togleActivation: boolean; quantity: number };

class ItemTable extends Component<MyProps, MyState> {
  static contextType = ProductContext;

  constructor(props: any) {
    super(props);
    this.state = {
      togleActivation: false,
      quantity: 0,
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
    this.setState({ togleActivation: !this.state.togleActivation });
  };

  changeQuantity = (e: any) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
    this.context.changeQuantity(e.target.id, e.target.value);
  };
  changePrice = (e: any) => {
    this.context.changePrice(e.target.id, e.target.value);
  };
  renderItem = (item: any, index: number) => {
    return (
      <tr
        key={index}
        style={{
          backgroundColor: item.active ? "white" : "#C0C0C0",
          color: item.quantity == 0 ? "red" : "#212529",
        }}
      >
        <td>{item.name}</td>
        <td>{item.type}</td>
        <td>{item.weight}</td>
        <td>{item.color}</td>
        <td>{item.ean}</td>
        <td>
          <input type='checkbox' defaultChecked={item.active} id={item.ean} onChange={this.toggleCheckbox} />
        </td>

        <td>
          <input
            type='number'
            name='quantity'
            id={item.ean}
            placeholder={item.quantity}
            onChange={this.changeQuantity}
            disabled={!item.active}
          />
        </td>
        <td>
          <input
            type='number'
            name='price'
            id={item.ean}
            placeholder={item.price}
            onChange={this.changePrice}
            disabled={!item.active}
          />
        </td>
        <td>
          <Link to={`/products/${item.ean}`}>
            <button disabled={!item.active}>View</button>
          </Link>
        </td>
        <td>
          <Link to={`/products/${item.ean}/edit`}>
            <button disabled={!item.active}>Edit</button>
          </Link>
        </td>
        <td>
          <button id={item.ean} onClick={this.handleDelete} disabled={!item.active}>
            Delete
          </button>
        </td>
      </tr>
    );
  };

  render() {
    return (
      <>
        <h1>Table</h1>
        <ReactBootstrap.Table striped bordered hover>
          <TableHeader withActions={true}></TableHeader>
          <tbody>{this.context.items.map(this.renderItem)}</tbody>
        </ReactBootstrap.Table>
        <Link to={`/products/create`}>
          <button>Create Item</button>
        </Link>
      </>
    );
  }
}
export default ItemTable;
