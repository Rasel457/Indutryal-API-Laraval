import axios from 'axios';
import { useState,useEffect } from 'react';
import React from 'react'
import { Link } from 'react-router-dom';

const TableProduct = () => {
    const[items, setItems] = useState([]);
    const[error, setError] = useState();
    const[itemslist, setItemsList] = useState([])
    const[customer, setCustomer] = useState("")
    const[total, setTotal] = useState("")
    const[description, setDesc] = useState("")
    const[message, setMessage] = useState("")

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/sales/products/all")
            .then(response=>{
                setItems(response.data)
                setError("success");
            })
            .catch((error)=>{
                setError("failed");
            }
            );            
    }, [])

    const onCheck = (event) => {
        // console.log(event.target.value)
        setItemsList([...itemslist, event.target.value])
        console.log(itemslist.map(i=>Number(i)))
        console.log(itemslist.map(i=>Number(i)).reduce(function(a,b){
            return a+b;
        },0))
        setTotal(itemslist.map(i=>Number(i)).reduce(function(a,b){
            return a+b;
        },0))
    }

    // console.log(itemslist)
    

    var parts = window.location.href.split('/');
    var answer = parts[parts.length - 1];

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/sales/customers/"+answer)
        .then(response=>{
            // console.log(customer)
            setCustomer(response.data)
        })
    }, [])

    const handleSubmission = (event) => {
        axios.post("http://127.0.0.1:8000/api/sales/orders/",{
            'customer_id':customer.id,
            'total_amount':total,
            'status':'Processing',
            'type':'normal',
            'order_description':description
        }).then(response=>{
            setMessage("Order added")
            console.log(response)
        }).catch(response=>{
            setMessage("Failed");
            console.log(response)
        })
    }

    const descInput = (event) => {
        setDesc(event.target.value)
        console.log(description)
    }

    return (
        <div>
            <div style={{display:"flex", flexDirection:"column"}}>
            <div>Customer Name: {customer.name}</div>
            <div>Customer ID: {customer.id}</div>
                <div>
                    <input onChange={descInput} value={description} type="text" name="description"/>
                    <button className="LinkBtn" onClick={handleSubmission}>Checkout</button>
                    <label>{message}</label>
                </div>
            </div>
            <table className="CusTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        error=="failed"
                        ?
                        <tr><td colSpan="5">Failed to Load</td></tr>
                        :
                        items == false
                        ?
                        <tr><td colSpan="5">Loading</td></tr>
                        :
                        items.length>0
                        ?
                        items.map(prod=>{
                            return (
                                <tr key={prod.id}>
                                    <td>{prod.id}</td>
                                    <td>{prod.product_name}</td>
                                    <td>{prod.product_description}</td>
                                    <td>{prod.selling_price}</td>
                                    <td>{prod.stock}</td>
                                    <td>
                                        {/* <input name="quantity" value={} style={{width:"40px"}} type="numeric"/> */}
                                        <input name={prod.id} value={prod.selling_price} onChange={onCheck} type="checkbox"/>
                                    </td>
                                    {/* <td>{prod.delivery_point}</td> */}
                                    {/* <td>{prod.first_purchase}</td>
                                    <td>{prod.type}</td> */}
                                    {/* <td className="btnCell"><Link className="UpdateBtn" to={'/sales/customer/update/'+prod.id}>Update</Link></td> */}
                                    {/* <td className="btnCell"><button className="DeleteBtn" onClick={}>Delete</button></td> */}
                                </tr>
                            );
                        })
                        :
                        <tr><td colSpan="7">No such  exists</td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableProduct
