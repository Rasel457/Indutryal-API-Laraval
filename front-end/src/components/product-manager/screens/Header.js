import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";

const Header = () => {
  const history = useHistory();
  let cTime = new Date().toLocaleTimeString();
  const [currTime, setCurrTime] = useState(cTime);
  const updateTime = () => {
    cTime = new Date().toLocaleTimeString();
    setCurrTime(cTime);
  };
  setInterval(updateTime, 1000);
  function logout() {
    localStorage.clear();
    history.push("/");
  }
  function activeProfile() {
    history.push("/product/user/profile");
  }
  function industryal() {
    history.push("/product");
  }
  return (
    <>
      <header>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Nav>
              <Nav.Link
                onClick={industryal}
                style={{ fontSize: "150%", fontWeight: "200px" }}
              >
                Industryal
              </Nav.Link>
            </Nav>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Nav.Link onClick={activeProfile}>
                  {" "}
                  <FaRegUser></FaRegUser> &nbsp;
                  {localStorage.getItem("username")}
                </Nav.Link>
                <Nav.Link onClick={logout}>
                  {" "}
                  Logout <FiLogOut></FiLogOut>{" "}
                </Nav.Link>
              </Nav>
              &nbsp; &nbsp;
              <b className="text-light mt-2 border border-info rounded bg-secondary p-1">
                {currTime}
              </b>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
