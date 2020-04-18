import React, { Component } from "react";
import ProductContext from "../context/ProductsContext";
import { RouteComponentProps } from "react-router-dom";
import * as ReactBootstrap from "react-bootstrap";
import Item from "../interfaces/IItem";
import { TableHeader } from "./TableHeader";

interface IProductProps extends RouteComponentProps<{ ean: string }> {}
interface IProductState {
  item: Item;
}

export default class ItemPreview extends Component<IProductProps, IProductState> {
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
          <td>{item.quantity}</td>
          <td>{item.price}</td>
        </tr>
      </>
    );
  };

  render() {
    return (
      <div>
        <h1>Product</h1>
        <ReactBootstrap.Table striped bordered hover>
          <TableHeader withActions={false}></TableHeader>
          <tbody>{this.state.item ? this.renderItem(this.state.item) : null}</tbody>
        </ReactBootstrap.Table>
      </div>
    );
  }
}
