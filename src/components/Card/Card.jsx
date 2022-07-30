import Pill from "./Pill";

const Card = ({ date, title, pills }) => {
  return (
    <div className="card card-with-shadow question-card">
      <p className="date">{date}</p>
      <div className="question">
        <span className="dot bg-violet"></span>
        <p>{title}</p>
      </div>
      <div className="tech-pills">
        {pills.map((pill) => (
          <Pill key={Math.random()} text={pill.text} color={pill.color}></Pill>
        ))}
      </div>
      <i className="fa-solid fa-ellipsis-vertical ellipsis-icon question-options"></i>
    </div>
  );
};

export default Card;
