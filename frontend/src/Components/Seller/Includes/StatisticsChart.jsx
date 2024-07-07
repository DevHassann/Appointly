import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
const StatisticsChart = () => {
  const option = {
    color: ["#fff"],

    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgroundColor: "#fff",
      borderWidth: 0,
    },

    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
      show: false,
    },

    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisLabel: {
          color: "white",
        },
        axisLine: {
          lineStyle: {
            color: "black",
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: false,
        },
        axisLabel: {
          color: "white",
        },
        axisLine: {
          lineStyle: {
            color: "black",
          },
        },
      },
    ],
    series: [
      {
        type: "line",
        smooth: true,
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#D3D3D3",
            },
            {
              offset: 1,
              color: "#36669d",
            },
          ]),
          width: 4,
        },
        areaStyle: {
          opacity: 0.5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
            {
              offset: 0,
              color: "#FFFFFF",
            },
            {
              offset: 1,
              color: "#5899E2",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        showSymbol: false,
        data: [28000, 19000, 32000, 18000, 41000, 30000, 26000],
      },
    ],
  };

  return <ReactECharts option={option} />;
};

export default StatisticsChart;
