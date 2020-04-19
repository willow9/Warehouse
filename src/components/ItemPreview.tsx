import React, { Component } from "react";
import { Tab, Table, Tabs } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import ProductContext from "../context/ProductsContext";
import Item from "../interfaces/IItem";
import { ItemHistory } from "./ItemHistory";
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
        <Tabs defaultActiveKey='details' id='uncontrolled-tab-example'>
          <Tab eventKey='details' title='Details' transition={false}>
            <div>
              <h1>Product</h1>
              <Table striped bordered hover>
                <TableHeader withActions={false}></TableHeader>
                <tbody>{this.state.item ? this.renderItem(this.state.item) : null}</tbody>
              </Table>
            </div>
          </Tab>
          <Tab eventKey='price' title='Price History' transition={false}>
            <ItemHistory
              title='Price'
              // data={this.state.item.history.price ? this.state.item.history.price : [0]}
              data={[45, 86, 23, 23]}
            />
          </Tab>
          <Tab eventKey='quantity' title='Quantity History'>
            <ItemHistory
              title='Quantity'
              data={[20]}
              // data={0}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
