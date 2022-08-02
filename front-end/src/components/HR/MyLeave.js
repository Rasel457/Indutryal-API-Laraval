import { useHistory} from 'react-router-dom'
import { useState } from 'react';
import { React } from 'react';
import axios from 'axios';
import { FaWalking } from "react-icons/fa";


const MyLeave=()=>{
    const [errorMessage,setErrorMessage] = useState("");
    const [type,setType] = useState("");
    const [start_date,setStartDate] = useState("");
    const [end_date,setEndDate] = useState("");
    const [description,setDescription] = useState("");
    const history = useHistory();
    
    
const myLeave = async () => {
        if(type.length===0){
            setErrorMessage("Type Can't be empty");
        }else if(start_date.length===0)
        {
            setErrorMessage("Start date can't be empty");
        }
        else if(end_date.length===0){
            setErrorMessage("End date can't be empty");
        }
        else if(start_date>end_date)
        {
            setErrorMessage("Start date must be smaller than End date");
        }
        else if(description.length===0)
        {
            setErrorMessage("Description can't be empty");
        } 
        else
        {
            await axios.post('http://127.0.0.1:8000/api/HR/leave/request/'+localStorage.getItem('username'), {
           type,start_date,end_date,description
        },{
            headers: {
                'ContentType': 'application/json'
            }
        }).then((response)=>{
            console.log(response.data);
            history.push('/HR/leave/pending/list');
        });
        // if(start_date>end_date)
        // {
        //     setErrorMessage("Start date must be smaller than End date");
        // }
        // console.log(start_date);
        // console.log(end_date);
        
        }}
        


    return(
        <>
            <div className="title text-center mb-3">
                <h3 className="font-width-border"><FaWalking />My Leave Request</h3>
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
            <div className=" w-50   m-auto">
                <div className="form-group">
                    <label>Type</label>
                    <select name="type" id="type" className="form-select" onChange={(e)=>setType(e.target.value)}>
                        <option>Plese Select</option>
                        <option value="sick">Sick Leave</option>
                        <option value="other">Other leave</option>
                    </select>
                </div>
                <div className="from-group">
                    <label>Start date</label>
                    <input type="date" className="form-control" id="startdate" name="start_date" onChange={(e)=>setStartDate(e.target.value)}></input>
                </div>
                <div className="from-group">
                    <label>End date</label>
                    <input type="date" className="form-control" id="startdate" name="end_date" onChange={(e)=>setEndDate(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Descreption</label>
                    <textarea type="text" name="description" id="leave_description" className="form-control" onChange={(e)=>setDescription(e.target.value)}></textarea>
                </div>
                <div className="from-group">
                    <center><button onClick={myLeave} className="btn btn-outline-primary btn-block w-50 mt-3" type="submit">Create Leave Request</button></center> 
                </div>
            </div>
        </>
    )

}
export default MyLeave;