import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const FormUpdateUser = () => {
    const[user, setUser] = useState({firstname:1,
                                    lastname:1, 
                                    username:1, 
                                    email:1,
                                    phone:1, 
                                    address:1,
                                    position:1,
                                    work_hour:1})
    const [errFirstName, setErrFirstName] = useState("");
    const [errLastName, setErrLastName] = useState("");
    const [errUsername, setErrUsername] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPhone, setErrPhone] = useState("");
    const [errAddr, setErrAddr] = useState("");
    const [errPos, setErrPos] = useState("");
    const [errWorkHour, setErrWorkHour] = useState("");
    const [postMsg, setPostMsg] = useState("");

    const handleInputChange = (event) =>{
        const attribute = event.target.name;
        const val = event.target.value
        setUser({...user, [attribute]:val})
    }

    // var parts = window.location.href.split('/');
    // var answer = parts[parts.length - 1];

    const id = 2;
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/sales/user/"+id)
            .then(
                result=>setUser(result.data)
            )
            .then(
                
            )
    }, [])

    const handleSubmission = (event) => {
        event.preventDefault();
        //firstname
        if(user.firstname == "")
        {
            setErrFirstName("Required")
        }
        else if(user.firstname != "")
        {
            if(!(/^[a-zA-Z ]*$/.test(user.firstname)))
            {
                setErrFirstName("Only alphabets and space are allowed");
            }
            else
            {
                setErrFirstName("")
            }
        }
        //lastname
        if(user.lastname == "")
        {
            setErrLastName("Required")
        }
        else if(user.lastname != "")
        {
            if(!(/^[a-zA-Z ]*$/.test(user.lastname)))
            {
                setErrLastName("Only alphabets and space are allowed");
            }
            else
            {
                setErrLastName("")
            }
        }
        //username
        if(user.username == "")
        {
            setErrUsername("Required")
        }
        else if(user.username != "")
        {
            if(!(/^[a-zA-Z0-9]*$/.test(user.username)))
            {
                setErrUsername("Only alphanumeric characters are allowed");
            }
            else
            {
                setErrUsername("")
            }
        }
        //email
        if(user.email == "")
        {
            setErrEmail("Required")
        }
        else if(user.email != "")
        {
            if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)))
            {
                setErrEmail("Invalid email address");
            }
            else
            {
                setErrEmail("");
            }
        }
        //phone
        if(user.phone == "")
        {
            setErrPhone("Required")
        }
        else if(user.phone != "")
        {
            setErrPhone("");
        }
        //Delivery point
        if(user.position == "")
        {
            setErrPos("Required")
        }
        else if(user.position != "")
        {
            setErrPos("");
        }
        if(user.work_hour == "")
        {
            setErrWorkHour("Required")
        }
        else if(user.work_hour != "")
        {
            setErrWorkHour("");
        }
        if(errFirstName == errLastName == errEmail == errPhone == errPos == errWorkHour == errUsername == "")
        {
            axios.put("http://127.0.0.1:8000/api/sales/user/"+id, user)
            .then((response)=>{
                console.log(response.data)
                setPostMsg("Updated user successfully")
            })
            .catch(
                ((err)=>{
                    if(err.toJSON().message == "Request failed with status code 422")
                    {
                        // setPostMsg("Error 422: Cannot process data to system")
                    }
                })
            )
            console.log(user)
        }
        // console.log(user)
        // console.log(event)
    }

    return (
        <div>
            <form className="Form" onSubmit={handleSubmission}>
                <div className="Label-Input">
                    <label>First Name:</label>
                    <input className="inputBox" type="text" name="firstname"value={user.firstname} onChange={handleInputChange}/>
                    <div className="errMsg">{errFirstName}</div>
                </div>
                <div className="Label-Input">
                    <label>Last Name:</label>
                    <input className="inputBox" type="text" name="lastname"value={user.lastname} onChange={handleInputChange}/>
                    <div className="errMsg">{errLastName}</div>
                </div>
                <div className="Label-Input">
                    <label>Username:</label>
                    <input className="inputBox" type="text" name="username" value={user.username} onChange={handleInputChange}/>
                    <div className="errMsg">{errUsername}</div>
                </div>
                <div className="Label-Input">
                    <label>Email:</label>
                    <input className="inputBox" type="text" name="email" value={user.email} onChange={handleInputChange}/>
                    <div className="errMsg">{errEmail}</div>
                </div>
                <div className="Label-Input">
                    <label>Phone:</label>
                    <input className="inputBox" type="text" name="phone" value={user.phone} onChange={handleInputChange}/>
                    <div className="errMsg">{errPhone}</div>
                </div>
                <div className="Label-Input">
                    <label>Address:</label>
                    <input className="inputBox" type="text" name="address" value={user.address} onChange={handleInputChange}/>
                    <div className="errMsg">{errAddr}</div>
                </div>
                <div className="Label-Input">
                    <label>Position:</label>
                    <input className="inputBox" type="text" name="delivery_point"value={user.position} onChange={handleInputChange}/>
                    <div className="errMsg">{errPos}</div>
                </div>
                <div className="Label-Input">
                    <label>Work Hours:</label>
                    <input className="inputBox" type="text" name="work_hour"value={user.work_hour} onChange={handleInputChange}/>
                    <div className="errMsg">{errWorkHour}</div>
                </div>
                <div className="Form-Button">
                    <button type='submit'className="FormBtn">Confirm</button>
                    <Link className="LinkBtn" to="/sales/profile/user">Go Back</Link>
                </div>
                <label className="postMsg">{postMsg}</label>
                
            </form>
        </div>
    )
}

export default FormUpdateUser
