import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactExport from "react-data-export";
import { FaListUl } from "react-icons/fa";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const MyLeaveRequest = () => {
  const MySwal = withReactContent(Swal);
  const history = useHistory();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(async () => {
    document.title = "My Leave List";
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/product/user/leave/myrequest")
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

  const searchWarehouse = () => {
    if (search.length === 0) {
      setErrorMessage("Please enter leave description");
    } else {
      setLoading(true);
      const searchUrl =
        "http://127.0.0.1:8000/api/product/user/leave/myrequest/search/" +
        search;
      axios
        .get(searchUrl)
        .then((response) => {
          setList(response.data);
          setLoading(false);
          if (response.data.length === 0) {
            setErrorMessage("Request not found!");
          } else {
            setErrorMessage("");
          }
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
              <FaListUl></FaListUl> My Leave List
            </h3>
          </center>
          <hr></hr>
          <input
            type="text"
            className="form-control mt-3 mb-5"
            style={{ width: "50%" }}
            placeholder="Search By Request Description..."
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button
            className="btn btn-outline-primary mt-3"
            style={{ width: "10%", height: "5%", marginLeft: "20px" }}
            onClick={() => searchWarehouse()}
          >
            Search
          </button>
          {errorMessage && (
            <center>
              {" "}
              <div class="alert alert-danger col-8" role="alert">
                {errorMessage}
              </div>{" "}
            </center>
          )}
          {/* component */}
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="container">
                <div className="text-left">
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>Request Type</th>
                        <th>Request Description</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Created</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
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
                        list.map((request) => (
                          <tr>
                            <td>{request.type}</td>
                            <td>{request.request_description}</td>
                            <td>{request.start_time}</td>
                            <td>{request.end_time}</td>
                            <td>{request.request_made}</td>
                            <td>
                              {request.status === "Pending" ? (
                                <b className="text-primary">{request.status}</b>
                              ) : request.status === "Approved" ? (
                                <b className="text-success">{request.status}</b>
                              ) : (
                                <b className="text-danger">{request.status}</b>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
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

export default MyLeaveRequest;
