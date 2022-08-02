import { useState , useEffect } from 'react';
import { React } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import { FaListAlt } from "react-icons/fa";
import ReactExport from 'react-data-export';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


const EmployeeList=()=>{
    const [errorMessage,setErrorMessage] = useState("");
    const[searchEmp,setSearchEmp] = useState('');
    const[list,setList] = useState([]);
    const [exporData, setExportData] = useState([]);
    useEffect( async ()=>{
        let result = await fetch("http://127.0.0.1:8000/api/HR/employee/list");
        result = await result.json();
        setList(result);
        setExportData(result);
    },[])

    const DataSet = [
        {
            columns: [
                {title: "Employee Id"}, // width in pixels
                {title: "Employee Name"}, // width in characters
                {title: "Gender"}, // width in pixels
                {title: "Supervisor"}, // width in pixels
                {title: "Address"}, // width in pixels
                {title: "Phone"}, // width in pixels
                {title: "Job Position"}, // width in characters
                {title: "Group"}, // width in pixels
            ],
            data: exporData.map((res) => [
                {value: res.employee_id},
                {value: res.employee_name},
                {value: res.gender},
                {value: res.supervisor},
                {value: res.present_address},
                {value: res.phone},
                {value: res.job_position},
                {value: res.employee_group},
                
            ])
        }
    ]

    function search()
    {
        if(searchEmp.length===0)
        {
            setErrorMessage("Please Enter employee name for search");
        }
        else{
            axios.get("http://127.0.0.1:8000/api/HR/employee/search/"+searchEmp)
            .then(function (response) {
            const result = response.data;
            setList(result);
            setErrorMessage("");
            });
        }
        
    }

    return(
        <>
            <div className="title text-center mb-3">
                <h3 className="font-width-border"><FaListAlt/>Employee List</h3>
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
            <div className="input-group">
                <input className="form-control"type="text" placeholder="Find By Employee Name..." name="search"  onChange={(e)=>{setSearchEmp(e.target.value)}}></input>
                <div className="input-group-append">
                    <button onClick={search} type="submit" className="btn btn-success">Search</button>
                </div>
            </div>
            <br></br>
            {exporData.length !== 0 ? (
                <ExcelFile 
                filename="Employee List" 
                element={<button type="button" className="btn btn-primary float-right m-3">Download</button>}>
                    <ExcelSheet dataSet={DataSet} name="Employee List"/>
                </ExcelFile>
            ): null}    
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((emp)=>
                            <tr>
                                <td>{emp.employee_id}</td>
                                <td>{emp.employee_name}</td>
                                <td>{emp.gender}</td>
                                <td>{emp.supervisor}</td>
                                <td>{emp.present_address}</td>
                                <td>{emp.phone}</td>
                                <td>{emp.job_position}</td>
                                <td>{emp.employee_group}</td>
                                
                                <td>
                                    <Link to={`/HR/employee/edit/${emp.employee_id}`} class="btn btn-success m-1"> Edit </Link>
                                    <Link to={`/HR/employee/delete/${emp.employee_id}`} class="btn btn-danger m-1"> Delete </Link>
                                </td>
                            </tr>
                        )
                    }
                    
                </tbody>
            </Table>   
        </>
    )
}
export default EmployeeList;
