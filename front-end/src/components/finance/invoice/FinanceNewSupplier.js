import { Card } from "react-bootstrap";
import FinanceNavbar from "../layouts/FinanceNavbar";
import setPageTitle from "../../../setPageTitle";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FormLabel } from "react-bootstrap";
import { useState } from "react";
import useGet from "../requests/useGet";
import { API } from "../../../config";
import { useHistory } from "react-router";
import axios from "axios";
import { on } from "rsvp";


export default function FinanceNewSupplier(){
    setPageTitle("New Invoice | Supplier");
    //REDIRECT IF NOT LOGGED IN
    const history = useHistory();
    if(!localStorage.getItem('type')){
        history.push('/');
    }
    const [title,setTitle] = useState('');
    const [suppliername,setSupplier] = useState('');
    const [errtitle,setTitleErr] = useState('');
    const [errsuppliername,setSupplierErr] = useState('');
    const [sales,setSales] = useState('');
    const [errsales,setSalesErr] = useState('');
    const [selectsale,setSelectsale] = useState('');
    useGet(API+'financesupplierorders/'+localStorage.getItem('id'),setSales);

    //POST DATA
    const onCreateInvoice = async () => {
        const formdata = new FormData();
        formdata.append('title',title);
        formdata.append('name',suppliername);
        formdata.append('order',selectsale);
        await axios.post(API+"financenewsupplier/"+localStorage.getItem('id'), formdata,{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'undefined',
                'Accept' : 'application/json',
                'user_type' : 'finance'
            }
        }).then((response) => {
                console.log(response);
                history.push('/financesupplierinvoice')
            }
          ).catch(error => {
                console.log("ERRRR:: "+error);
            });
    }

    //VALIDATION
    const onCreateValidation = ()=>{
        if(title=='' || suppliername=='' || selectsale==''){
            setTitleErr('* Title Required');
            setSupplierErr('* Supplier Name Required');
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
                    <Card.Header>New Supplier Invoice</Card.Header>
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
                                <td>Supplier Name: </td>
                                <td>
                                    <Form.Control type="text" onChange={event => setSupplier(event.target.value)} placeholder="Supplier Name" />
                                    <FormLabel style={{color:"red"}}><b>{errsuppliername}</b></FormLabel>
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