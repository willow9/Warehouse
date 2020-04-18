import React from "react";
interface IProps {
  withActions: boolean;
}

export const TableHeader: React.SFC<IProps> = (props) => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Weight</th>
        <th>Color</th>
        <th>EAN</th>
        {props.withActions ? <th>Active</th> : null}
        <th>Quantity</th>
        <th>Price</th>
        {props.withActions ? <th colSpan={3}>Actions</th> : null}
      </tr>
    </thead>
  );
};
