import { useEffect, useState } from 'react'

import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Profile = () => {

    const [user, setUser] = useState("")
    const [photo, setPhoto] = useState("")

    const id = '2';

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/sales/user/"+id)
            .then(result=>{
                setUser(result.data);
            })
            .catch((error)=>{
                // setError("failed");
            }
        ); 
        console.log(user);

        // axios.get("http://127.0.0.1:8000/api/sales/user/propic/"+id,{
        //     responseType: ArrayBuffer
        // })
        //     .then(photo=>{ 
        //         setPhoto(photo);
        //     })
        //     .catch((error)=>{
        //         // setError("failed"); 
        //     }
        // ); 
        //     console.log((photo.data));
    }, [])

    return (
        <div className="profile">
            <div className="profilePic">
                {/* <img src={window.URL.createObjectURL(new Blob(photo.data), {type: "image/jpeg"})} alt="Image not found"/> */}
                {/* <img src={`{data:image/jpeg;base64;${photo.data}}`} alt="Image not found"/> */}
                <img src={`http://127.0.0.1:8000/api/sales/user/propic/${id}`} height="200px" alt="image not found"/>
            </div>
            <div className="mainProfileContainer">
                <div className="mainProfileLabels">
                    <label>Name:</label>
                    <label>Username:</label>
                    <label>Email:</label>
                    <label>Phone:</label>
                    <label>Address:</label>
                    <label>Position:</label>
                    <label>Work Hours:</label>
                </div>
                <div className="mainProfileData">
                    <label>{user.firstname+" "+user.lastname}</label>
                    <label>{user.username}</label>
                    <label>{user.email}</label>
                    <label>{user.phone}</label>
                    <label>{user.address}</label>
                    <label>{user.position}</label>
                    <label>{user.work_hour}</label>
                </div>
            </div>
            <div>
                <Link className="LinkBtn" to="/sales/profile/update">Edit Profile</Link>
                <Link className="LinkBtn" to="/sales/profile/changepassword">Change Password</Link>
                <Link className="LinkBtn" to="/sales/user/update">Delete Account</Link>
            </div>
        </div>
    )
}

export default Profile
