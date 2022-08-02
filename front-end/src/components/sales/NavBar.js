import React from 'react'
import {Link} from 'react-router-dom'
// import logo from '../../public/images/logo.png'

const NavBar = () => {
    return (
        <div className="NavBar">
            <div className="NavIcon">
                <Link className="" to="/sales/">
                    <img src="/../../images/logo.png" height="40px" alt="Image not found"/>
                </Link>
            </div>
            <div className="NavLinkContainer">
                <Link className="NavLink" to="/sales">Home</Link>
            </div>
            <div className="NavLinkContainer">
                <Link className="NavLink" to="/sales/orders">Orders</Link>
            </div>
            <div className="NavLinkContainer">
                <Link className="NavLink" to="/sales/customers">Customers</Link>
            </div>
            <div className="NavLinkContainer">
                <Link className="NavLink" to="/sales/statistics">Stats</Link>
            </div>
            <div className="NavLinkContainer">
                <Link className="NavLink" to="/sales/emails/all">Emails</Link>
            </div>
            <div className="NavLinkContainer">
                <Link className="NavLink" to="/sales/leaverequest">Leave Request</Link>
            </div>
            <div className="NavLinkContainer">
                <Link className="NavLink" to='/sales/profile/user'>User</Link>
            </div>
        </div>
    )
}

export default NavBar
