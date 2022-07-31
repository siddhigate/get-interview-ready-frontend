import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { BEHAVIORAL_QUESTIONS } from "../../behavioral/data/behavioralQuestions";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({behavioral_questions}) => {
console.log(behavioral_questions)
  const data = {
    labels: ["Unanswered", "Answered"],
    datasets: [
      {
        label: "# count",
        data: [BEHAVIORAL_QUESTIONS.length - behavioral_questions, behavioral_questions],
        backgroundColor: ["rgba(220, 38, 38, 0.7)", "rgba(0, 153, 246, 0.7)"],
        borderColor: ["rgba(220, 38, 38, 1)", "rgba(0, 153, 246, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
