import { API } from "../../../config";
import { useHistory } from "react-router";
import { useState } from "react";
import FinanceNavbar from "../layouts/FinanceNavbar";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import useGet from "../requests/useGet";
import axios from "axios";
import setPageTitle from "../../../setPageTitle";

export default function FinanceConnectedBank(){
    setPageTitle("Budgeting | Banks");
    //REDIRECT IF NOT LOGGED IN
    const history = useHistory();
    if(!localStorage.getItem('type')){
        history.push('/');
    }
    //GET CUSOTMER INVOICES
    const [banks, setBanks] = useState([]);
    useGet(API+"financebanks/"+localStorage.getItem('id'),setBanks);

    const onDelete = (id)=>{
        axios.get(API+"financedeletebank/"+id, { headers: { 'Access-Control-Allow-Origin': '*', 'Accept' : 'application/json', 'user_type':localStorage.getItem('type') } })
        .then((response)=>{console.log(response.data)})
        .catch((error)=>{console.log('ERROR: '+error)});
        const data = banks.filter((bank)=>bank.id !== id);
        setBanks(data);
    }

    return(
        <div>
            <FinanceNavbar/>
            <div align="center" style={{paddingTop:"20px"}}>
                <Card style={{ width: '70rem', height:'40rem' }}>
                    <Card.Header>Connected Banks</Card.Header>
                    <div style={{overflow:'scroll'}}>
                    <Card.Body>
                        <Table striped bordered responsive>
                            <tr>
                                <th>Bank Name</th>
                                <th>Account Holder Name</th>
                                <th>Balance</th>
                                <th>Disconnect</th>
                            </tr>
                            {
                                banks.length?(
                                    banks.map((bank)=>{
                                        return(
                                            <tr>
                                                <td>{bank.name}</td>
                                                <td>{bank.holder_name}</td>
                                                <td>{bank.balance}</td>
                                                <td><Button variant="danger" onClick={()=>{onDelete(bank.id)}}>Disconnect</Button></td>
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