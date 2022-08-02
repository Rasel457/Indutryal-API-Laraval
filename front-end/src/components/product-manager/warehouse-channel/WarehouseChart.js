import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
import { FaChartPie } from "react-icons/fa";
import { BiDoughnutChart } from "react-icons/bi";
import { ScaleLoader } from "react-spinners";

const WarehouseChart = () => {
  const history = useHistory();
  const [types, setTypes] = useState([]);
  const [count, setCount] = useState([]);
  const [doughnutType, setDoughnutTypes] = useState([]);
  const [doughnutCount, setDoughnutCount] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Warehouse Statistics";
    if (!localStorage.getItem("username")) {
      history.push("/");
    } else {
      setLoading(true);
      axios
        .get("http://127.0.0.1:8000/api/warehouse/chart/pie")
        .then((response) => {
          setTypes(Object.keys(response.data));
          setCount(Object.values(response.data));
          setLoading(false);
        });

      axios
        .get("http://127.0.0.1:8000/api/warehouse/chart/doughnut")
        .then((response) => {
          setDoughnutTypes(Object.keys(response.data));
          setDoughnutCount(Object.values(response.data));
        });
    }
  }, []);

  const override = `
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`;

  const pieData = {
    labels: types,
    datasets: [
      {
        label: "Warehouse VS Stock",
        data: count,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(255, 99, 212)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const doughnutData = {
    labels: doughnutType,
    datasets: [
      {
        label: "Warehouse VS Country",
        data: doughnutCount,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="col-12 col-lg-9 border border-dark rounded p-3">
        <div className="container">
          <div className="row justify-content-center">
            <center>
              <h3>
                {" "}
                <FaChartPie></FaChartPie> &nbsp; Warehouse Statistics &nbsp;
                <BiDoughnutChart></BiDoughnutChart>
              </h3>
            </center>
          </div>
          <hr className="mb-4"></hr>
          <div className="row justify-content-center">
            <div className="card bg-light text-dark border border-primary mr-3">
              <div className="card-header" align="center">
                <b>Warehouse wise Qunatity</b>
              </div>
              {types.length === 0 ? (
                <ScaleLoader
                  css={override}
                  size={150}
                  color={"#eb4034"}
                  loading={loading}
                />
              ) : (
                <div className="card-body">
                  <center>
                    <div className="col-4 m-2">
                      <Pie data={pieData} />
                    </div>
                  </center>
                </div>
              )}
            </div>
            <div className="card bg-light text-dark border border-primary mt-3">
              <div className="card-header" align="center">
                <b>Country wise Warehouse</b>
              </div>
              <div className="card-body">
                <center>
                  <div className="card-body">
                    <div className="col-4 m-2">
                      <Doughnut data={doughnutData} />
                    </div>
                  </div>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WarehouseChart;
