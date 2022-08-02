import { useHistory} from 'react-router-dom'
import { useState } from 'react';
import { React } from 'react';
import axios from 'axios';
import { FaPlusSquare } from "react-icons/fa";


const Expense=()=>{
    const [errorMessage,setErrorMessage] = useState("");
    const [name,setName] = useState("");
    const [catagory,setCatagory] = useState("");
    const [amount,setAmount] = useState("");
    const [description,setDescription] = useState("");
    const [expense_date,setExpenseDate] = useState("");
    const history = useHistory();

    const addExpense = async () => {
        if(name.length===0){
            setErrorMessage("Name can't be empty");
        }
        else if(catagory.length===0){
            setErrorMessage("Expense catagory can't be empty");
        }
        else if(amount.length===0)
        {
            setErrorMessage("Amount can't be empty");
        }
        else if(description.length===0)
        {
            setErrorMessage("Description can't be empty");
        }
        else if(description.length<=10)
        {
            setErrorMessage("Description length at least 10 characters");
        }
        else if(expense_date.length===0)
        {
            setErrorMessage("Expense date can't be empty");
        }
        else{
            await axios.post('http://127.0.0.1:8000/api/HR/expense/report', {
                name,catagory,amount,description,expense_date
            },{
                headers: {
                    'ContentType': 'application/json'
                }
            }).then((response)=>{
                console.log(response.data);
                history.push('/HR/expense/list');
            });
            
            
        }
      
    }
    return(
        <>
            <div className="title text-center mb-3">
                <h3 className="font-width-border"><FaPlusSquare />Expense Report</h3>
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
            <div className="w-50  m-auto">
            
                <div className="from-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" id="user" onChange={(e)=>setName(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Catagory</label> 
                    <input type="txt" className="form-control" id="catagory" name="catagory" onChange={(e)=>setCatagory(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label >Amount</label> 
                    <input type="number" className="form-control" id="amount" name="amount" onChange={(e)=>setAmount(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea type="text" className="form-control" name="description" id="description" onChange={(e)=>setDescription(e.target.value)}></textarea>
                </div>
                <div className="from-group">
                    <label>Expense Date</label>
                    <input type="date" className="form-control" id="expense_date" name="expense_date" onChange={(e)=>setExpenseDate(e.target.value)}></input>
                </div>
                <div className="from-group">
                    <center><button onClick={addExpense} className="btn btn-outline-primary btn-block w-50 mt-3" type="submit">Create</button></center>
                </div>
        </div>
        </>
    )
}
export default Expense;