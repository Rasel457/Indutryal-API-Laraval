import { Card } from 'react-bootstrap';
import { React } from 'react';
import { FaChartPie } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

const Home=()=>{
    const [keys, setKeys] = useState([]);
    const [values, setValues] = useState([]);
    useEffect(async () => {
        axios.get('http://127.0.0.1:8000/api/HR/employee/ratio').then((response)=>{
             setKeys(Object.keys(response.data));
             setValues(Object.values(response.data));
        })
    }, [])
    

    
    
    const data = {
        labels: keys,
        datasets: [{
          label: 'Percentage of male and female',
          data: values,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };

    return(
        <>
            <div className="title text-center mb-3">
                <h3 className="font-width-border"><FaChartPie />Doughnut Chart</h3>
            </div>
            <hr></hr>
            <Card className="border border-dark mr-5 ">
            <div><b className="text-left m-3">Number Of male and female employee</b></div>
                <center> <div style={{width:450}}><Doughnut data={data}/></div></center>
                <br></br>
            </Card>
        </>
    )
}
export default Home;