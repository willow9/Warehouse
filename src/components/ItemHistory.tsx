import React from "react";
type IProps = {
  title: string;
  data: number;
};

export const ItemHistory: React.SFC<IProps> = (props) => {
  return (
    <div>
      <h1>Some History</h1>
      <h6>{props.title}</h6>
      <h6>{props.data}</h6>
    </div>
  );
};
