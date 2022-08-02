import { useParams,useHistory} from 'react-router-dom'
import { useState , useEffect } from 'react';
import { React } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const DeleteEmp =()=>{
    const history = useHistory();
    const {employee_id:eid} = useParams();
    const[list,setEmp] = useState([]);
    useEffect( async ()=>{
        let result = await fetch("http://127.0.0.1:8000/api/HR/employee/"+eid);
        result = await result.json();
        setEmp(result);
    },[])

    function deleteEmp(employee_id)
    {
        fetch('http://127.0.0.1:8000/api/HR/employee/delete/'+employee_id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
        })
        history.go(0);
    }

    return(
        <>
            <div className="title text-center mb-3">
                <h3 className="font-width-border"><FaTrashAlt />Delete Employee</h3>
            </div>
            <hr></hr>
            <Table  className="table table-hover ">
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee Name</th>
                        <th>Gender</th>
                        <th>Supervisor</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Job Position</th>
                        <th>Group</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                            <tr>
                                <td>{list.employee_id}</td>
                                <td>{list.employee_name}</td>
                                <td>{list.gender}</td>
                                <td>{list.supervisor}</td>
                                <td>{list.present_address}</td>
                                <td>{list.phone}</td>
                                <td>{list.job_position}</td>
                                <td>{list.employee_group}</td>
                                
                            </tr>
                        
                    }
                    
                </tbody>
            </Table> 
            <div className="container">
                <div className="row justify-content-center">
                   <center><h3 className="text-primary">Are you sure to delete <strong>{list.employee_name}</strong>?</h3></center> 
                </div>
                <div className="row justify-content-center">
                <center>
                    <button onClick={()=>deleteEmp(list.employee_id)} className='btn btn-danger btn-block m-1'>Delete</button>
                     <Link to={`/HR/employee/list`} class="btn btn-success m-1"> Back </Link>
                </center>
                    
                </div>
            </div>  
        </>
    )
}
export default DeleteEmp;

