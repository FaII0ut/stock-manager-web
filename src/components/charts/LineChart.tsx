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
  chartData: number[];
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
          labels: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
            "31",
          ],
          datasets: [
            {
              label: "Gloves",
              tension: 0.3,
              data: [
                19, 26, 17, 15, 71, 35, 44, 33, 21, 13, 41, 51, 71, 19, 26, 17,
                15, 71, 35, 44, 33, 21, 13, 41, 51, 71, 32, 45, 23, 53, 44,
              ],
              backgroundColor: "rgba(249, 119, 124, 1)",
              borderColor: "rgba(249, 119, 124, 1)",
              borderWidth: 2,
            },
            {
              label: "Uniform",
              tension: 0.3,
              data: [
                19, 26, 17, 15, 71, 35, 44, 33, 21, 13, 41, 51, 71, 19, 26, 17,
                15, 71, 35, 44, 33, 21, 13, 41, 51, 71, 32, 45, 23, 53, 44,
              ],
              backgroundColor: "rgba(63, 212, 206)",
              borderColor: "rgba(63, 212, 206)",
              borderWidth: 2,
            },
          ],
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
              stacked: true,
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
              stacked: true,
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
  total: number;
}

const LineChart: React.FC<LineChartProps> = ({total = 0}) => {
  const [data, setData] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const onClick = () => {
    setData((prevData) => prevData.slice(1).concat(10 * Math.random()));
  };

  return (
    <>
      <MyChart chartData={data} />
    </>
  );
};
export default LineChart;
