import { useParams,useHistory} from 'react-router-dom'
import { useState , useEffect } from 'react';
import { React } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const DeleteExp=()=>{
    const history = useHistory();
    const {id:eid} = useParams();
    const[exp,setExp] = useState([]);
    useEffect( async ()=>{
        let result = await fetch("http://127.0.0.1:8000/api/HR/expense/"+eid);
        result = await result.json();
        setExp(result);
    },[])
    function deleteExp(id)
    {
        fetch('http://127.0.0.1:8000/api/HR/expense/delete/'+eid, {
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
                <h3 className="font-width-border"><FaTrashAlt />Delete Expense Report</h3>
            </div>
            <hr></hr>
            <Table  className="table table-hover ">
                <thead>
                    <tr>
                        <th> Name</th>
                        <th>Catagory</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Expense Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{exp.name}</td>
                        <td>{exp.catagory}</td>
                        <td>{exp.amount}</td>
                        <td>{exp.description}</td>
                        <td>{exp.expense_date}</td>
                    </tr>
                </tbody>
            </Table>
            <div className="container">
                <div className="row justify-content-center">
                   <center><h3 className="text-primary">Are you sure to delete <strong>{exp.name}</strong>?</h3></center> 
                </div>
                <div className="row justify-content-center">
                <center>
                    <button onClick={()=>deleteExp(exp.id)} className='btn btn-danger btn-block m-1'>Delete</button>
                     <Link to={`/HR/expense/list`} class="btn btn-success m-1"> Back </Link>
                </center>
                    
                </div>
            </div>  
        </>
    )
}
export default DeleteExp;