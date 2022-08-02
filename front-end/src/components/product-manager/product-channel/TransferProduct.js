import { Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaBoxOpen, FaExchangeAlt } from "react-icons/fa";

const TransferProduct = () => {
  const [warehouseList, setWarehouseList] = useState([]);
  const [product_id, setProductId] = useState("");
  const [warehouse_name, setWarehouseName] = useState("Grocery");
  const [transfer_quantity, setTransferQuantity] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    document.title = "Transfer Product";
    axios
      .get("http://127.0.0.1:8000/api/warehouse/list/names")
      .then(function (response) {
        setWarehouseList(response.data);
      });
  }, []);

  const transferProduct = () => {
    if (product_id.length === 0) {
      setMessage("Product ID can't be empty!");
    } else if (transfer_quantity.length === 0) {
      setMessage("Warehouse name can't be empty!");
    } else if (!Number(transfer_quantity)) {
      setMessage("Transfer qunatity must be a number!");
    } else if (transfer_quantity < 1) {
      setMessage("Please provide a valid quantity!");
    } else {
      const data = { product_id, warehouse_name, transfer_quantity };
      axios
        .put("http://127.0.0.1:8000/api/product/transfer", data)
        .then((response) => {
          const result = response.data;
          if (result === "Product not found") {
            setMessage(result);
          } else if (
            result === "Requested quantity is bigger than waerhouse quantity"
          ) {
            setMessage(result);
          } else if (result === "You don't have that much product!") {
            setMessage(result);
          } else if (result === "You selected the current warehouse!") {
            setMessage(result);
          } else if (result === "Transfer Successful") {
            history.push("/product/stocks");
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
              <FaBoxOpen></FaBoxOpen> Transfer Product{" "}
              <FaExchangeAlt></FaExchangeAlt>{" "}
            </h3>
            <hr></hr>
          </center>
          {message && (
            <center>
              {" "}
              <div class="alert alert-danger col-8" role="alert">
                {message}
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
                        <td>Id</td>
                        <td>
                          <input
                            type="text"
                            class="form-control"
                            name="product_id"
                            onChange={(e) => setProductId(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td clospan="3"> New Warehouse</td>
                        <td clospan="3">
                          <select
                            class="form-select"
                            name="warehouse"
                            onChange={(e) => setWarehouseName(e.target.value)}
                          >
                            {warehouseList.map((wName) => (
                              <option value={wName}>{wName}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td clospan="3">Quantity</td>
                        <td clospan="3">
                          <input
                            type="text"
                            class="form-control"
                            name="product_quantity"
                            onChange={(e) =>
                              setTransferQuantity(e.target.value)
                            }
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="3" align="center">
                          <button
                            onClick={transferProduct}
                            class="btn btn-danger"
                            style={{ width: "100%" }}
                          >
                            Transfer
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

export default TransferProduct;
