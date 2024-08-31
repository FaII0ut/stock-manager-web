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
        type: "bar",
        data: {
          labels: [
            "Gloves",
            "Jumbo bags",
            "Shovels",
            "Boots",
            "Bikes",
            "Hats",
            "Uniforms",
          ],
          datasets: [
            {
              label: "My First Dataset",
              borderSkipped: false,
              borderRadius: {
                topLeft: 10,
                topRight: 10,
                bottomLeft: 10,
                bottomRight: 10,
              },
              data: [19, 26, 17, 15, 71, 35, 44, 33, 21, 13, 41, 51, 71],
              backgroundColor:"rgba(249, 119, 124, 1)",
              borderColor: "rgba(249, 119, 124, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          // animation,
          plugins: {
            legend: {
              display: false,
            },
          },
          hover: {
            mode: "index",
            intersect: false,
          },
          scales: {
            x: {
              stacked: true,
              grid: {
                color: "#E8EDD4",
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
          elements: {
            point: {
              borderWidth: 1,
              radius: 20,
            },
          },
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
interface BarChartProps {
  total: number;
}

const BarChart: React.FC<BarChartProps> = ({total = 0}) => {
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
export default BarChart;
