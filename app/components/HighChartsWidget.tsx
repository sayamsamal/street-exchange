"use client";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

interface ChartDataProp {
  symbol: string;
  shortName: string;
  ohlcData: number[][];
}

const HighChartsWidget = (prop: ChartDataProp) => {
  const options = {
    title: {
      text: prop.shortName,
    },
    series: [
      {
        type: "candlestick",
        name: prop.symbol,
        data: prop.ohlcData,
      },
    ],
    plotOptions: {
      candlestick: {
        color: "red",
        upColor: "green",
      },
    },
    rangeSelector: {
      selected: 1,
    },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  );
};

export default HighChartsWidget;
