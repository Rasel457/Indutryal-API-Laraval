import FinanceNavbar from "../layouts/FinanceNavbar";
import useGet from "../requests/useGet";
import axios from "axios";
import setPageTitle from "../../../setPageTitle";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { API } from "../../../config";
import { useHistory } from "react-router";
import { useState } from "react";

export default function FinanceCustomerPayment(){
    setPageTitle("Payment | Customer");
    //REDIRECT IF NOT LOGGED IN
    const history = useHistory();
    if(!localStorage.getItem('type')){
        history.push('/');
    }
    const [histories,setHistories] = useState([]);

    useGet(API+'financeunadjustedcinvoice/'+localStorage.getItem('id'),setHistories);

    const onAdjust = (id)=>{
        axios.get(API+"financeadjustcustomer/"+id+"/"+localStorage.getItem('id'), { headers: { 'Access-Control-Allow-Origin': '*', 'Accept' : 'application/json', 'user_type':localStorage.getItem('type') } })
        .then((response)=>{console.log(response.data)})
        .catch((error)=>{console.log('ERROR: '+error)});
        const data = histories.filter((hist)=>hist.id !== id);
        setHistories(data);
    }

    return(
        <div>
            <FinanceNavbar/>
            <div align="center" style={{paddingTop:"20px"}}>
                <Card style={{ width: '70rem', height:'40rem' }}>
                    <Card.Header>Payment - Customer</Card.Header>
                    <div style={{overflow:'scroll'}}>
                    <Card.Body>
                        <Table striped responsive bordered>
                            <tr>
                                <th>Customer Name</th>
                                <th>Amount</th>
                                <th>Adjust</th>
                            </tr>
                            {
                                histories.length?(
                                    histories.map((hist)=>{
                                        return(
                                            <tr>
                                                <td>{hist.for_name}</td>
                                                <td>{hist.total_amount}</td>
                                                <td><Button variant="info" onClick={()=>{onAdjust(hist.id)}}>Adjust</Button></td>
                                            </tr>
                                        )
                                    })
                                ):''
                            }
                        </Table>
                    </Card.Body>
                    </div>
                </Card>
            </div>
        </div>
    );
}