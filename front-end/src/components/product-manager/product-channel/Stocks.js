import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import ReactExport from "react-data-export";
import { FaShoppingBasket } from "react-icons/fa";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const Stocks = () => {
  const [list, setList] = useState([]);
  const [exportList, setExportList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(async () => {
    document.title = "Product Stocks";
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/product/list")
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
          title: "Alert Status",
          style: { font: { sz: "18", bold: true } },
          width: { wch: 25 },
        },
      ],
      data: exportList.map((data) => [
        { value: data.product_id, style: { font: { sz: "14" } } },
        { value: data.product_name, style: { font: { sz: "14" } } },
        { value: data.warehouse_name, style: { font: { sz: "14" } } },
        { value: data.stock, style: { font: { sz: "14" } } },
      ]),
    },
  ];

  const searchProduct = () => {
    if (search.length === 0) {
      setErrorMessage("Please enter a product name!");
    } else {
      setLoading(true);
      const searchUrl = "http://127.0.0.1:8000/api/product/search/" + search;
      let check = false;
      axios
        .get(searchUrl)
        .then((response) => {
          setList(response.data);
          setLoading(false);
          if (response.data.length === 0) {
            setErrorMessage("Product not found!");
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
              <FaShoppingBasket></FaShoppingBasket> Product Stocks
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
              filename="Stock List"
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
              <ExcelSheet dataSet={DataSet} name="Stock List" />
            </ExcelFile>
          ) : null}
          {/* component */}
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="container">
                <div className="text-left">
                  <form method="POST" enctype="multipart/form-data">
                    <Table bordered hover>
                      <thead>
                        <tr>
                          <th>Product ID</th>
                          <th>Product Name</th>
                          <th>Warehouse Name</th>
                          <th>Quantity</th>
                          <th>Alert Status</th>
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
                              <td>{product.warehouse_name}</td>
                              <td>{product.stock}</td>
                              <td>
                                {product.stock !== 0 ? (
                                  <b className="text-success">In Stock</b>
                                ) : (
                                  <b className="text-danger">Out of Stock</b>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stocks;
