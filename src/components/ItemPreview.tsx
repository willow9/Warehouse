import React, { Component } from "react";
import { Tab, Table, Tabs } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import ProductContext from "../context/ProductsContext";
import Item from "../interfaces/IItem";
import { ItemHistory } from "./ItemHistory";
import TableBody from "./TableBody";
import { TableHeader } from "./TableHeader";

interface IProps extends RouteComponentProps<{ ean: string }> {}
interface IState {
  item: Item;
}

export default class ItemPreview extends Component<IProps, IState> {
  static contextType = ProductContext;
  constructor(props: IProps, context: any) {
    super(props);

    this.state = {
      item: context.items.find((item: any) => {
        return this.props.match.params.ean == item.ean;
      }),
    };
  }

  render() {
    return (
      <div>
        <Tabs defaultActiveKey='details' id='uncontrolled-tab-example'>
          <Tab eventKey='details' title='Details' transition={false}>
            <div>
              <Table striped bordered hover>
                <TableHeader withActions={false}></TableHeader>
                <TableBody item={this.state.item} />
              </Table>
            </div>
          </Tab>
          <Tab eventKey='price' title='Price History' transition={false}>
            <ItemHistory
              title={`Price of ${this.state.item.name}`}
              data={this.state.item.priceHistory ? this.state.item.priceHistory : [0]}
            />
          </Tab>
          <Tab eventKey='quantity' title='Quantity History'>
            <ItemHistory
              title={`Quantity of ${this.state.item.name}`}
              data={this.state.item.quantityHistory ? this.state.item.quantityHistory : [0]}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
