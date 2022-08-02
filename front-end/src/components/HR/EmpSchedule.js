import { useHistory} from 'react-router-dom'
import { useState , useEffect } from 'react';
import { React } from 'react';
import { Table } from 'react-bootstrap';
import { FaClock } from "react-icons/fa";



const EmpSchedule=()=>{
    const[list,setList] = useState([]);
    useEffect( async ()=>{
        let res = await fetch("http://127.0.0.1:8000/api/HR/emp/schedule");
        res = await res.json();
        setList(res);
    },[]) 
    
    return(
        <>
            <div className="title text-center mb-3">
                <h3 className="font-width-border"><FaClock/>Employees Schedule</h3>
            </div>
            <hr></hr>
            <Table  className="table table-hover ">
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee Name</th>
                        <th>Start time(Per Day)</th>
                        <th>End Time(Per Day)</th>
                        <th>Job Position</th>
                        <th>Hour Worked (Per Week)</th>
                        <th>Employment Start Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((emp)=>
                            <tr>
                                <td>{emp.employee_id}</td>
                                <td>{emp.employee_name}</td>
                                <td>{emp.start_time}</td>
                                <td>{emp.end_time}</td>
                                <td>{emp.job_position}</td>
                                <td>{emp.hour_worked}</td>
                                <td>{emp.employment_start_date}</td> 
                            </tr>
                        )
                    }
                    
                </tbody>
            </Table>
        </>
    )
}
export default EmpSchedule;