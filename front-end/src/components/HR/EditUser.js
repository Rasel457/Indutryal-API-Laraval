import { useHistory, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserEdit } from "react-icons/fa";


const EditUser=()=>{
    const [errorMessage,setErrorMessage] = useState("");
    const [firstname,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [username,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [gender,setGender] = useState("");
    const [position,setPosition] = useState("");
    const [type,setType] = useState("");
    const [pass,setPassword] = useState("");
    const [confirm_password,setConfirmPassword] = useState("");
    const [work_hour,setHour] = useState("");
    const history = useHistory();
    const {id:eid} = useParams();

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/HR/user/"+eid)
        .then(function (response) {
            const result = response.data;
            setFirstName(result.firstname);
            setLastName(result.lastname);
            setUserName(result.username);
            setEmail(result.email);
            setPhone(result.phone);
            setAddress(result.address);
            setGender(result.gender);
            setPosition(result.position);
            setType(result.type);
            setPassword(result.pass);
            setHour(result.work_hour);
        });
    },[])
    const updatedUser = async () => {
        if(firstname.length===0)
        {
            setErrorMessage("Please Enter your first name");
        }else if(lastname.length===0){
            setErrorMessage("Please Enter your last name");
        }else if(username.length===0){
            setErrorMessage("Please Enter your user name");
        }
        else if(pass.length===0)
        {
            setErrorMessage("Password must berequired");
        }else if(pass.length<8)
        {
            setErrorMessage("Password at least 8 Charecters");
        }
        else if(confirm_password.length===0)
        {
            setErrorMessage("Confirm Password required");
        }
        else if(pass!==confirm_password)
        {
            setErrorMessage("Password and Confirm password Must be same");
        }
        else if(gender.length===0)
        {
            setErrorMessage("Please select your gender");
        }
        else if(type.length===0)
        {
            setErrorMessage("User type required");
        }
        else if(address.length===0){
            setErrorMessage("Address Can't be empty");
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
        else if(email.length===0){
            setErrorMessage("Please Enter Your valid email address");
        }
        else if(position.length===0)
        {
            setErrorMessage("Enter your job position");
        }
        
        else if(work_hour.length===0)
        {
            setErrorMessage("Hour work Can't be empty");
        }else if(!Number(work_hour))
        {
            setErrorMessage("Hour work must be a number");
        }else{
            await axios.put('http://127.0.0.1:8000/api/HR/user/update/'+eid,{
            firstname,
            lastname,
            username,
            email,
            phone,
            address,
            gender,
            position,
            type,
            pass,
            work_hour
            },{
                headers: {
                    'ContentType': 'application/json'
                }
            }).then((response)=>{
                console.log(response.data);
                history.push('/HR/user/list');
            });
       
        }
        
    }
    const gen=["male","female"];
    return(
        <>
            <div className="title text-center mb-3">
                <h3 className="font-width-border"><FaUserEdit/> Update User </h3>
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
            <div className=" w-50  m-auto">
    
                <div className="form-group">
                    <label>First Name</label> 
                    <input type="txt" className="form-control" id="firstname" name="firstname" value={firstname} onChange={(e)=>setFirstName(e.target.value)} ></input>
                </div>    
                <div className="form-group">
                    <label >Last Name</label> 
                    <input type="txt" className="form-control" id="lastname" name="lastname" value={lastname} onChange={(e)=>setLastName(e.target.value)}></input>
                </div>
                <div className="from-group">
                    <label>User Name</label>
                    <input type="text" className="form-control" name="username" id="uname" value={username}onChange={(e)=>setUserName(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input type="password" className="form-control"  name="pass" id="password" value={pass} onChange={(e)=>setPassword(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Confirm password</label>
                    <input type="password" className="form-control"  name="confirm_password" id="password" onChange={(e)=>setConfirmPassword(e.target.value)}></input>
                </div>
                <div className="from-group">
                    <label>Gender </label><br></br>
                    {  
                        gen.map(result=>(
                            <>
                            <input type="radio" name="gender" value={result} onChange={(e)=>setGender(e.target.value)} value={gender}></input>
                            <b>{result}</b>
                            </>
                        ))
                    }
                </div>
                
                <div className="form-group">
                    <label>User Type</label>
                        <select name="type" id="super" class="form-control" value={type} onChange={(e)=>setType(e.target.value)}>
                        <option >Please Select</option>    
                        <option value="product">Product manager</option>
                        <option value="hr">HR manager</option>
                        <option value="finance">Finance manager</option>
                        <option value="sales">Sales manager</option>
                        </select>
                </div>
                <div className="foem-group">
                    <label>Present address</label>
                    <input type="text" className="form-control" id="presentaddress" name="address" value={address} onChange={(e)=>setAddress(e.target.value)}></input>
                </div>
                <div className="from-group">
                    <label>Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value={phone} onChange={(e)=>setPhone(e.target.value)}></input>
                </div>
                <div className="from-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="EmailId" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <div className="from-group">
                    <label>Job Position</label> 
                    <input type="txt" className="form-control" id="position" name="position" value={position} onChange={(e)=>setPosition(e.target.value)}></input>
                </div>
                <div class="form-group">
                    <label>Hour Worked(Per week)</label> 
                    <input type="txt" class="form-control" id="worked" name="work_hour" value={work_hour} onChange={(e)=>setHour(e.target.value)}></input>
                </div>
                <br></br>
                <div className="from-group">
                    <center><button onClick={updatedUser} className="btn btn-outline-primary btn-block w-50 mt-3" type="submit">Update</button></center>
                </div>
            </div>
        </>
    )
}
export default EditUser;

