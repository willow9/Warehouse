import React, { Component } from "react";
import ProductContext from "../context/ProductsContext";
import { RouteComponentProps } from "react-router-dom";
import * as ReactBootstrap from "react-bootstrap";

interface Item {
  name: string;
  type: string;
  weight: number;
  color: string;
  active: boolean;
  ean: number;
}
interface IProductProps extends RouteComponentProps<{ ean: string }> {}
interface IProductState {
  item: Item;
}

export default class Product extends Component<IProductProps, IProductState> {
  static contextType = ProductContext;
  constructor(props: IProductProps, context: any) {
    super(props);
    this.state = {
      item: context.items.find((item: any) => {
        return this.props.match.params.ean == item.ean;
      }),
    };
  }
  renderItem = (item: Item) => {
    return (
      <>
        <tr key={item.ean}>
          <td>{item.name}</td>
          <td>{item.type}</td>
          <td>{item.weight}</td>
          <td>{item.color}</td>
          <td>{item.ean}</td>
          {/* <p>{item.active ? "Active" : "Inactive"}</p> */}
        </tr>
      </>
    );
  };

  render() {
    return (
      <div>
        <h1>Product</h1>
        <ReactBootstrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Weight</th>
              <th>Color</th>
              <th>EAN</th>
            </tr>
          </thead>
          <tbody>{this.state.item ? this.renderItem(this.state.item) : null}</tbody>
        </ReactBootstrap.Table>
      </div>
    );
  }
}
