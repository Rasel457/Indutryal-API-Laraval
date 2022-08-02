import { useHistory } from "react-router-dom";
import { useState } from "react";
//import { API } from "../../config";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
//import setPageTitle from "../../setPageTitle";
import { FormLabel } from "react-bootstrap";

export default function Signin() {
  //setPageTitle("Login | Industryal");
  document.title = "Industryal";

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [erremail, setErrEmail] = useState("");
  const [errpass, setErrPass] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const onLogin = async () => {
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("pass", pass);
    await axios
      .post("http://127.0.0.1:8000/api/login", formdata, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "undefined",
          Accept: "application/json",
        },
      })
      .then((response) => {
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("type", response.data.type);
        localStorage.setItem("username", response.data.username);
        if (localStorage.getItem("type")) {
          if (localStorage.getItem("type") == "finance") {
            history.push("/financedashboard");
          } else if (localStorage.getItem("type") === "product") {
            history.push("/product");
          } else if (localStorage.getItem("type")== "sales"){
            history.push("/sales");
          }else if (localStorage.getItem("type") === "hr") {
            history.push("/HR");
          }  
          //DO YOURS
        }
      })
      .catch((error) => {
        console.log("ERRRR:: ", error.response.data);
        setErrorMessage("Invaild CREDENTIALS **");
      });
  };

  //GOTO DASHBOARD IF ALREADY LOGGED IN
  if (localStorage.getItem("type")) {
    if (localStorage.getItem("type") == "finance") {
      history.push("/financedashboard");
    } else if (localStorage.getItem("type") == "product") {
      history.push("/product");
    }else if (localStorage.getItem("type") === "hr") {
      history.push("/HR");
    }  
    //DO YOURS
  }

  //VALIDATION
  const onLoginValidation = () => {
    if (email === "" && pass === "") {
      setErrEmail("* Email Required");
      setErrPass("* Password Required");
    }
    if (email === "") {
      setErrEmail("* Email Required");
    } else if (pass == "") {
      setErrPass("* Password Required");
    } else {
      onLogin();
    }
  };

  return (
    <div align="center" style={{ paddingTop: "80px" }}>
      {errorMessage && (
        <center>
          {" "}
          <div class="alert alert-danger col-3" role="alert">
            {errorMessage}
          </div>{" "}
        </center>
      )}
      <Card style={{ width: "20rem" }}>
        <Card.Header>Login</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Form.Control
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
            />
            <FormLabel style={{ color: "red" }}>
              <b>{erremail}</b>
            </FormLabel>
          </ListGroup.Item>
          <ListGroup.Item>
            <Form.Control
              type="password"
              onChange={(event) => setPass(event.target.value)}
              placeholder="Password"
            />
            <FormLabel style={{ color: "red" }}>
              <b>{errpass}</b>
            </FormLabel>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="">Forgot Password?</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="">Signup as Admin</a>
          </ListGroup.Item>
        </ListGroup>
        <Card.Footer>
          <Button variant="success" onClick={onLoginValidation} type="Signin">
            Signin
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
