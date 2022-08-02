import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form'

const FormAddOrder = () => {
    const [formData, setFormData] = useState({name:'',
                                             email:'', 
                                             phone:'+88', 
                                             delivery_point:'', 
                                             type:''})
    const [errCusID, setErrCusID] = useState("");
    const [errDesc, setErrDesc] = useState("");
    const [errTotal, setErrTotal] = useState("");
    const [errStatus, setErrStatus] = useState("");
    const [postMsg, setPostMsg] = useState("");
    // const [phoneCode, setPhoneCode] = useState({code:''});

    const handleInputChange = (event) => {
        // const {name, value} = event.target
        setFormData({...formData, [event.target.name]:event.target.value})
    }

    // const handlePhoneCode = (event) => {
    //     console.log(event.target.value)
    //     setPhoneCode({phoneCode, code:event.target.value})
    // }

    const handleSubmission = (event) => {
        event.preventDefault();
        // console.log(/^[a-zA-Z ]*$/.test(formData.name))
        // if(formData.name == "")
        // {
        //     setErrName("Required");
        // }
        // else if(formData.name != "")
        // {
        //     // if(formData.name.toString().match(/^[a-zA-Z ]*$/))
        //     if(!(/^[a-zA-Z ]*$/.test(formData.name)))
        //     {
        //         setErrName("Only alphabets and space are allowed");
        //     }
        //     else
        //     {
        //         setErrName("")
        //     }
        //     // setErrName("");
        // }
        // //email
        // if(formData.email == "")
        // {
        //     setErrEmail("Required")
        // }
        // else if(formData.email != "")
        // {
        //     if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)))
        //     {
        //         setErrEmail("Invalid email address");
        //     }
        //     else
        //     {
        //         setErrEmail("");
        //     }
        // }
        // //phone
        // if(formData.phone == "")
        // {
        //     setErrPhone("Required")
        // }
        // else if(formData.phone != "")
        // {
        //     setErrPhone("");
        // }
        // //Delivery point
        // if(formData.delivery_point == "")
        // {
        //     setErrDeliv("Required")
        // }
        // else if(formData.delivery_point != "")
        // {
        //     setErrDeliv("");
        // }
        // //Type
        // if(formData.type == "")
        // {
        //     setErrType("Required")
        // }
        // else if(formData.type != "")
        // {
        //     setErrType("");
        // }
        // if(errName == errEmail == errPhone == errDeliv == errType == "")
        // {
        //     axios.post("http://127.0.0.1:8000/api/sales/orders", formData)
        //     .then((response)=>{
        //         console.log(response.data)
        //         setPostMsg("Created customer successfully")
        //     })
        //     .catch(
        //         ((err)=>{
        //             if(err.toJSON().message == "Request failed with status code 422")
        //             {
        //                 // setPostMsg("Error 422: Cannot process data to system")
        //             }
        //         })
        //     )
        // }
    }

    return (
        <div>
            <form className="Form" onSubmit={handleSubmission}>
                {/* <div className="Label-Input">
                    <label>Customer ID:</label>
                    <input className="inputBox" type="text" 
                            name="name"
                            placeholder="Enter the customer's name"
                            value={formData.name}
                            onChange={handleInputChange}
                    />
                    <div className="errMsg">{errName}</div>
                </div>
                <div className="Label-Input">
                    <label>Description:</label>
                    <input className="inputBox" type="text"
                            name="email"
                            placeholder="Enter the customer's email"
                            value={formData.email}
                            onChange={handleInputChange}
                    />
                    <div className="errMsg">{errEmail}</div>
                </div>
                <div className="Label-Input">
                    <label>Phone:</label>
                    <input className="phoneBox" name="phone" type="text"
                            placeholder="Enter the customer's phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                    />
                    <div className="errMsg">{errPhone}</div>
                    
                </div>
                <div className="Label-Input">
                    <label>Delivery Location:</label>
                    <input className="inputBox" name="delivery_point" type="text"
                            placeholder="Enter the customer's location"
                            value={formData.delivery_point}
                            onChange={handleInputChange}
                    />
                    <div className="errMsg">{errDeliv}</div>
                </div>
                <div className="Label-Input">
                    <label>Type:</label>
                    <input className="inputBox" name="type" type="text"
                            placeholder="Enter the type of customer"
                            value={formData.type}
                            onChange={handleInputChange}
                    />
                    <div className="errMsg">{errType}</div>
                </div>
                <div className="Form-Button">
                    <button type='submit' className="LinkBtn">Confirm</button>
                </div>
                <label className="postMsg">{postMsg}</label> */}
            </form>
        </div>
    )
}

export default FormAddOrder
