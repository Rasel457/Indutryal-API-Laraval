import React from 'react'
import { Link } from 'react-router-dom'

const SubMenuOrder = () => {
    return (
        <div id="SubMenu">
            <div className="SubLinkContainer">
                <Link className="SubLink" to="/sales/orders/">
                    All Orders
                </Link>
            </div>
            <div className="SubLinkContainer">
                <Link className="SubLink" to="/sales/order/add/">
                    Add Order
                </Link>
            </div>
            {/* <div className="Option">
                <Link>
                    Banned Customers
                </Link>
            </div> */}
        </div>

    )
}

export default SubMenuOrder
