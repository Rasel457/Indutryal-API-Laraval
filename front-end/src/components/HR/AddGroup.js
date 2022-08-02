import { useHistory} from 'react-router-dom'
import { useState } from 'react';
import { React } from 'react';
import axios from 'axios';
import { FaUsers } from "react-icons/fa";


const AddGroup=()=>{
    const [errorMessage,setErrorMessage] = useState("");
    const [employee_id,setEmployeeId] = useState("");
    const [employee_group,setGroup] = useState("");
    const history = useHistory();

    const addGroup = async () => {
        if(employee_id.length===0)
        {
            setErrorMessage("Please Enter your Id");
        }
        else if(employee_group.length===0){
            setErrorMessage("Please select group");
        }
        else{
            await axios.post('http://127.0.0.1:8000/api/HR/employee/group', {
            employee_id,employee_group
            
            },{
                headers: {
                    'ContentType': 'application/json'
                }
            }).then((response)=>{
                console.log(response.data);
                history.push('/HR/employee/list');
            });
       
        }
        
    }
    return(
        <>
            <div className="title text-center mb-3">
                <h3 className="font-width-border"><FaUsers/>New Group</h3>
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
                    <label >Employee ID</label> 
                    <input type="number" className="form-control" id="lastname" name="employee_id" onChange={(e)=>setEmployeeId(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Group</label>
                        <select name="employee_group" id="group" className="form-select" onChange={(e)=>setGroup(e.target.value)}>
                            <option>Please Select Group </option>
                            <option value="HR">Human Resource Department</option>
                            <option value="product">Product Department</option>
                            <option value="finance">Finance Department</option>
                            <option value="sales">Sales Department </option>
                        </select>
                </div>
                <div>
                    <center> <button onClick={addGroup} className="btn btn-outline-success btn-block w-25 mt-3 "  type="submit">Add</button></center>
                </div>
               
            </div>
        </>
    )
}
export default AddGroup;