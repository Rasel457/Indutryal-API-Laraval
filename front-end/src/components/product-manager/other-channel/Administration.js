import { Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserLock } from "react-icons/fa";
const Administration = () => {
  const [issue_name, setIssueName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = "Administration";
  });

  const createIssue = () => {
    if (issue_name.length === 0) {
      setErrorMessage("Please provide a issue name!");
    } else if (description.length === 0) {
      setErrorMessage("Please provide a description!");
    } else {
      const formData = new FormData();
      formData.append("issue_name", issue_name);
      formData.append("description", description);

      axios
        .post(
          "http://127.0.0.1:8000/api/product/user/administration/create",
          formData
        )
        .then((response) => {
          setMessage("Issue has been sent!");
          setErrorMessage("");
          console.log(response);
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
              <FaUserLock></FaUserLock> Administration
            </h3>
            <hr></hr>
          </center>
          <div className="row align-items-start mb-2">
            <div class="col"></div>
            <div class="col-7"></div>
            <div class="col">
              <Link
                to="/product/user/administration/myissue"
                className="btn btn-secondary rounded p-1 text-right"
              >
                My Issue List
              </Link>
            </div>
          </div>
          {/* component */}
          {message && (
            <center>
              {" "}
              <div class="alert alert-success col-8" role="alert">
                {message}
              </div>{" "}
            </center>
          )}
          {errorMessage && (
            <center>
              {" "}
              <div class="alert alert-danger col-8" role="alert">
                {errorMessage}
              </div>{" "}
            </center>
          )}
          <div className="row justify-content-center mt-3">
            <div className="col-10">
              <div className="container">
                <div className="text-left">
                  <Table striped bordered>
                    <tbody>
                      <tr>
                        <td>Issue Name</td>
                        <td>
                          <input
                            type="text"
                            name="issue_name"
                            class="form-control"
                            onChange={(e) => setIssueName(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td>Message</td>
                        <td>
                          <textarea
                            type="text"
                            name="message"
                            id=""
                            class="form-control"
                            onChange={(e) => setDescription(e.target.value)}
                          >
                            {" "}
                          </textarea>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" align="center">
                          <button
                            onClick={createIssue}
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

export default Administration;
