import { Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaWarehouse } from "react-icons/fa";

const AddWarehouse = () => {
  const [warehouse_id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Bangladesh");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("Open");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    document.title = "Create Warehouse";
  }, []);

  const createWarehouse = () => {
    if (warehouse_id.length === 0) {
      setErrorMessage("Warehouse ID can't be empty!");
    } else if (name.length === 0) {
      setErrorMessage("Warehouse name can't be empty!");
    } else if (description.length === 0) {
      setErrorMessage("Warehouse description can't be empty!");
    } else if (address.length === 0) {
      setErrorMessage("Warehouse address can't be empty!");
    } else if (zip_code.length === 0) {
      setErrorMessage("Warehouse zip code can't be empty!");
    } else if (!Number(zip_code)) {
      setErrorMessage("Warehouse zip code must be a number!");
    } else if (city.length === 0) {
      setErrorMessage("Warehouse city can't be empty!");
    } else if (country.length === 0) {
      setErrorMessage("Warehouse country can't be empty!");
    } else if (phone.length === 0) {
      setErrorMessage("Warehouse phone can't be empty!");
    } else if (quantity.length === 0) {
      setErrorMessage("Warehouse quantity can't be empty!");
    } else if (!Number(quantity)) {
      setErrorMessage("Warehouse quantity must be a number!");
    } else if (quantity < 1) {
      setErrorMessage("Please provide a valid quantity!");
    } else if (status.length === 0) {
      setErrorMessage("Warehouse status can't be empty!");
    } else {
      const formData = new FormData();
      formData.append("warehouse_id", warehouse_id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("zip_code", zip_code);
      formData.append("city", city);
      formData.append("country", country);
      formData.append("phone", phone);
      formData.append("quantity", quantity);
      formData.append("status", status);

      axios
        .post("http://127.0.0.1:8000/api/warehouse/create", formData)
        .then((response) => {
          console.log(response);
          history.push("/warehouse/list");
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
              <FaWarehouse></FaWarehouse> Add Warehouse
            </h3>
          </center>
          <hr></hr>
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
            <div className="col-10">
              <div className="container">
                <div className="text-left">
                  <Table striped bordered>
                    <tbody>
                      <tr>
                        <td>Id</td>
                        <td>
                          <input
                            type="text"
                            class="form-control"
                            name="warehouse_id"
                            onChange={(e) => setId(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td clospan="3">Name</td>
                        <td clospan="3">
                          <input
                            type="text"
                            class="form-control"
                            name="warehouse_name"
                            onChange={(e) => setName(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td clospan="3">Description</td>
                        <td colspan="3">
                          <textarea
                            id=""
                            cols="50"
                            rows="2"
                            class="form-control"
                            name="warehouse_description"
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td clospan="3">Address</td>
                        <td colspan="3">
                          <textarea
                            name="warehouse_address"
                            id=""
                            cols="20"
                            rows="1"
                            class="form-control"
                            onChange={(e) => setAddress(e.target.value)}
                          ></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td clospan="3">Zip Code</td>
                        <td clospan="3">
                          <input
                            type="text"
                            class="form-control"
                            name="warehouse_zip_code"
                            onChange={(e) => setZipCode(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td clospan="3">City</td>
                        <td clospan="3">
                          <input
                            type="text"
                            class="form-control"
                            name="warehouse_city"
                            onChange={(e) => setCity(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td clospan="3">Country</td>
                        <td clospan="3">
                          <select
                            class="form-select"
                            id="warehouse"
                            name="warehouse_country"
                            onChange={(e) => setCountry(e.target.value)}
                          >
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="India">India</option>
                            <option value="China">China</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Japan">Japan</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Singapore">Singapore</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td clospan="3">Phone</td>
                        <td clospan="3">
                          <input
                            type="text"
                            class="form-control"
                            name="warehouse_phone"
                            onChange={(e) => setPhone(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>
                          <select
                            class="form-select"
                            id="warehouse"
                            name="warehouse_status"
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option value="Open">Open</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td clospan="3">Quantity</td>
                        <td clospan="3">
                          <input
                            type="text"
                            class="form-control"
                            name="warehouse_quantity"
                            onChange={(e) => setQuantity(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="3" align="center">
                          <button
                            onClick={createWarehouse}
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

export default AddWarehouse;
