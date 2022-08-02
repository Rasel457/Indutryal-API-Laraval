import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactExport from "react-data-export";
import { FaBox } from "react-icons/fa";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const FaultyProductList = () => {
  const MySwal = withReactContent(Swal);
  const history = useHistory();
  const [list, setList] = useState([]);
  const [exportList, setExportList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(async () => {
    document.title = "Faulty Product";
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/product/list/faulty")
      .then(function (response) {
        setList(response.data);
        setExportList(response.data);
        setLoading(false);
      });
  }, []);

  const override = `
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
`;

  const DataSet = [
    {
      columns: [
        {
          title: "Product ID",
          style: { font: { sz: "18", bold: true } },
          width: { wch: 25 },
        },
        {
          title: "Product Name",
          style: { font: { sz: "18", bold: true } },
          width: { wch: 25 },
        },
        {
          title: "Status(Sell)",
          style: { font: { sz: "18", bold: true } },
          width: { wch: 25 },
        },
        {
          title: "Status(Purchase)",
          style: { font: { sz: "18", bold: true } },
          width: { wch: 25 },
        },
        {
          title: "Product Description",
          style: { font: { sz: "18", bold: true } },
          width: { wch: 25 },
        },
        {
          title: "Warehouse Name",
          style: { font: { sz: "18", bold: true } },
          width: { wch: 25 },
        },
        {
          title: "Product Stock",
          style: { font: { sz: "18", bold: true } },
          width: { wch: 25 },
        },
        {
          title: "Product Nature",
          style: { font: { sz: "18", bold: true } },
          width: { wch: 25 },
        },
        {
          title: "Product Weight",
          style: { font: { sz: "18", bold: true } },
          width: { wch: 25 },
        },
        {
          title: "Product Dimention",
          style: { font: { sz: "18", bold: true } },
          width: { wch: 25 },
        },
        {
          title: "Product Selling Price",
          style: { font: { sz: "18", bold: true } },
          width: { wch: 25 },
        },
        {
          title: "Product Tax",
          style: { font: { sz: "18", bold: true } },
          width: { wch: 25 },
        },
        {
          title: "Product condition",
          style: { font: { sz: "18", bold: true } },
          width: { wch: 25 },
        },
        {
          title: "Date Added",
          style: { font: { sz: "18", bold: true } },
          width: { wch: 25 },
        },
      ],
      data: exportList.map((data) => [
        { value: data.product_id, style: { font: { sz: "14" } } },
        { value: data.product_name, style: { font: { sz: "14" } } },
        { value: data.status_sell, style: { font: { sz: "14" } } },
        { value: data.status_purchase, style: { font: { sz: "14" } } },
        { value: data.product_description, style: { font: { sz: "14" } } },
        { value: data.warehouse_name, style: { font: { sz: "14" } } },
        { value: data.stock, style: { font: { sz: "14" } } },
        { value: data.nature, style: { font: { sz: "14" } } },
        {
          value: data.weight + " " + data.weight_unit,
          style: { font: { sz: "14" } },
        },
        {
          value: data.dimention + " " + data.dimention_unit,
          style: { font: { sz: "14" } },
        },
        { value: data.selling_price, style: { font: { sz: "14" } } },
        { value: data.tax, style: { font: { sz: "14" } } },
        { value: data.product_condition, style: { font: { sz: "14" } } },
        { value: data.date_added, style: { font: { sz: "14" } } },
      ]),
    },
  ];

  function deleteEmployee(id) {
    MySwal.fire({
      title: "Are You Sure?",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteUrl = "http://127.0.0.1:8000/api/product/delete/" + id;
        axios
          .delete(deleteUrl)
          .then((response) => {
            history.go(0);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  const searchProduct = () => {
    if (search.length === 0) {
      setErrorMessage("Please enter a product name!");
    } else {
      setLoading(true);
      const searchUrl =
        "http://127.0.0.1:8000/api/product/search/faulty/" + search;
      axios
        .get(searchUrl)
        .then((response) => {
          setList(response.data);
          setLoading(false);
          if (response.data.length === 0) {
            setErrorMessage("No faulty product found!");
          } else {
            setErrorMessage("");
          }
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
              <FaBox></FaBox> Faulty Product List
            </h3>
          </center>
          <hr></hr>
          <input
            type="text"
            className="form-control mt-3 mb-5"
            style={{ width: "50%" }}
            placeholder="Search By Product Name..."
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button
            className="btn btn-outline-primary mt-3"
            style={{ width: "10%", height: "5%", marginLeft: "20px" }}
            onClick={() => searchProduct()}
          >
            Search
          </button>
          {errorMessage && (
            <center>
              {" "}
              <div class="alert alert-danger col-8" role="alert">
                {errorMessage}
              </div>{" "}
            </center>
          )}
          {exportList.length !== 0 ? (
            <ExcelFile
              filename="Faulty Product List"
              element={
                <center>
                  <button
                    type="button"
                    className="btn btn-success"
                    style={{ marginLeft: "1000px", marginBottom: "20px" }}
                  >
                    Download
                  </button>
                </center>
              }
            >
              <ExcelSheet dataSet={DataSet} name="Faulty Product List" />
            </ExcelFile>
          ) : null}
          {/* component */}
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="container">
                <div className="text-left">
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Product Nature</th>
                        <th>Selling Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Condition</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.length === 0 ? (
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
                      ) : (
                        list.map((product) => (
                          <tr>
                            <td>{product.product_id}</td>
                            <td>{product.product_name}</td>
                            <td>
                              {product.status_sell} <br></br>
                              {product.status_purchase}
                            </td>
                            <td>{product.nature}</td>
                            <td>{product.selling_price}</td>
                            <td>{product.product_description}</td>
                            <td>
                              <img
                                src={
                                  "http://localhost:8000/upload/Product/" +
                                  product.image
                                }
                                width="200"
                                height="200"
                                alt="Product_Photo"
                              ></img>
                            </td>
                            <td>{product.product_condition}</td>
                            <td>
                              <Link
                                to={`/product/edit/${product.id}`}
                                className="btn btn-warning mx-3"
                              >
                                Edit
                              </Link>
                              <br></br>
                              <button
                                onClick={() => deleteEmployee(product.id)}
                                className="btn btn-danger mt-2"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
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

export default FaultyProductList;
