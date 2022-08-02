import { Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const [vcode, setVCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    document.title = "Verify Password";
  });

  const changePassword = () => {
    if (vcode.length === 0) {
      setErrorMessage("Verification code can't be empty!");
    } else {
      if (localStorage.getItem("vcode") === vcode) {
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("pass");
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        axios
          .post(
            "http://127.0.0.1:8000/api/product/user/changePassword/otp/verify/confirmation",
            formData
          )
          .then((response) => {
            if (response.data === "Verified") {
              //   console.log("Password Changed");
              localStorage.removeItem("pass");
              localStorage.removeItem("vcode");
              history.push("/product/user/profile");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setErrorMessage("Wrong verification code!");
      }
    }
  };

  return (
    <>
      <div className="col-12 col-lg-9 border border-dark rounded p-3">
        <div className="row justify-content-center">
          <center>
            <h3> OTP Verification</h3>
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
                  <center>
                    <b className="text-danger">
                      <div className="mb-3">
                        A verification code has been sent to your email !
                      </div>
                    </b>
                  </center>
                  <input
                    type="text"
                    name="v_code"
                    placeholder="Enter Verification Code"
                    onChange={(e) => setVCode(e.target.value)}
                    className="form-control"
                  ></input>
                  <br></br>
                  <button
                    onClick={changePassword}
                    className="btn btn-success col-12"
                  >
                    &#10003; Save
                  </button>
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
