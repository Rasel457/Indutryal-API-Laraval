import { Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactExport from "react-data-export";
import { FaTasks } from "react-icons/fa";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ActivityList = () => {
  const MySwal = withReactContent(Swal);
  const history = useHistory();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(async () => {
    document.title = "Activity List";
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/product/user/activities")
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

  const searchActivity = () => {
    if (search.length === 0) {
      setErrorMessage("Please enter a type!");
    } else {
      setLoading(true);
      const searchUrl =
        "http://127.0.0.1:8000/api/product/user/activities/search/" + search;
      axios
        .get(searchUrl)
        .then((response) => {
          setList(response.data);
          setLoading(false);
          if (response.data.length === 0) {
            setErrorMessage("Activity not found!");
          } else {
            setErrorMessage("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setLoading(true);
    const searchUrl =
      "http://127.0.0.1:8000/api/product/user/activities/search/" + search;
    axios
      .get(searchUrl)
      .then((response) => {
        setList(response.data);
        setLoading(false);
        if (response.data.length === 0) {
          setErrorMessage("Activity not found!");
        } else {
          setErrorMessage("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="col-12 col-lg-9 border border-dark rounded p-3">
        <div className="row justify-content-center">
          <center>
            <h3>
              {" "}
              <FaTasks></FaTasks> Activity List
            </h3>
          </center>
          <hr></hr>
          <input
            type="text"
            className="form-control mt-3 mb-5"
            style={{ width: "50%" }}
            placeholder="Search By Type..."
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button
            className="btn btn-outline-primary mt-3"
            style={{ width: "10%", height: "5%", marginLeft: "20px" }}
            onClick={() => searchActivity()}
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
                        <th>Type</th>
                        <th>Description</th>
                        <th>Time</th>
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
                        list.map((activity) => (
                          <tr>
                            <td>{activity.type}</td>
                            <td>{activity.description}</td>
                            <td>{activity.activity_time}</td>
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

export default ActivityList;
