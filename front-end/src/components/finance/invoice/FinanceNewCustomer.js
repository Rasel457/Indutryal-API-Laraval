import { Card } from "react-bootstrap";
import FinanceNavbar from "../layouts/FinanceNavbar";
import setPageTitle from "../../../setPageTitle";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { FormLabel } from "react-bootstrap";
import { API } from "../../../config";
import { useHistory } from "react-router-dom";
import useGet from "../requests/useGet";
import axios from "axios";


export default function FinanceNewCustomer(){
    setPageTitle("New Invoice | Customer");
    //REDIRECT IF NOT LOGGED IN
    const history = useHistory();
    if(!localStorage.getItem('type')){
        history.push('/');
    }
    const [title,setTitle] = useState('');
    const [customername,setCustomer] = useState('');
    const [errtitle,setTitleErr] = useState('');
    const [errcustomername,setCustomerErr] = useState('');
    const [sales,setSales] = useState('');
    const [errsales,setSalesErr] = useState('');
    const [selectsale,setSelectsale] = useState('');
    useGet(API+'financecustomerorders/'+localStorage.getItem('id'),setSales);

    //POST DATA
    const onCreateInvoice = async () => {
        const formdata = new FormData();
        formdata.append('title',title);
        formdata.append('name',customername);
        formdata.append('order',selectsale);
        await axios.post(API+"financenewcustomer/"+localStorage.getItem('id'), formdata,{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'undefined',
                'Accept' : 'application/json',
                'user_type' : 'finance'
            }
        }).then((response) => {
                console.log(response);
                history.push('/financecustomerinvoice')
            }
          ).catch(error => {
                console.log("ERRRR:: "+error);
            });
    }

    //VALIDATION
    const onCreateValidation = ()=>{
        if(title=='' || customername=='' || selectsale==''){
            setTitleErr('* Title Required');
            setCustomerErr('* Customer Name Required');
            setSalesErr('* Sales Order Required');
        }
        else{
            onCreateInvoice();
        }
    }

    return(
        <div>
            <FinanceNavbar/>
            <div align="center" style={{paddingTop:"20px"}}>
            <Card style={{ width: '70rem', height:'40rem' }}>
                    <Card.Header>New Customer Supplier</Card.Header>
                    <Card.Body>
                        <Table responsive>
                            <tr>
                                <td>Title: </td>
                                <td>
                                    <Form.Control type="text" onChange={event => setTitle(event.target.value)} placeholder="Title" />
                                    <FormLabel style={{color:"red"}}><b>{errtitle}</b></FormLabel>
                                </td>
                            </tr>
                            <tr>
                                <td>Customer Name: </td>
                                <td>
                                    <Form.Control type="text" onChange={event => setCustomer(event.target.value)} placeholder="Customer Name" />
                                    <FormLabel style={{color:"red"}}><b>{errcustomername}</b></FormLabel>
                                </td>
                            </tr>
                            <tr>
                                <td>Select a Sales Order: </td>
                            </tr>
                            {
                                sales.length?(
                                    sales.map((sale)=>{
                                        return(
                                            <tr>
                                                <td>
                                                    <div onChange={event => setSelectsale(event.target.value)}>
                                                        <Form.Check type="radio" name="order" value={sale.id} aria-label="radio 1" label={sale.order_description}/>
                                                    </div>
                                                </td>
                                                <td>Amount: {sale.total_amount}</td>
                                            </tr>
                                        )
                                    })
                                ):''
                            }
                            <FormLabel style={{color:"red"}}><b>{errsales}</b></FormLabel>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" onClick={onCreateValidation}>Create</Button>
                    </Card.Footer>
                </Card>
            </div>
        </div>
    );
}