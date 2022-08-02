import { useParams,useHistory} from 'react-router-dom'
import { useState , useEffect } from 'react';
import { React } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";


const Reject=()=>{
    const history = useHistory();
    const {id:eid} = useParams();
    const[list,setEmp] = useState([]);
    useEffect( async ()=>{
        let result = await fetch("http://127.0.0.1:8000/api/HR/leave/"+eid);
        result = await result.json();
        setEmp(result);
    },[])

    function reject(id)
    {
        fetch('http://127.0.0.1:8000/api/HR/leave/reject/'+id, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
        })
        history.push('/HR/leave/request/list');
    }

    return(
        <>
            <div className="title text-center mb-3">
                <h3 className="font-width-border"><FaTimesCircle />Reject Leave Request</h3>
            </div>
            <hr></hr>
            <Table  className="table table-hover ">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Leave Type</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Description</th>
                        <th>Request Made</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{list.employee_id}</td>
                        <td>{list.type}</td>
                        <td>{list.start_time}</td>
                        <td>{list.end_time}</td>
                        <td>{list.request_description}</td>
                        <td>{list.request_made}</td>
                        <td>
                        {
                            list.status ==='Pending' ?(
                                <span className="text-primary"><b>{list.status}</b></span>
                            ):list.status==='Approved' ? (
                                <span className="text-success"><b>{list.status}</b></span>
                            ): (
                                <span className="text-danger"><b>{list.status}</b></span>
                            )
                        }
                        </td>
                    </tr>
                
                </tbody>
            </Table>
            <div className="container">
                <div className="row justify-content-center">
                   <center><h3 className="text-primary">Are you sure to reject leave request?</h3></center> 
                </div>
                <div className="row justify-content-center">
                <center>
                    <button onClick={()=>reject(list.id)} className='btn btn-danger btn-block m-1'>Reject</button>
                    <Link to={`/HR/leave/pending/list`} class="btn btn-success m-1"> Back </Link>
                </center>
                    
                </div>
            </div>
        </>
    )
}
export default Reject;