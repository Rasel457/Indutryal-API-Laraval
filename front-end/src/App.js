import NavBar from "./components/sales/NavBar";
import TableCustomer from "./components/sales/TableCustomer";
import FormUpdateCustomer from "./components/sales/FormUpdateCustomer";
import FormAddCustomer from "./components/sales/FormAddCustomer";
import SubMenuCustomer from "./components/sales/SubMenuCustomer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SalesChart from "./components/sales/SalesChart";
import Footer from "./components/sales/Footer";
import Home from "./components/product-manager/home/Home";
import TableOrders from "./components/sales/TableOrders";
import Login from "./components/common/Signin";
import SubMenuOrder from "./components/sales/SubMenuOrder";
import Profile from "./components/sales/Profile";
import FormUpdateUser from "./components/sales/FormUpdateUser";
import SubMenuHeading from "./components/sales/SubMenuHeading";
import FormChangePassword from "./components/sales/FormChangePassword";
import StackedAreaChart from "./components/sales/StackedAreaChart";
import PromptCreateOrder from "./components/sales/PromptCreateOrder";
import TableProduct from "./components/sales/TableProduct";
import FormUpdateOrder from "./components/sales/FormUpdateOrder";
import TableEmails from "./components/sales/TableEmails";
import "./components/product-manager/assets/css/bootstrap.min.css";
import SalesHome from "./components/sales/SalesHome";
import Signout from "./components/common/Signout";
import FinanceDashboard from "./components/finance/FinanceDashboard";
import FinanceCustomerInvoice from "./components/finance/invoice/FinanceCustomerInvoice";
import FinanceSupplierInvoice from "./components/finance/invoice/FinanceSupplierInvoice";
import FinanceNewCustomer from "./components/finance/invoice/FinanceNewCustomer";
import FinanceNewSupplier from "./components/finance/invoice/FinanceNewSupplier";
import FinancePaymentHistory from "./components/finance/payment/FinancePaymentHistory";
import FinanceCustomerPayment from "./components/finance/payment/FinanceCustomerPayment";
import FinanceSupplierPayment from "./components/finance/payment/FinanceSupplierPayment";
import FinanceFinancialReport from "./components/finance/report/FinanceFinancialReport";
import FinanceInvoiceReport from "./components/finance/report/FinanceInvoiceReport";
import FinanceLeave from "./components/finance/leave/FinanceLeave";
import FinanceNewLeave from "./components/finance/leave/FinanceNewLeave";
import FinanceImportHistory from "./components/finance/import/FinanceImportHistory";
import FinanceExport from "./components/finance/import/FinanceExport";
import FinanceImport from "./components/finance/import/FinanceImport";
import FinanceConnectedBank from "./components/finance/budgeting/FinanceConnectedBank";
import FinanceNewBank from "./components/finance/budgeting/FinanceNewBank";
import FinanceExpense from "./components/finance/budgeting/FinanceExpense";
import FinanceAsset from "./components/finance/budgeting/FinanceAsset";
import FinanceLiability from "./components/finance/budgeting/FinanceLiability";
import FinanceProfile from "./components/finance/profile/FinanceProfile";
import Navb from "./components/HR/Navbar";
import ProNav from "./components/HR/ProfileNav";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/sales/">
            <SalesHome />
          </Route>
          <Route exact path="/sales/orders">
            <NavBar />
            <SubMenuOrder />
            <TableOrders />
            <Footer />
          </Route>
          <Route exact path="/sales/order/update/:id">
            <NavBar />
            <FormUpdateOrder />
            <Footer />
          </Route>
          <Route exact path="/sales/order/add">
            <NavBar />
            <SubMenuOrder />
            {/* <FormAddOrder/> */}
            <PromptCreateOrder />
            <Footer />
          </Route>
          <Route exact path="/sales/order/place/:id">
            <NavBar />
            <SubMenuOrder />
            {/* <FormAddOrder/> */}
            <TableProduct />
            <Footer />
          </Route>
          <Route exact path="/sales/customers">
            <NavBar />
            <SubMenuCustomer />
            <TableCustomer />
            <Footer />
          </Route>
          <Route exact path="/sales/customer/update/:id">
            <NavBar />
            <SubMenuCustomer />
            <FormUpdateCustomer />
            <Footer />
          </Route>
          <Route exact path="/sales/customer/add">
            <NavBar />
            <SubMenuCustomer />
            <FormAddCustomer />
            <Footer />
          </Route>
          <Route exact path="/sales/statistics">
            <NavBar />

            <StackedAreaChart />
            <Footer />
          </Route>
          <Route exact path="/sales/profile/user">
            <NavBar />
            <SubMenuHeading heading="View Profile" />
            <Profile />
            <Footer />
          </Route>
          <Route exact path="/sales/profile/update">
            <NavBar />
            <SubMenuHeading heading="Edit Profile" />
            <FormUpdateUser />
            <Footer />
          </Route>
          <Route exact path="/sales/emails/all/">
            <NavBar />
            <SubMenuHeading heading="Emails" />
            <TableEmails />
            <Footer />
          </Route>
          <Route exact path="/sales/leaverequest/">
            <NavBar />
            <SubMenuHeading heading="Leave Request" />

            <Footer />
          </Route>
          <Route path="/sales/profile/changepassword">
            <NavBar />
            <SubMenuHeading heading="Change Password" />
            {/* <FormUpdateUser/> */}
            <FormChangePassword />
            <Footer />
          </Route>

          <Route exact path="/" component={Login}></Route>
          {/* Product */}
          <Route exact path="/product">
            <Home title="dashboard" nav="common" />
          </Route>
          <Route exact path="/product/create">
            <Home title="add-product" nav="common" />
          </Route>
          <Route exact path="/product/list">
            <Home title="product-list" nav="common" />
          </Route>
          <Route exact path="/product/edit/:id">
            <Home title="product-edit" nav="common" />
          </Route>
          <Route exact path="/product/list/faulty">
            <Home title="faulty-product-list" nav="common" />
          </Route>
          <Route exact path="/product/stocks">
            <Home title="product-stocks" nav="common" />
          </Route>
          <Route exact path="/product/transfer">
            <Home title="product-transfer" nav="common" />
          </Route>
          <Route exact path="/product/statistics">
            <Home title="product-chart" nav="common" />
          </Route>
          <Route exact path="/product/compare">
            <Home title="product-compare" nav="common" />
          </Route>

          {/* Warehouse */}
          <Route exact path="/warehouse/create">
            <Home title="add-warehouse" nav="common" />
          </Route>
          <Route exact path="/warehouse/list">
            <Home title="warehouse-list" nav="common" />
          </Route>
          <Route exact path="/warehouse/edit/:id">
            <Home title="warehouse-edit" nav="common" />
          </Route>
          <Route exact path="/warehouse/statistics">
            <Home title="warehouse-chart" nav="common" />
          </Route>

          {/* Other */}
          <Route exact path="/product/user/leave">
            <Home title="user-leave" nav="common" />
          </Route>
          <Route exact path="/product/user/leave/myrequest">
            <Home title="user-myLeave" nav="common" />
          </Route>
          <Route exact path="/product/user/activities">
            <Home title="user-activities" nav="common" />
          </Route>
          <Route exact path="/product/user/administration">
            <Home title="administration" nav="common" />
          </Route>
          <Route exact path="/product/user/administration/myissue">
            <Home title="administration-myIssues" nav="common" />
          </Route>
          <Route exact path="/product/map">
            <Home title="google-map" nav="common" />
          </Route>

          {/* User */}
          <Route exact path="/product/user/profile">
            <Home title="profile" nav="profile" />
          </Route>
          <Route exact path="/product/user/edit">
            <Home title="profile-edit" nav="profile" />
          </Route>
          <Route exact path="/product/user/edit/profilepicture">
            <Home title="profile-picture-edit" nav="profile" />
          </Route>
          <Route exact path="/product/user/edit/changePassword">
            <Home title="profile-change-password" nav="profile" />
          </Route>
          <Route exact path="/product/user/edit/changePassword/verify">
            <Home title="profile-change-password-verify" nav="profile" />
          </Route>
          {/*FINANCE*/}
          <Route exact path="/signout" component={Signout} />
          <Route exact path="/financedashboard" component={FinanceDashboard} />
          <Route
            exact
            path="/financecustomerinvoice"
            component={FinanceCustomerInvoice}
          />
          <Route
            exact
            path="/financesupplierinvoice"
            component={FinanceSupplierInvoice}
          />
          <Route
            exact
            path="/financenewcustomerinvoice"
            component={FinanceNewCustomer}
          />
          <Route
            exact
            path="/financenewsupplierinvoice"
            component={FinanceNewSupplier}
          />

          <Route
            exact
            path="/financepaymenthistory"
            component={FinancePaymentHistory}
          />
          <Route
            exact
            path="/financecustomerpayment"
            component={FinanceCustomerPayment}
          />
          <Route
            exact
            path="/financesupplierpayment"
            component={FinanceSupplierPayment}
          />

          <Route
            exact
            path="/financefinancialreport"
            component={FinanceFinancialReport}
          />
          <Route
            exact
            path="/financeinvoicereport"
            component={FinanceInvoiceReport}
          />

          <Route exact path="/financeleave" component={FinanceLeave} />
          <Route exact path="/financenewleave" component={FinanceNewLeave} />

          <Route
            exact
            path="/financeimporthistory"
            component={FinanceImportHistory}
          />
          <Route exact path="/financeexport" component={FinanceExport} />
          <Route exact path="/financeimport" component={FinanceImport} />

          <Route exact path="/financebanks" component={FinanceConnectedBank} />
          <Route exact path="/financenewbank" component={FinanceNewBank} />
          <Route exact path="/financexpense" component={FinanceExpense} />
          <Route exact path="/financeasset" component={FinanceAsset} />
          <Route exact path="/financeliability" component={FinanceLiability} />

          <Route exact path="/financeprofile" component={FinanceProfile} />

          {/* HR */}
          <Route exact path="/HR">
            <Navb title="Pie Chart" />
          </Route>
          <Route exact path="/HR/user/create">
            <Navb title="New User" />
          </Route>
          <Route exact path="/HR/user/list">
            <Navb title="User List" />
          </Route>
          <Route exact path="/HR/user/edit/:id">
            <Navb title="Update User" />
          </Route>
          <Route exact path="/HR/employee/create">
            <Navb title="New Employee" />
          </Route>
          <Route exact path="/HR/employee/group">
            <Navb title="New Group" />
          </Route>
          <Route exact path="/HR/employee/list">
            <Navb title="Employee List" />
          </Route>
          <Route exact path="/HR/employee/edit/:employee_id">
            <Navb title="Update Employee" />
          </Route>
          <Route exact path="/HR/employee/delete/:employee_id">
            <Navb title="Delete Employee" />
          </Route>
          <Route exact path="/HR/employee/schedule">
            <Navb title="Employees Schedule" />
          </Route>
          <Route exact path="/HR/leave/request">
            <Navb title="Leave Request" />
          </Route>
          <Route exact path="/HR/leave/pending/list">
            <Navb title="Pending List" />
          </Route>
          <Route exact path="/HR/leave/request/list">
            <Navb title="Leave Request List" />
          </Route>
          <Route exact path="/HR/leave/approve/:id">
            <Navb title="Approved Leave Request" />
          </Route>
          <Route exact path="/HR/leave/reject/:id">
            <Navb title="Reject Leave Request" />
          </Route>
          <Route exact path="/HR/expense/report">
            <Navb title="Expense Report" />
          </Route>
          <Route exact path="/HR/expense/list">
            <Navb title="Expense Report List" />
          </Route>
          <Route exact path="/HR/expense/edit/:id">
            <Navb title="Update Expense Report" />
          </Route>
          <Route exact path="/HR/expense/delete/:id">
            <Navb title="Delete Expense Report" />
          </Route>
          <Route exact path="/HR/expense/statistic">
            <Navb title="Expense Report Statistic" />
          </Route>
          <Route exact path="/HR/user/profile">
            <ProNav title="Profile" />
          </Route>
          <Route exact path="/HR/user/profile/edit">
            <ProNav title="Update Profile" />
          </Route>
          <Route exact path="/HR/user/change/password">
            <ProNav title="Change Password" />
          </Route>
          <Route exact path="/HR/user/upload/image">
            <ProNav title="Upload Image" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
