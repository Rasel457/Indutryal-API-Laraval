import FinanceNavbar from "./layouts/FinanceNavbar";
import { API } from "../../config";
import { useHistory } from "react-router";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import useGet from "./requests/useGet";
import setPageTitle from "../../setPageTitle";

export default function FinanceDashboard() {
  setPageTitle("Dashboard | Finance");
  //REDIRECT IF NOT LOGGED IN
  const history = useHistory();
  if (!localStorage.getItem("type")) {
    history.push("/");
  }
  //GET DASHBOARD DATA
  const [dashboard, setDashboard] = useState([]);
  useGet(API + "financedashboard/" + localStorage.getItem("id"), setDashboard);

  return (
    <div>
      <FinanceNavbar />
      <div align="center" style={{ paddingTop: "20px" }}>
        <Card style={{ width: "80rem" }}>
          <Card.Header>Organization</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Name: {dashboard.length ? dashboard.name : ""}
            </ListGroup.Item>
            <ListGroup.Item>
              Email: {dashboard.length ? dashboard.email : ""}
            </ListGroup.Item>
            <ListGroup.Item>
              Phone: {dashboard.length ? dashboard.phone : ""}
            </ListGroup.Item>
            <ListGroup.Item>
              EST: {dashboard.length ? dashboard.established : ""}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
      <div align="center" style={{ paddingTop: "20px" }}>
        <table>
          <tr>
            <td style={{ paddingRight: "40px" }}>
              <Card style={{ width: "18rem" }}>
                <Card.Header>Product</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Manager:{" "}
                    {dashboard.length
                      ? dashboard[3] != null
                        ? dashboard[3].firstname + " " + dashboard[3].lastname
                        : ""
                      : ""}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Email:{" "}
                    {dashboard.length
                      ? dashboard[3] != null
                        ? dashboard[3].email
                        : ""
                      : ""}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Email:{" "}
                    {dashboard.length
                      ? dashboard[3] != null
                        ? dashboard[3].phone
                        : ""
                      : ""}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </td>
            <td style={{ paddingRight: "40px" }}>
              <Card style={{ width: "18rem" }}>
                <Card.Header>Sales & Marketing</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Manager:{" "}
                    {dashboard.length
                      ? dashboard[2] != null
                        ? dashboard[2].firstname + " " + dashboard[2].lastname
                        : ""
                      : ""}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Email:{" "}
                    {dashboard.length
                      ? dashboard[2] != null
                        ? dashboard[2].email
                        : ""
                      : ""}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Email:{" "}
                    {dashboard.length
                      ? dashboard[2] != null
                        ? dashboard[2].phone
                        : ""
                      : ""}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </td>
            <td style={{ paddingRight: "40px" }}>
              <Card style={{ width: "18rem" }}>
                <Card.Header>HR</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Manager:{" "}
                    {dashboard.length
                      ? dashboard[4] != null
                        ? dashboard[4].firstname + " " + dashboard[4].lastname
                        : ""
                      : ""}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Email:{" "}
                    {dashboard.length
                      ? dashboard[4] != null
                        ? dashboard[4].email
                        : ""
                      : ""}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Email:{" "}
                    {dashboard.length
                      ? dashboard[4] != null
                        ? dashboard[4].phone
                        : ""
                      : ""}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </td>
            <td>
              <Card style={{ width: "18rem" }}>
                <Card.Header>Finance</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Manager:{" "}
                    {dashboard.length
                      ? dashboard[1] != null
                        ? dashboard[1].firstname + " " + dashboard[1].lastname
                        : ""
                      : ""}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Email:{" "}
                    {dashboard.length
                      ? dashboard[1] != null
                        ? dashboard[1].email
                        : ""
                      : ""}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Email:{" "}
                    {dashboard.length
                      ? dashboard[1] != null
                        ? dashboard[1].phone
                        : ""
                      : ""}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
