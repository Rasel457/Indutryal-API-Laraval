import { useHistory} from 'react-router-dom'
import { useState } from 'react';
import { React } from 'react';
import axios from 'axios';
import { FaUserPlus } from "react-icons/fa";

const AddEmployee=()=>{
    const [errorMessage,setErrorMessage] = useState("");
    const [employee_id,setEmployeeId] = useState("");
    const [employee_name,setEmployeeName] = useState("");
    const [gender,setGender] = useState("");
    const [supervisor,setSupervisor] = useState("");
    const [present_address,setAddress] = useState("");
    const [phone,setPhone] = useState("");
    const [job_position,setPosition] = useState("");
    const [start_time,setStartTime] = useState("");
    const [end_time,setEndTime] = useState("");
    const [hour_worked,setHour] = useState("");
    const [employment_start_date,setStartDate] = useState("");
    const history = useHistory();

    const addEmp = async () => {
        if(employee_id.length===0)
        {
            setErrorMessage("Please Enter employee Id");
        }
        else if(!Number(employee_id))
        {
            setErrorMessage("Employee Id must be number");
        }else if(employee_name.length===0){
            setErrorMessage("Please Enter employee name");
        }else if(gender.length===0)
        {
            setErrorMessage("Please select your gender");
        }else if(supervisor.length===0){
            setErrorMessage("Please select supervisor");
        }
        else if(present_address.length===0){
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
        else if(job_position.length===0)
        {
            setErrorMessage("Enter your job position");
        }
        else if(start_time.length===0)
        {
            setErrorMessage("Start time can't be empty");
        }
        else if(end_time.length===0){
            setErrorMessage("End time can't be empty");
        }
        else if(start_time>end_time)
        {
            setErrorMessage("Start time must be smaller than End time");
        }
        else if(end_time<start_time){
            setErrorMessage("End time must be grater than Start time");
        }
        else if(start_time===end_time){
            setErrorMessage("Start time and End time can't same");
        }else if(hour_worked.length===0)
        {
            setErrorMessage("Hour work Can't be empty");
        }
        else if(!Number(hour_worked))
        {
            setErrorMessage("Hour work must be a number");
        }
        else if(employment_start_date.length===0)
        {
            setErrorMessage("Employemet Start date Can't be empty");
        }
        else{
            await axios.post('http://127.0.0.1:8000/api/HR/employee/create', {
            employee_id,employee_name,gender,supervisor,present_address,
            phone,job_position,start_time,end_time,hour_worked,employment_start_date
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
    const gen=["male","female"];
    return(
       
        <>
            <div className="title text-center mb-3">
                <h3 className="font-width-border"><FaUserPlus/>New Employee</h3>
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
            <div className="borber w-50  m-auto">
            
                <div className="form-group">
                    <label>Employee ID</label> 
                    <input type="text" class="form-control" id="employeeid" name="employee_id" onChange={(e)=>setEmployeeId(e.target.value)}></input>
                </div>
            
                <div className="form-group">
                    <label>Employee Name</label> 
                    <input type="txt" class="form-control" id="employeename" name="employee_name" onChange={(e)=>setEmployeeName(e.target.value)}></input>
                </div>
                
                <div className="from-group">
                    <label>Gender </label><br></br>
                    {  
                        gen.map(result=>(
                            <>
                            <input type="radio" name="gender" value={result} onChange={(e)=>setGender(e.target.value)}></input>
                            <b>{result}</b>
                            </>
                        ))
                    }
                </div>
                <div className="form-group">
                    <label>Supervisor</label>
                    <select name="supervisor" id="super" className="form-select" onChange={(e)=>setSupervisor(e.target.value)}>
                        <option >Please Select</option>
                        <option value="Super admin">Super admin</option>
                        <option value="HR manager">HR manager</option>
                        <option value="Product Manager">Product manager</option>
                        <option value="Finance Manger">Finance manager</option>
                        <option value="Sales Manger">Sales manager</option>
                    </select>
                    
                </div>
                <div className="foem-group">
                    <label>Present address</label>
                    <input type="text" className="form-control" id="presentaddress" name="present_address" onChange={(e)=>setAddress(e.target.value)} ></input>
                </div>
                <div className="from-group">
                    <label>Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" onChange={(e)=>setPhone(e.target.value)}></input>
                </div>
                <div className="from-group">
                    <label>Job Position</label> 
                    <input type="txt" className="form-control" id="position" name="job_position" onChange={(e)=>setPosition(e.target.value)}></input>
                </div>
                <div className="from-group">
                    <label>Start Time(per day)</label> 
                    <input type="time" className="form-control" id="stime" name="start_time" onChange={(e)=>setStartTime(e.target.value)}></input>
                </div>
                <div class="from-group">
                    <label>End Time(per day)</label> 
                    <input type="time" className="form-control" id="etime" name="end_time" onChange={(e)=>setEndTime(e.target.value)}></input>
                </div>

                <div className="form-group">
                    <label>Hour Worked(Per week)</label> 
                    <input type="txt" className="form-control" id="worked" name="hour_worked" onChange={(e)=>setHour(e.target.value)}></input>
                    </div>
                <div className="from-group">
                    <label>Employment start date</label>
                    <input type="date" className="form-control" id="hiredate" name="employment_start_date" onChange={(e)=>setStartDate(e.target.value)}></input>
                </div>
                <div className="from-group">
                    <center><button onClick={addEmp} className="btn btn-outline-primary btn-block w-50 mt-3" type="submit">Add</button></center>
                </div>    
            </div>
        </>
    )
}
export default AddEmployee;