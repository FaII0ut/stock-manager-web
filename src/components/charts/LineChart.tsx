import Chart from "chart.js/auto";
import {useRef, useEffect, useState} from "react";

const defaultLabels = [
  "Jan 1",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "Jan 31",
];

interface Props {
  chartData: any;
}

const MyChart = ({chartData}: Props) => {
  // helper function to format chart data since you do this twice
  // const formatData = (data: number[]): Chart.ChartData => ();

  // use a ref to store the chart instance since it it mutable
  const chartRef = useRef<any>(null);

  // callback creates the chart on the canvas element
  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    chartRef.current?.destroy();

    const ctx = canvas.getContext("2d");
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: chartData.labels,
          datasets: [...chartData.dataSets],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          // animation,
          // plugins: {
          //   legend: {
          //     display: false,
          //   },
          // },
          hover: {
            mode: "index",
            intersect: false,
          },
          scales: {
            x: {
              grid: {
                color: "transparent",
                tickBorderDash: [1, 4],
              },
              ticks: {
                // display: false,
              },
              border: {
                display: false,
              },
            },

            y: {
              grid: {
                color: "transparent",
                display: false,
                tickBorderDash: [5, 10],
              },
              ticks: {
                // display: false,
              },
              min: 0,
            },
          },
          // elements: {
          //   point: {
          //     borderWidth: 1,
          //     radius: 20,
          //   },
          // },
        },
      });
    }
  };

  // effect to update the chart when props are updated
  useEffect(() => {
    // must verify that the chart exists
    if (chartRef.current) {
      // chartRef.current.data = formatData(chartData);
      chartRef.current.update();
    }

    // cleanup function - I had to remove this as it was causing errors
    /*return () => {
          chartRef.current?.destroy();
        };*/
  }, [chartData]);

  return (
    <>
      <canvas ref={canvasCallback}></canvas>
    </>
  );
};

// want to see some changes in the props on order to test MyChart
interface LineChartProps {
  data: any;
}

const LineChart: React.FC<LineChartProps> = ({data = 0}) => {
  return (
    <>
      <MyChart chartData={data} />
    </>
  );
};
export default LineChart;
