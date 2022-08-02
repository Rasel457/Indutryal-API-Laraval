import { useState , useEffect } from 'react';
import { React } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaListAlt } from "react-icons/fa";
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


const ExpenseList=()=>{
    const[list,setList] = useState([]);
    const [exporData, setExportData] = useState([]);
    useEffect( async ()=>{
        let result = await fetch("http://127.0.0.1:8000/api/HR/expense/list");
        result = await result.json();
        setList(result);
        setExportData(result);
    },[])

    
    const DataSet = [
        {
            columns: [
                {title: "Name"}, // width in pixels
                {title: "Catagory"}, // width in characters
                {title: "Amount"}, // width in pixels
                {title: "Description"}, // width in pixels
                {title: "Expense Date"}, // width in pixels
            ],
            data: exporData.map((res) => [
                {value: res.name},
                {value: res.catagory},
                {value: res.amount},
                {value: res.description},
                {value: res.expense_date},   
            ])
        }
    ]

    return(
        <>
            <div className="title text-center mb-3">
                <h3 className="font-width-border"><FaListAlt />Expense Report List</h3>
            </div>
            <hr></hr>
            {exporData.length !== 0 ? (
                <ExcelFile 
                filename="Expense Report" 
                element={<button type="button" className="btn btn-primary float-right m-3">Download</button>}>
                    <ExcelSheet dataSet={DataSet} name="Expense Report"/>
                </ExcelFile>
            ): null} 
            <Table  className="table table-hover ">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Catagory</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Expense Date</th>
                        <th>Action</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((exp)=>
                        <tr>
                            <td>{exp.name}</td>
                            <td>{exp.catagory}</td>
                            <td>{exp.amount}</td>
                            <td>{exp.description}</td>
                            <td>{exp.expense_date}</td>
                            <td>
                                <Link to={`/HR/expense/edit/${exp.id}`} class="btn btn-success m-1"> Edit </Link>
                                <Link to={`/HR/expense/delete/${exp.id}`} class="btn btn-danger m-1"> Delete </Link>
                            
                            </td>
                        </tr>
                        
                    )
                }
                    
                </tbody>
            </Table>
        </>
    )
}
export default ExpenseList;    