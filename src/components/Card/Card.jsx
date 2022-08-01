import Pill from "./Pill";

const Card = ({ date, desc, title, pills }) => {
  return (
    <div className="card card-with-shadow question-card">
      <p className="date">{date}</p>
      <div className="question">
        <span className="dot bg-violet"></span>
        <p>{title}</p>
      </div>
      {desc && <p className="mb-xl txt-gray">{desc}</p>}
      <div className="tech-pills">
        {pills.map((pill) => (
          <Pill key={Math.random()} text={pill.text} color={pill.color}></Pill>
        ))}
      </div>
    </div>
  );
};

export default Card;
