import { Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaUserTie } from "react-icons/fa";

const Profile = () => {
  const MySwal = withReactContent(Swal);
  const history = useHistory();
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    document.title = "Profile";
    setLoading(true);
    axios
      .get(
        "http://127.0.0.1:8000/api/product/user/profile/" +
          localStorage.getItem("username")
      )
      .then(function (response) {
        setUserInfo(response.data);
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
              <FaUserTie></FaUserTie> Profile
            </h3>
            <hr></hr>
          </center>
          {/* component */}
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="container">
                <div className="text-left">
                  <Table bordered striped>
                    {userInfo.length === 0 ? (
                      <tbody>
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
                      </tbody>
                    ) : (
                      userInfo.map((user) => (
                        <tbody>
                          <tr>
                            <td>First Name</td>
                            <td>{user.firstname}</td>
                          </tr>
                          <tr>
                            <td>Second name</td>
                            <td>{user.lastname}</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>{user.email}</td>
                          </tr>
                          <tr>
                            <td>Phone</td>
                            <td>{user.phone}</td>
                          </tr>
                          <tr>
                            <td>Address</td>
                            <td>{user.address}</td>
                          </tr>
                          <tr>
                            <td>Position</td>
                            <td>Product Manager</td>
                          </tr>
                          <tr>
                            <td>Supervisor</td>
                            <td>HR</td>
                          </tr>
                        </tbody>
                      ))
                    )}
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
export default Profile;
