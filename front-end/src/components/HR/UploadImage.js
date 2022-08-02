import { useHistory} from 'react-router-dom'
import { useState } from 'react';
import { React } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";



const UploadImage=()=>{
    const [errorMessage,setErrorMessage] = useState("");
    const [profile_pic,setPhoto] = useState("");
    const [current_password,setCurrentPass] = useState("");
    const history = useHistory();

    const updateImage = async () =>{
        if(profile_pic.length===0)
        {
            setErrorMessage("Upload image must be required");
        }else if(current_password.length===0)
        {
            setErrorMessage("Current Password required");
        }else if(current_password.length<8)
        {
            setErrorMessage("Current password at least 8 Charecters");
        }
        else{
            const formData = new FormData();
            formData.append("profile_pic",profile_pic);
            formData.append("current_password",current_password);
            await axios.post('http://127.0.0.1:8000/api/HR/upload/image/'+localStorage.getItem('username'),formData,{
                headers: {
                    'ContentType': 'application/json'
                }
            }).then((response)=>{
                console.log(response.data);
                if(response.data === 'Password not match'){
                    setErrorMessage("Password mismatch")
                }else{
                    history.push('/HR/user/profile');
                }
                
            });
            
        }
    } 
    return (
        <>
            <div className="title text-center mb-3">
                <h3 className="font-width-border"><FaEdit />Upload Profile Picture</h3>
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
            <div className="w-50 m-auto">
                <div className="from-group">
                    <td>Upload Image: </td>
                    <td colSpan='3'>
                    <input type="file" name="profile_pic" onChange={(e)=>setPhoto(e.target.files[0])}></input>
                    </td>
                </div>
                <br></br>
                <div className="from-group">    
                    <label >Current Password</label>
                    <input type="password" className="form-control" name="current_password" onChange={(e)=>setCurrentPass(e.target.value)} ></input>
                </div>
                <br></br>
                <div className="from-group" >
                    <center><button  onClick={updateImage}  type="submit" class="btn btn-dark" >Upload</button></center>    
                </div>
             </div>
        
        </>

    )
}
export default UploadImage;