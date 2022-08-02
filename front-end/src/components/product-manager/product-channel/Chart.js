import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import { MdPieChart } from "react-icons/md";
import { AiOutlineBarChart } from "react-icons/ai";

const Chart = () => {
  const history = useHistory();
  const [types, setTypes] = useState([]);
  const [count, setCount] = useState([]);
  const [barType, setBarTypes] = useState([]);
  const [barCount, setBarCount] = useState([]);

  useEffect(() => {
    document.title = "Product Statistics";
    if (!localStorage.getItem("username")) {
      history.push("/");
    } else {
      axios
        .get("http://127.0.0.1:8000/api/product/chart/pie")
        .then((response) => {
          setTypes(Object.keys(response.data));
          setCount(Object.values(response.data));
        });

      axios
        .get("http://127.0.0.1:8000/api/product/chart/bar")
        .then((response) => {
          setBarTypes(Object.keys(response.data));
          setBarCount(Object.values(response.data));
        });
    }
  }, []);

  const pieData = {
    labels: types,
    datasets: [
      {
        label: "Product VS Stock",
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

  const barData = {
    labels: barType,
    datasets: [
      {
        label: "Product VS Price",
        data: barCount,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div class="col-12 col-lg-9 border border-dark rounded p-3">
        <div class="container">
          <div class="row align-items-start">
            <div class="col"></div>
            <div class="col-6">
              <h3>
                <MdPieChart></MdPieChart> &nbsp; Product Statistics &nbsp;{" "}
                <AiOutlineBarChart></AiOutlineBarChart>
              </h3>
            </div>
            <div class="col-2"></div>
          </div>
          <hr class="mb-4"></hr>
          <div class="row justify-content-center mt-3">
            <div class="card w-100 bg-light text-dark border border-primary">
              <div class="card-header" align="center">
                <b>Product wise Stock</b>
              </div>
              <div class="card-body">
                <center>
                  <div className="col-4 m-2">
                    <Pie data={pieData} />
                  </div>
                </center>
              </div>
            </div>
          </div>
          <div class="row justify-content-center mt-3">
            <div class="card w-100 bg-light text-dark border border-primary">
              <div class="card-header" align="center">
                <b>Product wise Price</b>
              </div>
              <center>
                <div class="card-body">
                  <div className="col-5 m-2">
                    <Bar data={barData} />
                  </div>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
