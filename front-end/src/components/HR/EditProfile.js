import { useHistory} from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserEdit } from "react-icons/fa";


const EditProfile=()=>{
    const [errorMessage,setErrorMessage] = useState("");
    const [firstname,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const history = useHistory();
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/HR/profile/"+localStorage.getItem('username'))
        .then(function (response) {
            const result = response.data;
            setFirstName(result.firstname);
            setLastName(result.lastname);
            setEmail(result.email);
            setPhone(result.phone);
            setAddress(result.address);
        });
    },[])
    const updatedProfile=async () =>{
        if(firstname.length===0)
        {
            setErrorMessage("Please Enter your first name");
        }else if(lastname.length===0){
            setErrorMessage("Please Enter your last name");
        }else if(email.length===0){
            setErrorMessage("Please Enter Your valid email address");
        }
        else if(phone.length===0){
            setErrorMessage("Please enter your phone number");
        }
        else if(phone.length<11){
            setErrorMessage("Phone length must be 11 charecter");
        }
        else if(!Number(phone))
        {
            setErrorMessage("Phone must be number");
        }
        else if(address.length===0){
            setErrorMessage("Address Can't be empty");
        }else{
            await axios.put('http://127.0.0.1:8000/api/HR/profile/update/'+localStorage.getItem('username'),{
            firstname,
            lastname,
            email,
            phone,
            address
            
            },{
                headers: {
                    'ContentType': 'application/json'
                }
            }).then((response)=>{
                console.log(response.data);
                history.push('/HR/user/profile');
            });
        }
    }
    return(
        <>
        <div className="title text-center mb-3">
            <h3 className="font-width-border"><FaUserEdit />Update Profile</h3>
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
       
        <div className="w-50  m-auto">
            <div className="form-group">
                <label>First Name</label> 
                <input type="txt" class="form-control" id="firstname" name="firstname" value={firstname} onChange={(e)=>setFirstName(e.target.value)}></input>
            </div>
            <div className="form-group">
                <label >Last Name</label> 
                <input type="txt" class="form-control" id="lastname" name="lastname" value={lastname} onChange={(e)=>setLastName(e.target.value)}></input>
            </div>
            
            <div className="form-group">
                <label>Phone</label>
                <input type="text" class="form-control"  name="phone" id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}></input>
            </div>
            <div className="from-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="EmailId" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            </div>
            <div className="foem-group">
                <label>Present address</label>
                <input type="text" class="form-control" id="presentaddress" name="address" value={address} onChange={(e)=>setAddress(e.target.value)}></input>
            </div>
            <div className="from-group">
                <center><button onClick={updatedProfile} class="btn btn-outline-primary btn-block w-50 mt-3" type="submit" >Update</button></center>
            </div>
        </div>
    </>
    )
}
export default EditProfile;