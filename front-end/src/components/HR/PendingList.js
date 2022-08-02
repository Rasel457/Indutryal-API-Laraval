import { useState , useEffect } from 'react';
import { React } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaListAlt } from "react-icons/fa";


const PendingList=()=>{
    const[list,setList] = useState([]);
    useEffect( async ()=>{
        let result = await fetch("http://127.0.0.1:8000/api/HR/leave/pending/list");
        result = await result.json();
        setList(result);
    },[])
    return(
        <>
            <div className="title text-center mb-3">
                <h3 className="font-width-border"><FaListAlt/>Pending List</h3>
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
                        <th>Action</th>
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
                                <span className="text-primary"><b>{leave.status}</b></span>
                            </td>
                        
                            <td>
                                <Link to={`/HR/leave/approve/${leave.id}`} class="btn btn-success btn-block m-1">Approve </Link>
                                <Link to={`/HR/leave/reject/${leave.id}`} class="btn btn-danger btn-block mx-2 m-1"> Reject </Link>
                                    
                            </td>
                        </tr>
                        )

                    }
                
                </tbody>
            </Table>
        </>
    )
    
}
export default PendingList;