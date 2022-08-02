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
import axios from "axios";

export default function FinanceAsset(){
    setPageTitle("Asset | New");
    //REDIRECT IF NOT LOGGED IN
    const history = useHistory();
    if(!localStorage.getItem('type')){
        history.push('/');
    }

    const [type,setType] = useState('');
    const [amount,setAmount] = useState('');

    const [errtype,setTypeErr] = useState('');
    const [erramount,setAmountErr] = useState('');


    const onCreateAsset = async () => {
        const formdata = new FormData();
        formdata.append('type',type);
        formdata.append('amount',amount);
        await axios.post(API+"financeasset/"+localStorage.getItem('id'), formdata,{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'undefined',
                'Accept' : 'application/json',
                'user_type' : 'finance'
            }
        }).then((response) => {
                console.log(response);
                history.push('/financebanks');
            }
          ).catch(error => {
                console.log("ERRRR:: "+error);
            });
    }

    //VALIDATION
    const onCreateValidation = ()=>{
        if(type=='' || amount==''){
            setTypeErr('* Type Required');
            setAmountErr('* Amount Required');
        }
        else{
            onCreateAsset();
        }
    }

    return(
        <div>
            <FinanceNavbar/>
            <div align="center" style={{paddingTop:"20px"}}>
            <Card style={{ width: '70rem', height:'40rem' }}>
                    <Card.Header>Asset - New</Card.Header>
                    <Card.Body>
                        <Table responsive>
                            <tr>
                                <td>Type: </td>
                                <td>
                                    <div onChange={event => setType(event.target.value)}>
                                        <Form.Select aria-label="Default select example">
                                            <option selected disabled value="">Select Asset Type</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Accounts Receivables">Accounts Receivables</option>
                                            <option value="Others">Others</option>
                                        </Form.Select>
                                    </div>
                                    <FormLabel style={{color:"red"}}><b>{errtype}</b></FormLabel>
                                </td>
                            </tr>
                            <tr>
                                <td>Amount: </td>
                                <td>
                                    <Form.Control type="number" onChange={event => setAmount(event.target.value)} placeholder="Amount" />
                                    <FormLabel style={{color:"red"}}><b>{erramount}</b></FormLabel>
                                </td>
                            </tr>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" onClick={onCreateValidation}>Add</Button>
                    </Card.Footer>
                </Card>
            </div>
        </div>
    );
}