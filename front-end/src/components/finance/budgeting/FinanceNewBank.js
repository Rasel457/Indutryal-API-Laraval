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

export default function FinanceNewBank(){
    setPageTitle("Bank | New");
    //REDIRECT IF NOT LOGGED IN
    const history = useHistory();
    if(!localStorage.getItem('type')){
        history.push('/');
    }

    const [bankname,setBankname] = useState('');
    const [holdername,setHoldername] = useState('');
    const [balance,setBalance] = useState('');
    const [accno,setAccno] = useState('');

    const [errbankname,setBanknameErr] = useState('');
    const [errholdername,setHoldernameErr] = useState('');
    const [errbalance,setBalanceErr] = useState('');
    const [erraccno,setAccnoErr] = useState('');

    const onCreateBank = async () => {
        const formdata = new FormData();
        formdata.append('name',bankname);
        formdata.append('holder_name',holdername);
        formdata.append('balance',balance);
        formdata.append('account_no',accno);
        await axios.post(API+"financenewbank/"+localStorage.getItem('id'), formdata,{
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
        if(bankname=='' || holdername=='' || balance=='' || accno==''){
            setBanknameErr('* Name Required');
            setHoldernameErr('* Holder Name Required');
            setBalanceErr('* Balance Required');
            setAccnoErr('* Account No. Required');
        }
        else{
            onCreateBank();
        }
    }

    return(
        <div>
            <FinanceNavbar/>
            <div align="center" style={{paddingTop:"20px"}}>
            <Card style={{ width: '70rem', height:'40rem' }}>
                    <Card.Header>Bank - New</Card.Header>
                    <Card.Body>
                        <Table responsive>
                            <tr>
                                <td>Bank Name: </td>
                                <td>
                                    <Form.Control type="text" onChange={event => setBankname(event.target.value)} placeholder="Bank Name" />
                                    <FormLabel style={{color:"red"}}><b>{errbankname}</b></FormLabel>
                                </td>
                            </tr>
                            <tr>
                                <td>Account Holder Name: </td>
                                <td>
                                    <Form.Control type="text" onChange={event => setHoldername(event.target.value)} placeholder="Holder Name" />
                                    <FormLabel style={{color:"red"}}><b>{errholdername}</b></FormLabel>
                                </td>
                            </tr>
                            <tr>
                                <td>Balance: </td>
                                <td>
                                    <Form.Control type="number" onChange={event => setBalance(event.target.value)} placeholder="Initial Balance" />
                                    <FormLabel style={{color:"red"}}><b>{errbalance}</b></FormLabel>
                                </td>
                            </tr>
                            <tr>
                                <td>Account No: </td>
                                <td>
                                    <Form.Control type="number" onChange={event => setAccno(event.target.value)} placeholder="Account No" />
                                    <FormLabel style={{color:"red"}}><b>{erraccno}</b></FormLabel>
                                </td>
                            </tr>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" onClick={onCreateValidation}>Connect</Button>
                    </Card.Footer>
                </Card>
            </div>
        </div>
    );
}