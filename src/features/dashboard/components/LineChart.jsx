import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getFormattedDate } from "../../../utils/getFormattedDate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function LineChart({test_scores}) {

  const labels = test_scores.map(el => getFormattedDate(el.created_at));
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Test scores %",
        fill: true,
        data: test_scores.map(el => (el.score - 1) / el.num_of_questions * 100),
        borderColor: "rgba(0, 153, 246, 0.5)",
        backgroundColor: "rgba(0, 153, 246, 0.2)",
        responsive: true,
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  );
}
