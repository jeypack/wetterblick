import React from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  DefaultTooltipContent,
  DefaultLegendContent,
  Area,
} from "recharts";

const renderTooltipWithoutTemp = ({ payload, content, ...rest }) => {
  const newPayload = payload.filter((x) => x.dataKey !== "temperature");
  return <DefaultTooltipContent payload={newPayload} {...rest} />;
};

const renderLegendWithoutTemp = ({ payload, ...rest }) => {
  const newPayload = payload?.filter((x) => x.dataKey !== "temperature");
  return <DefaultLegendContent payload={newPayload} {...rest} />;
};

const renderCompactTooltip = ({ label, payload }) => {
  const items = payload?.filter((x) => x.dataKey !== "temperature") ?? [];

  return (
    <div
      style={{ padding: "4px 8px", lineHeight: 1.1 }}
      className="bg-white dark:bg-neutral-800 text-neutral-400 rounded shadow"
    >
      <div style={{ fontSize: 11, marginBottom: 2 }}>{label}</div>
      {items.map((item) => (
        <div key={item.dataKey} style={{ fontSize: 11 }}>
          {item.name}: {item.value}°
        </div>
      ))}
    </div>
  );
};

const DailyChart = ({ chartData, isAnimationActive = true }) => {
  //console.log("DailyChart: chartData", chartData);
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-2 w-full h-60">
        <p className="text-neutral-400 dark:text-neutral-300 text-sm">
          Keine Daten verfügbar
        </p>
      </div>
    );
  }
  const coldestData = chartData.reduce(
    (min, item) => (item.temperatureMin < min.temperatureMin ? item : min),
    chartData[0],
  );

  const tempValues = chartData.flatMap((item) => [
    item.temperatureMin,
    item.temperatureMax,
  ]);

  const minTemp = Math.floor(Math.min(...tempValues) / 2) * 2 - 1;
  const maxTemp = Math.ceil(Math.max(...tempValues) / 2) * 2 + 1;

  const yTicks = Array.from(
    { length: (maxTemp - minTemp) / 2 + 1 },
    (_, index) => minTemp + index * 2,
  );

  //console.log("DailyChart: coldestData", coldestData);
  return (
    <ComposedChart
      style={{
        width: "100%",
        maxWidth: "860px",
        height: "100%",
        maxHeight: "400px",
        aspectRatio: 1.25,
      }}
      responsive
      data={chartData}
      margin={{
        top: 15,
        right: 0,
        left: 0,
        bottom: 15,
      }}
    >
      <defs>
        <linearGradient id="colorTemperature" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#E25C2F" stopOpacity={1.0} />
          {coldestData?.temperatureMin < 13.5 ? (
            <stop offset="40%" stopColor="#E2972F" stopOpacity={1.0} />
          ) : (
            <stop offset="60%" stopColor="#E2972F" stopOpacity={1.0} />
          )}
          <stop offset="95%" stopColor="#2F77E2" stopOpacity={1.0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        stroke="var(--color-neutral-400)"
        padding={{ left: 20, right: 20, top: 20, bottom: 20 }}
        interval={0}
        minTickGap={16}
        tick={({ x, y, payload }) => {
          const [day, date] = String(payload.value).split(" ");
          return (
            <g transform={`translate(${x},${y})`}>
              <text
                x={0}
                y={0}
                fill="var(--color-neutral-400)"
                fontSize={11}
                textAnchor="middle"
              >
                <tspan x={0} dy="5">
                  {day?.slice(0, 3)}
                </tspan>
                <tspan x={0} dy="14">
                  {date}
                </tspan>
              </text>
            </g>
          );
        }}
      />
      <YAxis
        dataKey="temperatureMax"
        width={42}
        stroke="var(--color-neutral-400)"
        axisLine={false}
        tickLine={false}
        tickMargin={2}
        ticks={yTicks}
        domain={[minTemp, maxTemp]}
        tickFormatter={(value) => `${Math.round(value)}°`}
      />
      <Area
        type="monotone"
        dataKey="temperature"
        stroke="var(--color-amber-700"
        fill="url(#colorTemperature)"
        isAnimationActive={isAnimationActive}
        unit="°"
      />
      <Line
        type="monotone"
        dataKey="temperatureMax"
        stroke="var(--color-amber-500)"
        dot={{
          fill: "var(--color-amber-800)",
        }}
        activeDot={{ r: 4, stroke: "var(--color-amber-800)", unit: "°" }}
        label={{
          position: "top",
          fill: "var(--color-neutral-300)",
          fontSize: 13,
        }}
        unit="°"
      />
      <Line
        type="monotone"
        dataKey="temperatureMin"
        stroke="var(--color-sky-500)"
        dot={{
          fill: "var(--color-sky-700)",
        }}
        activeDot={{ r: 4, stroke: "var(--color-sky-700)", unit: "°" }}
        label={{
          position: "bottom",
          fill: "var(--color-neutral-300)",
          fontSize: 13,
        }}
        unit="°"
      />
      <Tooltip
        cursor={{
          stroke: "var(--color-neutral-200)",
        }}
        content={renderCompactTooltip}
        contentStyle={{
          backgroundColor: "var(--color-neutral-100)",
          borderColor: "var(--color-neutral-400)",
        }}
      />
      <Legend content={renderLegendWithoutTemp} />
    </ComposedChart>
  );
};

export default React.memo(DailyChart);
