import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Legend,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { IChartDatum } from "../../interfaces";

type TResponsiveLineChartProps = {
  kpi: string;
  data: IChartDatum[];
  colors: {
    stroke: string;
    fill: string;
  };
};

export const ResponsiveLineChart = ({
  kpi,
  data,
  colors,
}: TResponsiveLineChartProps) => {
  console.log(data);
  
  return (
    <ResponsiveContainer height={400}>
      <LineChart
        data={data}
        height={400}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="0 0 0" vertical={false} />
        <XAxis dataKey="date" />
        <YAxis
          tickCount={6}
          tick={{
            stroke: "light-grey",
            strokeWidth: 0.5,
            fontSize: "12px",
          }}
          interval="preserveStartEnd"
          domain={[0, "dataMax + 10"]}
          dataKey="value1"
        />
       
        {/* <Legend/> */}

        <Tooltip
          content={<ChartTooltip kpi={kpi} colors={colors} />}
          wrapperStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            border: "0 solid #000",
            borderRadius: "10px",
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={colors?.stroke}
          strokeWidth={3}
          fill={colors?.fill}
        />

        <Line
          type="monotone"
          dataKey="value1"
          strokeDasharray="5 5"
          stroke={colors?.stroke}
          strokeWidth={3}
          fill={colors?.fill}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};