import { Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaWalking } from "react-icons/fa";

const LeaveRequest = () => {
  const [type, setType] = useState("Sick leave");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [request_description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    document.title = "Leave Request";
  });

  const createLeave = () => {
    if (start_time.length === 0) {
      setErrorMessage("Please setect a start date");
    } else if (end_time.length === 0) {
      setErrorMessage("Please select an end date");
    } else if (request_description.length === 0) {
      setErrorMessage("Plase provide leave description!");
    } else if (start_time > end_time) {
      setErrorMessage("Start time can't be greater than end time!");
    } else if (
      start_time < new Date().toISOString().slice(0, 10) ||
      end_time < new Date().toISOString().slice(0, 10)
    ) {
      setErrorMessage("Please select a valid date format!");
    } else {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("start_time", start_time);
      formData.append("end_time", end_time);
      formData.append("request_description", request_description);

      axios
        .post("http://127.0.0.1:8000/api/product/user/leave/create", formData)
        .then((response) => {
          history.push("/product/user/leave/myrequest");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="col-12 col-lg-9 border border-dark rounded p-3">
        <div className="row justify-content-center">
          <center>
            <h3>
              {" "}
              <FaWalking></FaWalking> Leave Request
            </h3>
            <hr></hr>
          </center>
          {errorMessage && (
            <center>
              {" "}
              <div class="alert alert-danger col-8" role="alert">
                {errorMessage}
              </div>{" "}
            </center>
          )}
          <div className="row align-items-start mb-2">
            <div class="col"></div>
            <div class="col-7"></div>
            <div class="col">
              <Link
                to="/product/user/leave/myrequest"
                className="btn btn-secondary rounded p-1 text-right"
              >
                My Leave List
              </Link>
            </div>
          </div>
          {/* component */}
          <div className="row justify-content-center mt-3">
            <div className="col-10">
              <div className="container">
                <div className="text-left">
                  <Table striped bordered>
                    <tbody>
                      <tr>
                        <td clospan="3">Type</td>
                        <td clospan="3">
                          <select
                            class="form-select"
                            name="leave_type"
                            onChange={(e) => setType(e.target.value)}
                          >
                            <option value="Sick leave">Sick leave</option>
                            <option value="Other leave">Other leave</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td clospan="3">Start date</td>
                        <td clospan="3">
                          <input
                            type="date"
                            class="form-select"
                            name="leave_start_date"
                            onChange={(e) => setStartTime(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td clospan="3">End date</td>
                        <td clospan="3">
                          <input
                            type="date"
                            class="form-select"
                            name="leave_end_date"
                            onChange={(e) => setEndTime(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td clospan="3">Description</td>
                        <td colspan="3">
                          <textarea
                            type="text"
                            name="leave_description"
                            id=""
                            class="form-control"
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="3" align="center">
                          <button
                            onClick={createLeave}
                            class="btn btn-success"
                            style={{ width: "100%" }}
                          >
                            Create
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveRequest;
