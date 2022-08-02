import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Card } from "react-bootstrap";
import { ScaleLoader } from "react-spinners";
import { FaThumbtack } from "react-icons/fa";

const Dashboard = () => {
  const [list, setList] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    document.title = "Dashbaord";
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/product/dashboard/current-affairs")
      .then(function (response) {
        setList(response.data);
        setLoading(false);
      });
  }, []);

  const override = `
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`;

  return (
    <>
      <div className="col-5 col-lg-9 border border-dark rounded p-3">
        <div className="row justify-content-center">
          <center>
            <h3>
              {" "}
              <FaThumbtack></FaThumbtack> Dashboard
            </h3>
            <hr></hr>
          </center>
          {/* component */}
          <div className="container">
            <div className="row justify-content-center mt-3">
              <div
                className="card bg-light text-dark border border-primary"
                style={{ width: "70%" }}
              >
                <div className="card-header bg-dark text-light" align="center">
                  <b>Current Affairs</b>
                </div>
                <div className="card-body">
                  <div className="card-text">
                    <Table bordered hover>
                      {list.length === 0 ? (
                        <tr>
                          <td colSpan="10">
                            <ScaleLoader
                              css={override}
                              size={150}
                              color={"#eb4034"}
                              loading={loading}
                            />
                          </td>
                        </tr>
                      ) : (
                        <tbody>
                          <tr>
                            <td>
                              <b>Highest stocked product - {list[0]}</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <b>Most expensive product - {list[1]}</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <b>Number of good products - {list[2]}</b>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <b>Number of faulty product - {list[3]}</b>
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
