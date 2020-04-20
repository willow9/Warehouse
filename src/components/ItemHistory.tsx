import React, { useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
type IProps = {
  title: string;
  data: Array<number>;
};

export const ItemHistory: React.SFC<IProps> = (props) => {
  const [options] = useState({
    colors: ["#16a085"],
    xAxis: {
      categories: ["1st", "2nd", "3rd", "4th", "Last"],
    },
    title: {
      text: props.title,
    },
    series: [
      {
        showInLegend: false,

        type: "line",
        data: props.data,
      },
    ],
  });
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
