import { Card } from 'react-bootstrap';
import { React } from 'react';
import { useState, useEffect } from 'react';
import { FaChartPie } from "react-icons/fa";
import { Pie } from 'react-chartjs-2';
import axios from 'axios';


const ExpenseState = () => {
    const [keys, setKeys] = useState([]);
    const [values, setValues] = useState([]);
    useEffect(async () => {
        axios.get('http://127.0.0.1:8000/api/HR/amount/statistic').then((response)=>{
             setKeys(Object.keys(response.data));
             setValues(Object.values(response.data));

             //console.log(keys);
             //console.log(values);
        })
    }, [])
    

    
    
       const data = {
        labels: keys,
        datasets: [
            {
                label: 'Monthly Expense Report',
                data: values,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };     

    return (
        <>
            <div className="title text-center mb-3">
                <h3 className="font-width-border"><FaChartPie />Expense Statistic</h3>
            </div>
            <hr></hr>
            <Card className="border border-dark mr-5 ">
                <div><b className="text-left m-4">Monthly Expense Report</b></div>
                 <center>
                     
                    <div style={{width:450}}><Pie data={data}/> </div>
                    
                </center> 
                 <br></br>
            </Card>
        </>
    )
}
export default ExpenseState;