import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Nav } from "react-bootstrap";

export default function FinanceNavbar(){
    return(
        <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/financedashboard"><h1><i>Industryal</i></h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Invoice" id="basic-nav-dropdown">
                <NavDropdown.Item href="/financecustomerinvoice">Customer Invoices</NavDropdown.Item>
                <NavDropdown.Item href="/financesupplierinvoice">Supplier Invoices</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/financenewcustomerinvoice">New Customer Invoice</NavDropdown.Item>
                <NavDropdown.Item href="/financenewsupplierinvoice">New Supplier Invoice</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Payment" id="basic-nav-dropdown">
                <NavDropdown.Item href="/financepaymenthistory">Payment History</NavDropdown.Item>
                <NavDropdown.Item href="/financecustomerpayment">Customer Payments</NavDropdown.Item>
                <NavDropdown.Item href="/financesupplierpayment">Supplier Payments</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Report" id="basic-nav-dropdown">
                <NavDropdown.Item href="/financeinvoicereport">Invoice Reports</NavDropdown.Item>
                <NavDropdown.Item href="/financefinancialreport">Financial Reports</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Budgeting" id="basic-nav-dropdown">
                <NavDropdown.Item href="/financebanks">Connected Banks</NavDropdown.Item>
                <NavDropdown.Item href="/financenewbank">Add Bank Account</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/financexpense">Expenses</NavDropdown.Item>
                <NavDropdown.Item href="/financeliability">Liabilities</NavDropdown.Item>
                <NavDropdown.Item href="/financeasset">Assets</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Leave Request" id="basic-nav-dropdown">
                <NavDropdown.Item href="/financeleave">My Leave-Requests</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/financenewleave">New Leave-Request</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Import/Export" id="basic-nav-dropdown">
                <NavDropdown.Item href="/financeimporthistory">History</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/financeimport">Import</NavDropdown.Item>
                <NavDropdown.Item href="/financeexport">Export</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Button variant="outline-danger">
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item href="/financeprofile">My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/signout">Signout</NavDropdown.Item>
              </NavDropdown>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}