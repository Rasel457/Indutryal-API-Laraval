import { Table } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaSync } from "react-icons/fa";

const EditProduct = () => {
  const [product_id, setPId] = useState("");
  const [product_name, setName] = useState("");
  const [status_sell, setSellStatus] = useState("For Sell");
  const [status_purchase, setPurchaseStatus] = useState("For Purchase");
  const [product_description, setDescription] = useState("");
  const [warehouse_name, setWarehouse] = useState("Warehouse 1");
  const [stock, setStock] = useState("");
  const [nature, setNature] = useState("Manufactired Product");
  const [weight, setWeight] = useState("");
  const [weight_unit, setWeightUnit] = useState("kilogram");
  const [dimention, setDimention] = useState("");
  const [dimention_unit, setDimentionUnit] = useState("m");
  const [selling_price, setSellingPrice] = useState("");
  const [tax, setTax] = useState("Excluding Tax");
  const [product_condition, setCondition] = useState("Good");
  const [warehouseList, setWarehouseList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const { id: pId } = useParams();

  useEffect(() => {
    document.title = "Update Product";
    axios
      .get("http://127.0.0.1:8000/api/product/" + pId)
      .then(function (response) {
        const result = response.data;
        setPId(result.product_id);
        setName(result.product_name);
        setSellStatus(result.status_sell);
        setPurchaseStatus(result.status_purchase);
        setDescription(result.product_description);
        setWarehouse(result.warehouse_name);
        setStock(result.stock);
        setNature(result.nature);
        setWeight(result.weight);
        setWeightUnit(result.weight_unit);
        setDimention(result.dimention);
        setDimentionUnit(result.dimention_unit);
        setSellingPrice(result.selling_price);
        setTax(result.tax);
        setCondition(result.product_condition);
      });

    axios
      .get("http://127.0.0.1:8000/api/warehouse/list/names")
      .then(function (response) {
        setWarehouseList(response.data);
      });
  }, []);

  const updateProduct = () => {
    if (product_id.length === 0) {
      setErrorMessage("Product id can't be empty!");
    } else if (product_name.length === 0) {
      setErrorMessage("Product name can't be empty!");
    } else if (product_description.length === 0) {
      setErrorMessage("Product description can't be empty!");
    } else if (stock.length === 0) {
      setErrorMessage("Product stock can't be empty!");
    } else if (!Number(stock)) {
      setErrorMessage("Product stock value must be a number!");
    } else if (stock < 1) {
      setErrorMessage("Please provide a valid stock quantity");
    } else if (weight.length === 0) {
      setErrorMessage("Product weight can't be empty!");
    } else if (!Number(weight)) {
      setErrorMessage("Product weight value must be a number!");
    } else if (weight < 1) {
      setErrorMessage("Please provide a valid weight!");
    } else if (dimention.length === 0) {
      setErrorMessage("Product dimention can't be empty!");
    } else if (!Number(dimention)) {
      setErrorMessage("Product dimention value must be a number!");
    } else if (dimention < 1) {
      setErrorMessage("Please provide a valid dimention!");
    } else if (selling_price.length === 0) {
      setErrorMessage("Product selling price can't be empty!");
    } else if (!Number(selling_price)) {
      setErrorMessage("Product selling price must be a number!");
    } else if (selling_price < 1) {
      setErrorMessage("Please provide a valid amount!");
    } else if (product_condition.length === 0) {
      setErrorMessage("Product condition can't be empty!");
    } else {
      let data = {
        product_id,
        product_name,
        status_sell,
        status_purchase,
        product_description,
        warehouse_name,
        stock,
        nature,
        weight,
        weight_unit,
        dimention,
        dimention_unit,
        selling_price,
        tax,
        product_condition,
      };

      axios
        .put("http://127.0.0.1:8000/api/product/edit/" + pId, data)
        .then((response) => {
          if (response.data === "Stock not available!") {
            setErrorMessage(response.data);
          } else {
            history.goBack();
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
              <FaSync></FaSync> Edit Product
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
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="container">
                <div className="text-left">
                  <Table striped bordered>
                    <tbody>
                      <tr>
                        <td>Id</td>
                        <td colSpan="2">
                          <input
                            type="text"
                            className="form-control"
                            name="product_id"
                            value={product_id}
                            onChange={(e) => setPId(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td colSpan="2">
                          <input
                            type="text"
                            className="form-control"
                            name="product_name"
                            value={product_name}
                            onChange={(e) => setName(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td>Status (Sell)</td>
                        <td colSpan="2">
                          <select
                            className="form-select"
                            name="product_sell_status"
                            value={status_sell}
                            onChange={(e) => setSellStatus(e.target.value)}
                          >
                            <option value="For Sell">For Sell</option>
                            <option value="Not for sell">Not For Sell</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>Status (Purchase)</td>
                        <td colSpan="2">
                          <select
                            className="form-select"
                            name="product_purchase_status"
                            value={status_purchase}
                            onChange={(e) => setPurchaseStatus(e.target.value)}
                          >
                            <option value="For Purchase">For Purchase</option>
                            <option value="Not for purchase">
                              Not for purchase
                            </option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td colSpan="2">
                          <textarea
                            type="text"
                            name="product_description"
                            id=""
                            class="form-control"
                            value={product_description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td>Warehouse</td>
                        <td colSpan="2">
                          <select
                            className="form-select"
                            name="warehouse_name"
                            value={warehouse_name}
                            onChange={(e) => setWarehouse(e.target.value)}
                          >
                            {warehouseList.map((wName) => (
                              <option value={wName}>{wName}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>Stock</td>
                        <td colSpan="2">
                          <input
                            type="text"
                            class="form-control"
                            name="product_stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td>Nature of product</td>
                        <td colspan="2">
                          <select
                            class="form-select"
                            name="product_nature"
                            value={nature}
                            onChange={(e) => setNature(e.target.value)}
                          >
                            <option value="Manufactired Product">
                              Manufactired Product
                            </option>
                            <option value="Raw Material">Raw Material</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>Weight</td>
                        <td>
                          <input
                            type="text"
                            class="form-control"
                            name="product_weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                          ></input>
                        </td>
                        <td>
                          <select
                            class="form-select"
                            name="product_weight_unit"
                            value={weight_unit}
                            onChange={(e) => setWeightUnit(e.target.value)}
                          >
                            <option value="kilogram">kilogram</option>
                            <option value="gram">gram</option>
                            <option value="tonne">tonne</option>
                            <option value="mg">mg</option>
                            <option value="ounce">ounce</option>
                            <option value="pound">pound</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>Length x Width x Height</td>
                        <td>
                          <input
                            type="text"
                            class="form-control"
                            name="product_dimention"
                            value={dimention}
                            onChange={(e) => setDimention(e.target.value)}
                          ></input>
                        </td>
                        <td>
                          <select
                            class="form-select"
                            name="product_dimention_unit"
                            value={dimention_unit}
                            onChange={(e) => setDimentionUnit(e.target.value)}
                          >
                            <option value="m">m</option>
                            <option value="dm">dm</option>
                            <option value="cm">cm</option>
                            <option value="mm">mm</option>
                            <option value="foot">foot</option>
                            <option value="inch">inch</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>Selling Price</td>
                        <td>
                          <input
                            type="text"
                            class="form-control"
                            name="product_selling_price"
                            value={selling_price}
                            onChange={(e) => setSellingPrice(e.target.value)}
                          ></input>
                        </td>
                        <td>
                          <select
                            class="form-select"
                            name="product_selling_tax"
                            value={tax}
                            onChange={(e) => setTax(e.target.value)}
                          >
                            <option value="Excluding Tax">Excluding Tax</option>
                            <option value="Including Tax">Including Tax</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>Product Condition</td>
                        <td colSpan="2">
                          <select
                            className="form-select"
                            name="product_condition"
                            value={product_condition}
                            onChange={(e) => setCondition(e.target.value)}
                          >
                            <option value="Good">Good</option>
                            <option value="Faulty">Faulty</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="3" align="center">
                          <button
                            onClick={updateProduct}
                            class="btn btn-success"
                            style={{ width: "100%" }}
                          >
                            Update
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

export default EditProduct;
