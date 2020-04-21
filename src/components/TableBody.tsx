import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../context/ProductsContext";

type IProps = {
  item?: any;

  handleDelete?: (e: any) => void;
  changeQuantityOrPrice?: (e: any) => void;
  preventEmptyInputs?: (e: any) => void;
  toggleCheckbox?: (e: any) => void;
};

export const TableBody: React.SFC<IProps> = (props) => {
  const context = useContext(ProductContext);

  const renderItem = (item: any) => {
    return (
      <tr
        className='text-center'
        key={item.ean}
        style={{
          backgroundColor: item.active ? "white" : "#f2f0f0",
          color: item.quantity === 0 ? "red" : "#212529",
        }}
      >
        <td>{item.name}</td>
        <td>{item.type}</td>
        <td>{item.weight}</td>
        <td>{item.color}</td>
        <td>{item.ean}</td>
        {!props.item ? (
          <td className='text-center'>
            <input type='checkbox' defaultChecked={item.active} id={item.ean} onChange={props.toggleCheckbox} />
          </td>
        ) : null}
        <td>
          <input
            className='short-input-field'
            type='number'
            name='quantity'
            id={item.ean}
            placeholder={item.quantity}
            onBlur={props.changeQuantityOrPrice}
            onChange={props.preventEmptyInputs}
            disabled={!item.active || props.item}
          />
        </td>

        <td>
          <input
            className='short-input-field'
            type='number'
            name='price'
            id={item.ean}
            placeholder={item.price}
            onBlur={props.changeQuantityOrPrice}
            onChange={props.preventEmptyInputs}
            disabled={!item.active || props.item}
          />
        </td>
        {!props.item ? (
          <>
            <td>
              <Link to={`${item.ean}`}>
                <button className='btn btn-info' disabled={!item.active}>
                  View
                </button>
              </Link>
            </td>
            <td>
              <Link to={`${item.ean}/edit`}>
                <button className='btn btn-primary' disabled={!item.active}>
                  Edit
                </button>
              </Link>
            </td>
            <td>
              <button className='btn btn-danger' id={item.ean} onClick={props.handleDelete} disabled={!item.active}>
                Delete
              </button>
            </td>
          </>
        ) : null}
      </tr>
    );
  };

  return (
    <tbody>
      {!props.item
        ? context.items.map((item) => {
            return renderItem(item);
          })
        : renderItem(props.item)}
    </tbody>
  );
};

export default TableBody;
