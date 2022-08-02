import { Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaUserEdit } from "react-icons/fa";

const EditProfile = () => {
  const MySwal = withReactContent(Swal);
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    document.title = "Update Profile";
    setLoading(true);
    axios
      .get(
        "http://127.0.0.1:8000/api/product/user/profile/" +
          localStorage.getItem("username")
      )
      .then(function (response) {
        setFirstName(response.data[0].firstname);
        setLastName(response.data[0].lastname);
        setEmail(response.data[0].email);
        setPhoneNumber(response.data[0].phone);
        setAddress(response.data[0].address);
        setUserInfo(response.data[0]);
        setLoading(false);
      });
  }, []);

  const override = `
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`;

  const updateProfile = () => {
    if (firstName.length === 0) {
      setErrorMessage("Please provide first name!");
    } else if (lastName.length === 0) {
      setErrorMessage("Please provide last name");
    } else if (email.length === 0) {
      setErrorMessage("Please provide email address");
    } else if (address.length === 0) {
      setErrorMessage("Please provide address!");
    } else if (phoneNumber.length === 0) {
      setErrorMessage("Please provide phone number!");
    } else if (password.length === 0) {
      setErrorMessage("Please provide current password!");
    } else {
      const data = {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        password,
      };
      axios
        .put(
          "http://127.0.0.1:8000/api/product/user/edit/" +
            localStorage.getItem("username"),
          data
        )
        .then((response) => {
          if (response.data === "Incorrect current passowrd!") {
            setErrorMessage(response.data);
          } else {
            history.goBack();
          }
        });
    }
  };

  return (
    <>
      <div className="col-5 col-lg-9 border border-dark rounded p-3">
        <div className="row justify-content-center">
          <center>
            <h3>
              {" "}
              <FaUserEdit></FaUserEdit> Edit Profile
            </h3>
            <hr></hr>
          </center>
          {/* component */}
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="container">
                <div className="text-left">
                  {errorMessage && (
                    <center>
                      {" "}
                      <div class="alert alert-danger col-8" role="alert">
                        {errorMessage}
                      </div>{" "}
                    </center>
                  )}
                  <Table striped bordered>
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
                      <tbody>
                        <tr>
                          <td>First Name</td>
                          <td colSpan="2">
                            <input
                              type="text"
                              className="form-control"
                              name="firstName"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            ></input>
                          </td>
                        </tr>
                        <tr>
                          <td>Second Name</td>
                          <td colSpan="2">
                            <input
                              type="text"
                              className="form-control"
                              name="lastName"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            ></input>
                          </td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td colSpan="2">
                            <input
                              type="email"
                              className="form-control"
                              name="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            ></input>
                          </td>
                        </tr>
                        <tr>
                          <td>Phone Number</td>
                          <td colSpan="2">
                            <input
                              type="text"
                              className="form-control"
                              name="phoneNumber"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            ></input>
                          </td>
                        </tr>
                        <tr>
                          <td>Address</td>
                          <td colSpan="2">
                            <textarea
                              type="text"
                              name="address"
                              id=""
                              class="form-control"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            ></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td>Current Password</td>
                          <td colSpan="2">
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              onChange={(e) => setPassword(e.target.value)}
                            ></input>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="3" align="center">
                            <button
                              onClick={updateProfile}
                              class="btn btn-success"
                              style={{ width: "100%" }}
                            >
                              Update
                            </button>
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
    </>
  );
};
export default EditProfile;
