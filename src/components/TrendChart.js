import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function TrendChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Last Month", "This Month"],
        datasets: [
          {
            label: "Glucose (dummy)",
            data: [90, 95],
            borderColor: "rgb(75, 192, 192)",
            tension: 0.3,
          },
          {
            label: "Cholesterol (dummy)",
            data: [175, 180],
            borderColor: "rgb(255, 99, 132)",
            tension: 0.3,
          },
        ],
      },
      options: { responsive: true },
    });

    return () => chartInstance.destroy();
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
}
