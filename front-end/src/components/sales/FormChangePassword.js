import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const FormChangePassword = () => {

    const[currentPass, setCurrent] = useState("")
    const[newPass, setNew] = useState("")
    const[confirmPass, setConfirm] = useState("")
    const[postMsg, setPostMsg] = useState("")
    const[formData, setPassword] = useState({
        current:'',
        new:'',
        confirm:''
    })

    const id = 2;

    const handleInputChange = (event) => {
        // setCurrent(currentPass)
        // setNew(newPass)
        // setConfirm(event.target[0].)
        setPassword({...formData, [event.target.name]:event.target.value})
        // console.log(formData)
    }

    const handleSubmission = (event) => {
        event.preventDefault();
        if(formData.current == "")
        {
            setCurrent("Please enter current password");
        }
        else if(formData.current != "")
        {
            if(formData.new == "")
            {
                setNew("Please suggest a new password")
            }
            if(formData.confirm == "")
            {
                setConfirm("Must enter this field")
            }
            if(formData.new != "")
            {
                setNew("")
                if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9]).{8,}$/.test(formData.new)))
                {
                    console.log(formData.new)
                    setNew("Minimum 8 characters, at least one uppercase and one lowercase letter, and one number")
                }
                else
                {
                    console.log("here-1")
                    setNew("")
                    if(!(formData.new == formData.confirm))
                    {
                        setConfirm("Passwords must match")
                    }
                    else
                    {
                        setConfirm("")
                        console.log("ok")
                        const check = ""
                        axios.post("http://127.0.0.1:8000/api/sales/user/", {
                            'id':id,
                            'pass':formData.current
                        }).then((response) => {
                            if(response.data == "matched")
                            {
                                // check = "pass"
                                console.log("Do this")
                                setCurrent("")
                                axios.put("http://127.0.0.1:8000/api/sales/password",{
                                    'id':id,
                                    'pass':formData.new
                                    }).then((response) => {
                                        if(response.data)
                                        {
                                            // check = "pass"
                                            console.log("Do this")
                                            // setCurrent("")
                                            setPostMsg("Updated password successfully")
                                        }
                                        else if(response.data == "unmatched")
                                        {
                                            // check = ""
                                            // setCurrent("Password is invalid");
                                            setPostMsg("Failed to update password")
                                        }
                                    }).catch((response)=>{
                                        console.log(response)
                                    })

                            }
                            else if(response.data == "unmatched")
                            {
                                // check = ""
                                setCurrent("Password is invalid");
                            }
                        }).catch((response)=>{
                            console.log(response)
                        }
                        )

                        // if(check == "pass")
                        // {
                            
                        // }
                        }
                }
            }
            
        }
    }

    return (
        <div>
            <form className="Form" onSubmit={handleSubmission}>
                <div className="Label-Input">
                    <label>Current Password:</label>
                    <input className="inputBox" type="password" name="current"value={formData.current} onChange={handleInputChange}/>
                    <div className="errMsg">{currentPass}</div>
                </div>
                <div className="Label-Input">
                    <label>New Password:</label>
                    <input className="inputBox" type="password" name="new"value={formData.new} onChange={handleInputChange}/>
                    <div className="errMsg">{newPass}</div>
                </div>
                <div className="Label-Input">
                    <label>Confirm:</label>
                    <input className="inputBox" type="password" name="confirm" value={formData.confirm} onChange={handleInputChange}/>
                    <div className="errMsg">{confirmPass}</div>
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

export default FormChangePassword
