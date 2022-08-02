import { useHistory} from 'react-router-dom'
import { useState , useEffect } from 'react';
import { React } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import { FaAddressBook } from "react-icons/fa";

const UserList=()=>{
    const history = useHistory();
    const [errorMessage,setErrorMessage] = useState("");
    const[searchUser,setSearchUser] = useState('');
    const[list,setList] = useState([]);
    useEffect( async ()=>{
        let result = await fetch("http://127.0.0.1:8000/api/HR/user/list");
        result = await result.json();
        setList(result);
    },[])

    function search()
    {
        if(searchUser.length===0)
        {
            setErrorMessage("Please Enter User name for search");
        }
        else{
            axios.get("http://127.0.0.1:8000/api/HR/user/search/"+searchUser)
           .then(function (response) {
            const result = response.data;
            setList(result);
            setErrorMessage("");
            });
        }
        
    }


    function deleteUser(id)
    {
        if(window.confirm('Are you sure?'))
        {
            fetch('http://127.0.0.1:8000/api/HR/user/delete/'+id, {
            method: 'DELETE',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
            })
            history.go(0);
        }
    }
    return(
        <>
        <div className="text-center mb-3">
            <h3 className="font-width-border"><FaAddressBook /> User List</h3>
        </div>
        <hr></hr>
        {errorMessage && (
            <center>
              {" "}
              <div class="alert alert-danger col-5" role="alert">
                {errorMessage}
              </div>{" "}
            </center>
        )}
        <div className="input-group">
            <input className="form-control"type="text" placeholder="Find By Username..." name="search" onChange={(e)=>{setSearchUser(e.target.value)}}></input>
            <div className="input-group-append">
                <button onClick={search} type="submit" className="btn btn-success">Search</button>
            </div>
        </div>
        <Table  className="table table-hover" size="sm" responsive="sm">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>User Name</th>
                    <th>Gender</th>
                    <th>User Type</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Job Position</th>
                    <th>Image</th>
                   {/*  <th>Employment Start date</th> */}
                    <th>Action</th>
                </tr>    
            </thead>
            <tbody>
                {
                    list.map((user)=>
                        <tr>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.username}</td>
                            <td>{user.gender}</td>
                            <td>{user.type}</td>
                            <td>{user.address}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.position}</td>
                             <td>
                             <img src={`http://127.0.0.1:8000/upload/Users/${user.profile_pic}`} alt="profile"  width="100" height="100"></img>
                            </td> 
                           {/*  <td>{user.created_at}</td> */}
                            
                            <td>
                                <Link to={`/HR/user/edit/${user.id}`} className='btn btn-primary btn-block mx-2 m-1'> Edit </Link>
                                <button onClick={()=>deleteUser(user.id)} className='btn btn-danger btn-block m-1'>Delete</button>
                        
                            </td>
                        </tr>
                    )
                }
                
            </tbody>
        </Table>
        </>
    )
}
export default UserList;