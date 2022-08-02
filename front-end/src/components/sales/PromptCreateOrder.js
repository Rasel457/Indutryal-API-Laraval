import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const PromptCreateOrder = () => {

    const[errMsg, setErr] = useState("")

    const handleSubmission = (event) =>{
        event.preventDefault()
        console.log(event.target[0].value)
        axios.get("http://127.0.0.1:8000/api/sales/customers/"+event.target[0].value)
            .then(result=>{
                if(result.data != "")
                {
                    window.location.href="http://localhost:3000/sales/order/place/"+result.data.id;
                }
                else
                {
                    console.log(result)
                    setErr("No customer found")
                }
            })
    }

    return (
        <div className="PromptContainer">
            <div class="PromptText">Would you like to place an order for an existing customer?</div>
            <div className="PromptSubContainer">
                <div className="PromptLeft">
                    <div className="YesNo">Yes</div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <form onSubmit={handleSubmission}>
                            <input name="cusid" type="numeric"/><br/>
                            <button className="LinkBtn" type="submit">Enter ID</button><br/>
                            <label>{errMsg}</label>
                        </form>
                    </div>
                </div>
                <div className="PromptRight">
                    <div className="YesNo">No</div>
                    <div><Link to="/sales/customer/add"class="LinkBtn">Create New</Link></div>
                </div>
            </div>
        </div>
    )
}

export default PromptCreateOrder
