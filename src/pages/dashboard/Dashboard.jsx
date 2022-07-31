import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { LineChart } from "../../features/dashboard/components/LineChart";
import PieChart from "../../features/dashboard/components/PieChart";
import { getDashboardData } from "../../features/dashboard/services/getDashboardData";
import SidebarLayout from "../../layouts/SidebarLayout";

const Dashboard = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await getDashboardData();
        console.log(res.data.stats);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  return (
    <SidebarLayout title="Dashboard">
      {
        loading && <Loader></Loader>
      }
      {data && (
        <div className="main-content-wrapper">
          <div className="row-70-30 h-40">
            <div className="col-70 card-with-shadow">
              <h2 style={{ textAlign: "center", margin: "1rem" }}>
                Flash card streak:
              </h2>
              <div
                style={{
                  width: "100%",
                  height: "75%",
                  margin: "auto",
                  padding: "1rem",
                }}
                scores={data.test_scores}
              >
                {data && <LineChart test_scores={data.test_scores} />}
              </div>
            </div>
            <div
              className="col-30 card-with-shadow"
              style={{ padding: "1rem" }}
            >
              <h2>Behavioral questions solved:</h2>
              <div
                style={{
                  width: "80%",
                  height: "30%",
                  margin: "auto",
                  padding: "1rem",
                }}
              >
                {data && (
                  <PieChart
                    behavioral_questions={data?.stats[0].behavioral_questions}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="row-70-30 h-30 qty-statistics">
            <div className="col-70">
              <div className="grid-2">
                <div className="col flex-center-vertical card-with-shadow">
                  <div>
                    <div>
                      <img src="./assets/dashboard/checkmark.png" alt="" />
                    </div>
                    <div>
                      <p>
                        {data.stats[0].technical_questions} Technical Questions solved
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col flex-center-vertical card-with-shadow">
                  <div>
                    <div>
                      <img src="./assets/dashboard/curve.png" alt="" />
                    </div>
                    <div>
                      <p>{data.stats[0].projects} Project Questions answered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-30 flex-center-vertical card-with-shadow">
              <div>
                <div>
                  <img src="./assets/dashboard/factory-plant.png" alt="" />
                </div>
                <div>
                  <p>{data.stats[0].dream_companies} Dream companies added</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  );
};

export default Dashboard;
