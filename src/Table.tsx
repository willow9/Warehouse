import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import * as ReactBootstrap from "react-bootstrap";
import ProductContext from "./context/ProductsContext";

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
          backgroundColor: item.active ? "grey" : "blue",
        }}
      >
        <td>{item.name}</td>
        <td>{item.type}</td>
        <td>{item.weight}</td>
        <td>{item.color}</td>
        <td>
          <input type='checkbox' defaultChecked={item.active} id={item.ean} onChange={this.toggleCheckbox} />
        </td>
        <td>{item.ean}</td>
        <td>
          <Link to={`/users/${item.ean}`}>
            <button>View</button>
          </Link>
        </td>
        <td>
          <button>Edit</button>
        </td>
        <td>
          <button id={item.ean} onClick={this.handleDelete}>
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
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Weight</th>
              <th>Color</th>
              <th>Active</th>
              <th>EAN</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>
          <tbody>{this.context.items.map(this.renderItem)}</tbody>
        </ReactBootstrap.Table>
      </>
    );
  }
}
export default Table;
