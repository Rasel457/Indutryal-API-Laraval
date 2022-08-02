import { Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { RiLockPasswordLine } from "react-icons/ri";
import Recaptcha from "react-recaptcha";

const ChangePassword = () => {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptcha, setRecaptcha] = useState(false);
  const history = useHistory();

  useEffect(() => {
    document.title = "Update Password";
  });

  function verifyCallback(response) {
    if (response) {
      setRecaptcha(true);
      console.log("OK");
    }
  }

  const proceed = () => {
    if (currentPass.length === 0) {
      setErrorMessage("Current password can't be empty!");
    } else if (newPass.length === 0) {
      setErrorMessage("New password can't be empty!");
    } else if (newPass.length < 8) {
      setErrorMessage("At least 8 charecters PASSWORD needed! - New Password");
    } else if (confirmNewPass.length === 0) {
      setErrorMessage("Confirm new password can't be empty!");
    } else if (confirmNewPass.length < 8) {
      setErrorMessage(
        "At least 8 charecters PASSWORD needed! - Confirm New Password"
      );
    } else if (newPass !== confirmNewPass) {
      setErrorMessage("Password MISMATCH!");
    } else if (recaptcha === false) {
      Swal.fire({
        icon: "warning",
        title: "Recaptcha needed!",
        confirmButtonText: "Try Again",
      });
    } else {
      axios
        .get(
          "http://127.0.0.1:8000/api/product/user/profile/" +
            localStorage.getItem("username")
        )
        .then(function (response) {
          if (response.data[0].pass === currentPass) {
            //Proceed
            const username = localStorage.getItem("username");
            const formData = new FormData();
            formData.append("currPass", currentPass);
            formData.append("newPass", newPass);
            formData.append("confirmNewPass", confirmNewPass);
            formData.append("username", username);
            axios
              .post(
                "http://127.0.0.1:8000/api/product/user/changePassword/otp/verify",
                formData
              )
              .then((response) => {
                if (response.data !== "NOT OK") {
                  localStorage.setItem("vcode", response.data);
                  localStorage.setItem("pass", newPass);
                  history.push("/product/user/edit/changePassword/verify");
                } else {
                  console.log("Not Sent");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            setErrorMessage("Incorrect current password!");
          }
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
              <RiLockPasswordLine></RiLockPasswordLine> &nbsp; Change Password
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
          {/* component */}
          <div className="row justify-content-center mt-3">
            <div className="col-10">
              <div className="container">
                <div className="text-left">
                  <Table striped bordered>
                    <tbody>
                      <tr>
                        <td clospan="3">Current Password</td>
                        <td clospan="3">
                          <input
                            type="password"
                            class="form-control"
                            name="curr_pass"
                            onChange={(e) => setCurrentPass(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td clospan="3">New Password</td>
                        <td clospan="3">
                          <input
                            type="password"
                            class="form-control"
                            name="new_pass"
                            onChange={(e) => setNewPass(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td clospan="3">Confirm New Password</td>
                        <td clospan="3">
                          <input
                            type="password"
                            class="form-control"
                            name="confiem_new_pass"
                            onChange={(e) => setConfirmNewPass(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="3">
                          <div className="row justify-content-center">
                            <div className="col-5 my-2">
                              <Recaptcha
                                sitekey="6LfLlS8bAAAAAOAhcu5s2mN1oTCPOkpGPApAYfxQ"
                                render="explicit"
                                verifyCallback={verifyCallback}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="mt-5" colspan="3" align="center">
                          <button
                            onClick={proceed}
                            class="btn btn-success"
                            style={{ width: "100%" }}
                          >
                            Proceed &#8594;
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

export default ChangePassword;
