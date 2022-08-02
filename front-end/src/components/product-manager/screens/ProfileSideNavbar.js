import { Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ProfileSideNavbar = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    axios
      .get(
        "http://127.0.0.1:8000/api/product/user/profile/" +
          localStorage.getItem("username")
      )
      .then(function (response) {
        setUserInfo(response.data[0]);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="col-12 col-lg-2 border border-dark bg-light rounded p-3">
        <div className="text-left mt-2 rounded">
          <img
            src={"http://localhost:8000/upload/Users/" + userInfo.profile_pic}
            width="200"
            height="200"
            alt="Profile_Picture"
          ></img>
          <br></br>{" "}
          <div className="mx-5 mt-1" style={{ fontFamily: "Cursive" }}>
            {localStorage.getItem("username")}
          </div>{" "}
          <hr></hr>
          <Link to="/product/user/edit" className="btn btn-primary btn-sm mb-2">
            Edit Profile
          </Link>{" "}
          <br></br>
          <Link
            to="/product/user/edit/profilepicture"
            className="btn btn-warning btn-sm mb-2"
          >
            Change Profile Picture
          </Link>{" "}
          <br></br>
          <Link
            to="/product/user/edit/changePassword"
            className="btn btn-danger btn-sm mb-2"
          >
            Change Password
          </Link>{" "}
          <br></br>
        </div>
      </div>
    </>
  );
};

export default ProfileSideNavbar;
