import { Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaRegEdit } from "react-icons/fa";

const EditProfilePicture = () => {
  const history = useHistory();
  const [profile_pic, setImage] = useState("");
  const [pass, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = "Update Profile Picture";
  });

  const updateProfilePicture = () => {
    if (profile_pic.length === 0) {
      setErrorMessage("Please select a Profile Picture");
    } else if (pass.length === 0) {
      setErrorMessage("Please provide your current password!");
    } else {
      const formData = new FormData();
      formData.append("profile_pic", profile_pic);
      formData.append("pass", pass);
      axios
        .post(
          "http://127.0.0.1:8000/api/product/user/edit/profilepicture/" +
            localStorage.getItem("username"),
          formData
        )
        .then((response) => {
          if (response.data === "Incorrect current passowrd!") {
            setErrorMessage(response.data);
          } else {
            console.log(response.data);
            history.goBack();
          }
        })
        .catch((error) => {
          console.log(error);
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
              <FaRegEdit></FaRegEdit> Change Profile Picture
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
                    <tbody>
                      <tr>
                        <td>Upload Image</td>
                        <td colSpan="2">
                          <input
                            type="file"
                            name="profile_pic"
                            onChange={(e) => setImage(e.target.files[0])}
                          ></input>
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
                            onClick={updateProfilePicture}
                            class="btn btn-success"
                            style={{ width: "100%" }}
                          >
                            Change
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
export default EditProfilePicture;
