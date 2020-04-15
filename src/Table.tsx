import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import * as ReactBootstrap from "react-bootstrap";

type MyProps = {};
type MyState = { items: Array<Item> };
interface Item {
  name: string;
  type: string;
  weight: number;
  color: string;
  active: boolean;
  ean: number;
}

class Table extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: [
        { name: "Cheese", type: "food", weight: 12.36, color: "blue", active: false, ean: 12121 },
        { name: "Book", type: "entertainment", weight: 2.36, color: "white", active: false, ean: 123221 },
        { name: "Game", type: "entertainment", weight: 1.3, color: "NA", active: false, ean: 98 },
        { name: "Scissors", type: "tools", weight: 5.3, color: "silver", active: false, ean: 1258 },
      ],
    };
  }

  handleDelete = (e: any) => {
    console.log(e.target.id);
    const newItems = this.state.items.filter((item) => {
      return item.ean != e.target.id;
    });
    console.log(newItems);
    this.setState({ items: newItems });
  };
  renderItem = (item: any, index: number) => {
    return (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.type}</td>
        <td>{item.weight}</td>
        <td>{item.color}</td>
        <td>{item.active}</td>
        <td>{item.ean}</td>
        <td>
          <Link to={`/users/${item.sku}`}>
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
          <tbody>{this.state.items.map(this.renderItem)}</tbody>
        </ReactBootstrap.Table>
      </>
    );
  }
}
export default Table;
