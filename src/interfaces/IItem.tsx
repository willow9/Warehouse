interface Item {
  name: string;
  type: string;
  weight: number;
  color: string;
  active: boolean;
  ean: number;
  quantity: number;
  price: number;
  priceHistory: Array<number>;
  quantityHistory: Array<number>;
}
export default Item;
