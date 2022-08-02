import { API } from "../../../config";
import { useHistory } from "react-router";
import { useState } from "react";
import FinanceNavbar from "../layouts/FinanceNavbar";
import { Card } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import useGet from "../requests/useGet";
import setPageTitle from "../../../setPageTitle";

export default function FinanceSupplierInvoice(){
    setPageTitle("Invoices | Supplier");
    //REDIRECT IF NOT LOGGED IN
    const history = useHistory();
    if(!localStorage.getItem('type')){
        history.push('/');
    }
    //GET CUSOTMER INVOICES
    const [invoices, setInvoices] = useState([]);
    useGet(API+"financesupplierinvoices/"+localStorage.getItem('id'),setInvoices);

    const onDelete = (id)=>{
        axios.get(API+"financedeleteinvoice/"+id, { headers: { 'Access-Control-Allow-Origin': '*', 'Accept' : 'application/json', 'user_type':localStorage.getItem('type') } })
        .then((response)=>{console.log(response.data)})
        .catch((error)=>{console.log('ERROR: '+error)});
        const data = invoices.filter((invoice)=>invoice.id !== id);
        setInvoices(data);
    }

    return(
        <div>
            <FinanceNavbar/>
            <div align="center" style={{paddingTop:"20px"}}>
                <Card style={{ width: '70rem', height:'40rem' }}>
                    <Card.Header>Supplier Invoices</Card.Header>
                    <div style={{overflow:'scroll'}}>
                    <Card.Body>
                        <Table striped bordered responsive>
                            <tr>
                                <th>Date Created</th>
                                <th>Title</th>
                                <th>Supplier</th>
                                <th>Status</th>
                                <th>Download</th>
                                <th>Delete</th>
                            </tr>
                            {
                                invoices.length?(
                                    invoices.map((invoice)=>{
                                        return(
                                            <tr>
                                                <td>{invoice.created_at}</td>
                                                <td>{invoice.title}</td>
                                                <td>{invoice.for_name}</td>
                                                <td>{invoice.status}</td>
                                                <td><Button variant="success"><a href={"http://127.0.0.1:8000/upload/Finance/Invoices/"+invoice.file}  target="_blank" download>Download</a></Button></td>
                                                <td><Button variant="danger" onClick={()=>{onDelete(invoice.id)}}>Delete</Button></td>
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