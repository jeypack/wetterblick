import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

/* 
var(--color-surface-raised) --color-amber-500
stroke="var(--color-chart-1)" --color-sky-500
activeDot={{r: 8, stroke: "var(--color-surface-base)"}} --color-amber-700
stroke="var(--color-chart-2)" --color-green-500
*/

export default function ChartDaysForecast({chartData}) {
  const lineChartData = chartData?.data;
  console.log("ChartDaysForecast: lineChartData", lineChartData);
  return (
    <LineChart
      className="bg-slate-800 border border-slate-700 p-4 rounded-sm"
      style={{
        width: "100%",
        maxWidth: "700px",
        height: "100%",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={lineChartData}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        stroke="var(--color-slate-400)"
        padding={{left: 30, right: 30, top: 10}}
      />
      <YAxis
        width="auto"
        stroke="var(--color-slate-400)"
        unit="°"
      />
      <Tooltip
        cursor={{
          stroke: "var(--color-slate-200)",
        }}
        contentStyle={{
          backgroundColor: "var(--color-slate-900)",
          borderColor: "var(--color-slate-200)",
        }}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="temperatureMax"
        stroke="var(--color-amber-500)"
        dot={{
          fill: "var(--color-amber-700)",
        }}
        activeDot={{r: 7, stroke: "var(--color-amber-700)", unit: "°"}}
        label={{
          position: "bottom",
          fill: "var(--color-amber-200)",
          fontSize: 12,
        }}
        unit="°"
      />
      <Line
        type="monotone"
        dataKey="temperatureMin"
        stroke="var(--color-sky-500)"
        dot={{
          fill: "var(--color-amber-700)",
        }}
        activeDot={{r: 6, stroke: "var(--color-amber-700)", unit: "°"}}
        label={{
          position: "top",
          fill: "var(--color-sky-200)",
          fontSize: 12,
        }}
      />
      {/* <Line
        type="monotone"
        dataKey="apparentMax"
        stroke="var(--color-amber-300)"
        dot={{
          fill: "var(--color-amber-700)",
        }}
        activeDot={{stroke: "var(--color-amber-700)"}}
      />
      <Line
        type="monotone"
        dataKey="apparentMin"
        stroke="var(--color-sky-300)"
        dot={{
          fill: "var(--color-amber-700)",
        }}
        activeDot={{stroke: "var(--color-amber-700)"}}
      /> */}
    </LineChart>
  );
}
