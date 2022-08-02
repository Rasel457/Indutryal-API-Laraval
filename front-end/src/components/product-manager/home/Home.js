import Header from "../screens/Header";
import SideNavbar from "../screens/SideNavbar";
import Footer from "../screens/Footer";
import Dashboard from "./Dashboard";
import AddProduct from "../product-channel/AddProduct";
import ProductList from "../product-channel/ProductList";
import EditProduct from "../product-channel/EditProduct";
import FaultyProductList from "../product-channel/FaultyProductList";
import Stocks from "../product-channel/Stocks";
import AddWarehouse from "../warehouse-channel/AddWarehouse";
import WarehouseList from "../warehouse-channel/WarehouseList";
import EditWarehouse from "../warehouse-channel/EditWarehouse";
import LeaveRequest from "../other-channel/LeaveRequest";
import MyLeaveRequest from "../other-channel/MyLeaveRequest";
import ActivityList from "../other-channel/ActivityList";
import Administration from "../other-channel/Administration";
import MyAdministrationIssue from "../other-channel/MyAdministrationIssue";
import TransferProduct from "../product-channel/TransferProduct";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProfileSideNavbar from "../screens/ProfileSideNavbar";
import Profile from "../user-channel/Profile";
import EditProfile from "../user-channel/EditProfile";
import EditProfilePicture from "../user-channel/EditProfilePicture";
import Chart from "../product-channel/Chart";
import WarehouseChart from "../warehouse-channel/WarehouseChart";
import ChangePassword from "../user-channel/ChangePassword";
import VerifyPassword from "../user-channel/VerifyPassword";
import CompareProduct from "../product-channel/CompareProduct";
import GoogleMap from "../other-channel/GoogleMap";

const Home = ({ title, nav }) => {
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      history.push("/");
    }
  }, []);

  return (
    <>
      <Header></Header>

      <br></br>
      <br></br>
      <br></br>

      <div>
        <div className="row mt-2 justify-content-around">
          {nav === "profile" ? (
            <ProfileSideNavbar></ProfileSideNavbar>
          ) : (
            <SideNavbar></SideNavbar>
          )}

          {(() => {
            if (title === "dashboard") {
              return <Dashboard></Dashboard>;
            } else if (title === "add-product") {
              return <AddProduct></AddProduct>;
            } else if (title === "product-list") {
              return <ProductList></ProductList>;
            } else if (title === "product-edit") {
              return <EditProduct></EditProduct>;
            } else if (title === "faulty-product-list") {
              return <FaultyProductList></FaultyProductList>;
            } else if (title === "product-stocks") {
              return <Stocks></Stocks>;
            } else if (title === "product-transfer") {
              return <TransferProduct></TransferProduct>;
            } else if (title === "add-warehouse") {
              return <AddWarehouse></AddWarehouse>;
            } else if (title === "warehouse-list") {
              return <WarehouseList></WarehouseList>;
            } else if (title === "warehouse-edit") {
              return <EditWarehouse></EditWarehouse>;
            } else if (title === "user-leave") {
              return <LeaveRequest></LeaveRequest>;
            } else if (title === "user-myLeave") {
              return <MyLeaveRequest></MyLeaveRequest>;
            } else if (title === "user-activities") {
              return <ActivityList></ActivityList>;
            } else if (title === "administration") {
              return <Administration></Administration>;
            } else if (title === "administration-myIssues") {
              return <MyAdministrationIssue></MyAdministrationIssue>;
            } else if (title === "profile") {
              return <Profile></Profile>;
            } else if (title === "profile-edit") {
              return <EditProfile></EditProfile>;
            } else if (title === "profile-picture-edit") {
              return <EditProfilePicture></EditProfilePicture>;
            } else if (title === "product-chart") {
              return <Chart></Chart>;
            } else if (title === "warehouse-chart") {
              return <WarehouseChart></WarehouseChart>;
            } else if (title === "profile-change-password") {
              return <ChangePassword></ChangePassword>;
            } else if (title === "profile-change-password-verify") {
              return <VerifyPassword></VerifyPassword>;
            } else if (title === "product-compare") {
              return <CompareProduct></CompareProduct>;
            } else if (title === "google-map") {
              return <GoogleMap></GoogleMap>;
            }
          })()}
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Home;
