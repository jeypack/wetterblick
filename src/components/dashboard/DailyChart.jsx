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

/* 
var(--color-surface-raised) --color-amber-500
stroke="var(--color-chart-1)" --color-sky-500
activeDot={{r: 8, stroke: "var(--color-surface-base)"}} --color-amber-700
stroke="var(--color-chart-2)" --color-green-500
*/
const renderTooltipWithoutTemp = ({payload, content, ...rest}) => {
  const newPayload = payload.filter((x) => x.dataKey !== "temperature");
  return <DefaultTooltipContent payload={newPayload} {...rest} />;
};

const renderLegendWithoutTemp = ({payload, ...rest}) => {
  const newPayload = payload?.filter((x) => x.dataKey !== "temperature");
  return <DefaultLegendContent payload={newPayload} {...rest} />;
};

const DailyChart = ({chartData, isAnimationActive = true}) => {
  /* const dailyDataForPreviewCity = useMemo(() => {
      return dailyData.find((city) => city.id === previewCityId);
    }, [dailyData, previewCityId]); */
  //const areaChartData = chartData?.data;
  console.log("DailyChart: chartData", chartData);
  const coldestData = chartData?.reduce(
    (min, item) => (item.temperatureMin < min.temperatureMin ? item : min),
    chartData[0],
  );
  //console.log("DailyChart: coldestData", coldestData);
  return (
    <ComposedChart
      style={{
        width: "100%",
        maxWidth: "700px",
        height: "100%",
        maxHeight: "288px",
        aspectRatio: 1.618,
      }}
      responsive
      data={chartData}
      margin={{
        top: 15,
        right: 0,
        left: 0,
        bottom: 5,
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
        padding={{left: 30, right: 30, top: 20}}
      />
      <YAxis
        dataKey="temperatureMax"
        width="50"
        stroke="var(--color-neutral-400)"
        unit="°"
      />
      <Area
        type="monotone"
        dataKey="temperature"
        stroke="var(--color-amber-600"
        fill="url(#colorTemperature)"
        isAnimationActive={isAnimationActive}
        unit="°"
      />
      <Line
        type="monotone"
        dataKey="temperatureMax"
        stroke="var(--color-amber-500)"
        dot={{
          fill: "var(--color-amber-700)",
        }}
        activeDot={{r: 4, stroke: "var(--color-amber-700)", unit: "°"}}
        label={{
          position: "top",
          fill: "var(--color-amber-700)",
          fontSize: 13,
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
        activeDot={{r: 4, stroke: "var(--color-amber-700)", unit: "°"}}
        label={{
          position: "bottom",
          fill: "var(--color-sky-600)",
          fontSize: 13,
        }}
        unit="°"
      />
      <Tooltip
        cursor={{
          stroke: "var(--color-neutral-200)",
        }}
        content={renderTooltipWithoutTemp}
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
