import { useState , useEffect } from 'react';
import { React } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaListAlt } from "react-icons/fa";


const LeaveList=()=>{
    const[list,setList] = useState([]);
    useEffect( async ()=>{
        let result = await fetch("http://127.0.0.1:8000/api/HR/leave/request/list");
        result = await result.json();
        setList(result);
    },[])
    return(
        <>
            <div className="title text-center mb-3">
                <h3 className="font-width-border"><FaListAlt/>Leave Request List</h3>
            </div>
            <hr></hr>
            <Table  className="table table-hover ">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Description</th>
                        <th>Request Made</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((leave)=>
                        <tr>
                            <td>{leave.employee_id}</td>
                            <td>{leave.type}</td>
                            <td>{leave.start_time}</td>
                            <td>{leave.end_time}</td>
                            <td>{leave.request_description}</td>
                            <td>{leave.request_made}</td>
                            <td>
                                {leave.status ==="Pending" ?(
                                    <span className="text-primary"><b>{leave.status}</b></span>
                                ) : leave.status==="Approved" ? (
                                    <span className="text-success"><b>{leave.status}</b></span>
                                ): (
                                    <span className="text-danger"><b>{leave.status}</b></span>
                                )
                                }
                            </td>
                        </tr>
                        )

                    }
                
                </tbody>
            </Table>
        </>
    )
    
}
export default LeaveList;