import { Link } from "react-router-dom";
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "sweetalert2/dist/sweetalert2.css";

const SideNavbar = () => {
  const MySwal = withReactContent(Swal);
  const [date, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
  };

  const showCalendar = () => {
    MySwal.fire({
      title: (
        <Calendar onChange={onChange} value={date} className="w-100"></Calendar>
      ),
      confirmButtonText: "Hide",
    });
  };
  return (
    <>
      <div className="col-12 col-lg-2 border border-dark bg-light rounded p-3">
        <div className="text-left mt-2 rounded">
          <h4>Products</h4>
          <Link
            to="/product/create"
            className="btn btn-outline-dark btn-sm mb-2"
          >
            New Product
          </Link>{" "}
          <br></br>
          <Link to="/product/list" className="btn btn-outline-dark btn-sm mb-2">
            List
          </Link>{" "}
          <br></br>
          <Link
            to="/product/list/faulty"
            className="btn btn-outline-dark btn-sm mb-2"
          >
            Faulty Product
          </Link>{" "}
          <br></br>
          <Link
            to="/product/stocks"
            className="btn btn-outline-dark btn-sm mb-2"
          >
            Stocks
          </Link>{" "}
          <br></br>
          <Link
            to="/product/transfer"
            className="btn btn-outline-dark btn-sm mb-2"
          >
            Transfer Product
          </Link>{" "}
          <br></br>
          <Link
            to="/product/statistics"
            className="btn btn-outline-dark btn-sm mb-2"
          >
            Statistics
          </Link>
          <br></br>
          <Link
            to="/product/compare"
            className="btn btn-outline-dark btn-sm mb-2"
          >
            Compare
          </Link>
        </div>
        <hr></hr>
        <div className="text-left mt-2">
          <h4>Warehouse</h4>
          <Link
            to="/warehouse/create"
            className="btn btn-outline-dark btn-sm mb-2"
          >
            New Warehouse
          </Link>{" "}
          <br></br>
          <Link
            to="/warehouse/list"
            className="btn btn-outline-dark btn-sm mb-2"
          >
            List
          </Link>{" "}
          <br></br>
          <Link
            to="/warehouse/statistics"
            className="btn btn-outline-dark btn-sm mb-2"
          >
            Statistics
          </Link>
        </div>
        <hr></hr>
        <div className="text-left mt-2">
          <h4>Others</h4>
          <Link
            to="/product/user/leave"
            className="btn btn-outline-dark btn-sm mb-2"
          >
            Leave Requests
          </Link>{" "}
          <br></br>
          <Link
            to="/product/user/activities"
            className="btn btn-outline-dark btn-sm mb-2"
          >
            Activities
          </Link>{" "}
          <br></br>
          <Link
            to="/product/user/administration"
            className="btn btn-outline-dark btn-sm mb-2"
          >
            Administration
          </Link>
          <br></br>
          <Link to="/product/map" className="btn btn-outline-dark btn-sm mb-2">
            Map
          </Link>
          <br></br>
          <button onClick={() => showCalendar()} className="btn btn-primary">
            Calendar
          </button>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
