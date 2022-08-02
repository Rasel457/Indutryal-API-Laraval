import { useHistory} from 'react-router-dom'
import { useState } from 'react';
import { React } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { FaKey } from "react-icons/fa";


const ChangePass=()=>{
    const [errorMessage,setErrorMessage] = useState("");
    const [old_password,setOldPass] = useState("");
    const [new_password,setNewPass] = useState("");
    const [confirm_new_password,setConfirmPass] = useState("");
    const history = useHistory();

    const updatePass = async () =>{
        if(old_password.length===0)
        {
            setErrorMessage("Old password must be required");
        }else if(old_password.length<8)
        {
            setErrorMessage("Old password at least 8 Charecters");
        }
        else if(new_password.length===0)
        {
            setErrorMessage("New password must be required");
        }else if(new_password.length<8)
        {
            setErrorMessage("New password at least 8 Charecters");
        }
        else if(confirm_new_password.length===0)
        {
            setErrorMessage("Confirm Password required");
        }
        else if (new_password!==confirm_new_password)
        {
            setErrorMessage("Password and Confirm password Must be same");
        }
        else{
            await axios.put('http://127.0.0.1:8000/api/HR/change/password/'+localStorage.getItem('username'), {
            old_password,new_password,confirm_new_password
            },{
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
    return(
        <>
            <div className="title text-center mb-3">
                <h3 className="font-width-border"><FaKey />Change Password</h3>
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
                
                <Table className="table table-hover">
                    <tbody>
                        <tr>
                            <td >Old Password: </td>
                            <td > <input type="password" className="form-control" name="old_password" onChange={(e)=>setOldPass(e.target.value)} ></input></td>
                        </tr>
                        <tr>
                            <td >New Password: </td>
                            <td > <input type="password" className="form-control" name="new_password" onChange={(e)=>setNewPass(e.target.value)}></input></td>
                            
                        </tr>
                        <tr>
                            <td >Confirm New Password: </td>
                            <td > <input type="password" className="form-control" name="confirm_new_password" onChange={(e)=>setConfirmPass(e.target.value)}></input> </td>
                            
                        </tr>
                        <tr>
                            <td colspan='2' align='center'>
                                <button onClick={updatePass} type="submit"  className="btn btn-dark">Proced</button>
                            </td>
                        </tr>
                    </tbody>
                </Table>    
           
            </div>
        </>

    
    )
}
export default ChangePass; 