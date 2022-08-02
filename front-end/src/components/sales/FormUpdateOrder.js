import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const FormUpdateOrder = () => {

    const[errCusID, setCustID] = useState("")
    const[errDelivered, setDeliv] = useState("")
    const[postMsg, setPostMsg] = useState("")
    const[errDesc, setDesc] = useState("");
    const[errTotal, setTotal] = useState("");
    const[errStatus, setStatus] = useState("");
    const[errType, setType] = useState("");
    const[order, setOrder] = useState({
        customer_id:'',
        total_amount:'',
        status: '',
        type: '',
        order_description: '',
        delivered_on:''
    })

    var parts = window.location.href.split('/');
    var answer = parts[parts.length - 1];

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/sales/order/"+answer)
        .then(
            result=>setOrder(result.data)
        )
        .then(
            
        )
    }, [])

    const handleInputChange = (event) =>{
        const attribute = event.target.name;
        const val = event.target.value
        setOrder({...order, [attribute]:val})
    }

    const handleSubmission = (event) => {
        event.preventDefault()
        if(order.order_description == "")
        {
            setDesc("Required")
        }
        else 
        {
            setDesc("")
        }
        if(order.type == "")
        {
            setType("Required")
        }
        else 
        {
            setType("")
        }
        if(order.total_amount == "")
        {
            setTotal("Required")
        }
        else 
        {
            setTotal("")
        }
        if(order.status == "")
        {
            setStatus("Required")
        }
        else 
        {
            setStatus("")
        }
        console.log(order);
        axios.put("http://127.0.0.1:8000/api/sales/order/"+answer, {
            'customer_id':order.customer_id,
                'total_amount':order.total_amount,
                'status':order.status,
                'delivered_on': order.delivered_on,
                'type': order.type,
                'order_description': order.order_description
            }).then((response)=>{
                setPostMsg("Updated Successfully")
            }).catch(response=>{
                setPostMsg("Failed to update")
            })
    }

    return (
        <div>
            <div>
            <form className="Form" onSubmit={handleSubmission}>
                <div className="Label-Input">
                    <label>Customer ID:</label>
                    <input className="inputBox" type="text" name="customer_id" id="name" value={order.customer_id} onChange={handleInputChange} readOnly />
                    <div className="errMsg">{errCusID}</div>
                </div>
                <div className="Label-Input">
                    <label>Description:</label>
                    <input className="inputBox" type="text" name="order_description" id="name" value={order.order_description} onChange={handleInputChange}/>
                    <div className="errMsg">{errDesc}</div>
                </div>
                <div className="Label-Input">
                    <label>Total Amount:</label>
                    <input className="inputBox" type="text" name="total_amount" value={order.total_amount} onChange={handleInputChange}/>
                    <div className="errMsg">{errTotal}</div>
                </div>
                <div className="Label-Input">
                    <label>Status:</label>
                    <input className="inputBox" type="text" name="status" value={order.status} onChange={handleInputChange}/>
                    <div className="errMsg">{errStatus}</div>
                </div>
                <div className="Label-Input">
                    <label>Type:</label>
                    <input className="inputBox" type="text" name="type" value={order.type} onChange={handleInputChange}/>
                    <div className="errMsg">{errType}</div>
                </div>
                <div className="Label-Input">
                    <label>Delivered On:</label>
                    <input className="inputBox" type="date" name="delivered_on" value={order.delivered_on} onChange={handleInputChange}/>
                    <div className="errMsg">{errDelivered}</div>
                </div>
                <div className="Form-Button">
                    <button type='submit'className="FormBtn">Confirm</button>
                    <Link className="LinkBtn" to="/sales/orders">Go Back</Link>
                </div>
                <label className="postMsg">{postMsg}</label>
                
            </form>
        </div>
        </div>
    )
}

export default FormUpdateOrder
