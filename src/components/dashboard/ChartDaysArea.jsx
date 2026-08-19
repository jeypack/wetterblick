import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";

/* 
var(--color-surface-raised) --color-amber-500
stroke="var(--color-chart-1)" --color-sky-500
activeDot={{r: 8, stroke: "var(--color-surface-base)"}} --color-amber-700
stroke="var(--color-chart-2)" --color-green-500
*/

const ChartDaysArea = ({chartData, isAnimationActive = true}) => {
  const areaChartData = chartData?.data;
  console.log("ChartDaysArea: areaChartData", areaChartData);
  return (
    <AreaChart
      style={{
        width: "100%",
        maxWidth: "700px",
        height: "100%",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={areaChartData}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <defs>
        <linearGradient id="colorTemperature" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#E25C2F" stopOpacity={0.95} />
          <stop offset="95%" stopColor="#E2972F" stopOpacity={0.85} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        stroke="var(--color-slate-400)"
        padding={{left: 30, right: 30, top: 10}}
      />
      <YAxis width="auto" stroke="var(--color-slate-400)" unit="°" />
      <Area
        dataKey="temperature"
        dot={{
          fill: "var(--color-amber-700)",
        }}
        activeDot={{r: 4, stroke: "var(--color-amber-700)", unit: "°"}}
        label={{
          position: "bottom",
          fill: "var(--color-amber-200)",
          fontSize: 12,
        }}
        stroke="#E25C2F"
        fill="url(#colorTemperature)"
        isAnimationActive={isAnimationActive}
        unit={["°"]}
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
    </AreaChart>
  );
};

export default ChartDaysArea;
