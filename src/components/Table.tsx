import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ReactBootstrap from "react-bootstrap";
import ProductContext from "../context/ProductsContext";
import { TableHeader } from "./TableHeader";

type MyProps = {};
type MyState = { togleActivation: boolean };

class Table extends Component<MyProps, MyState> {
  static contextType = ProductContext;

  constructor(props: any) {
    super(props);
    this.state = {
      togleActivation: false,
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
  renderItem = (item: any, index: number) => {
    return (
      <tr
        key={index}
        style={{
          backgroundColor: item.active ? "white" : "#C0C0C0",
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

        <td>{item.quantity}</td>
        <td>{item.price}</td>
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
export default Table;
