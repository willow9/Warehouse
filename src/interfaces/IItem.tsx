interface Item {
  name: string;
  type: string;
  weight: number;
  color: string;
  active: boolean;
  ean: number;
  quantity: number;
  price: number;
  history: { price: Array<number>; quantity: Array<number> };
}
export default Item;
