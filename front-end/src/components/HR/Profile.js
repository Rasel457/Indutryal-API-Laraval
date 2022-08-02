import { useState , useEffect } from 'react';
import { React } from 'react';
import { Table } from 'react-bootstrap';
import { FaUserAlt } from "react-icons/fa";



const Profile=()=>{
    const[profile,setProfile] = useState([]);
    useEffect( async ()=>{
        let result = await fetch("http://127.0.0.1:8000/api/HR/profile/"+localStorage.getItem('username'));
        result = await result.json();
        setProfile(result);
    },[])
    return(
        <>
            <div className="title text-center mb-3">
                <h3 className="font-width-border"><FaUserAlt />Profile</h3>
            </div>
            <hr></hr>
            <br></br>
            <center>
            <img src={`http://127.0.0.1:8000/upload/Users/${profile.profile_pic}`}   width="200" height="200"></img>
            <br></br>   
               
            <Table className="table table-hover w-75">
                <tbody>
                    <tr>
                        <td>First Name</td>
                        <td>{profile.firstname}</td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td>{profile.lastname}</td>
                    </tr>
                    <tr>
                        <td>Job position</td>
                        <td>{profile.position}</td>
                    </tr>
                    
                    <tr>
                        <td>Phone No</td>
                        <td>{profile.phone}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{profile.email}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{profile.address}</td>
                    </tr>
                    </tbody>
            </Table>
            </center>
               
        </>
    )
}
export default Profile;
