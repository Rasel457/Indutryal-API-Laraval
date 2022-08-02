import FinanceNavbar from "../layouts/FinanceNavbar";
import { Form } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import setPageTitle from "../../../setPageTitle";
import { useState } from "react";
import { useHistory } from "react-router";
import { Card } from "react-bootstrap";
import { FormLabel } from "react-bootstrap";
import { API } from "../../../config";
import axios from "axios";


export default function FinanceNewLeave(){
    setPageTitle("Leave-Request | New");
    //REDIRECT IF NOT LOGGED IN
    const history = useHistory();
    if(!localStorage.getItem('type')){
        history.push('/');
    }

    const [type,setType] = useState('');
    const [reason,setReason] = useState('');
    const [startdate,setStartdate] = useState('');
    const [enddate,setEnddate] = useState('');

    const [errtype,setTypeErr] = useState('');
    const [errreason,setReasonErr] = useState('');
    const [errstartdate,setStartdateErr] = useState('');
    const [errenddate,setEnddateErr] = useState('');

    const onCreateLeave = async () => {
        const formdata = new FormData();
        formdata.append('type',type);
        formdata.append('request_description',reason);
        formdata.append('start_time',startdate);
        formdata.append('end_time',enddate);
        await axios.post(API+"financenewleave/"+localStorage.getItem('id'), formdata,{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'undefined',
                'Accept' : 'application/json',
                'user_type' : 'finance'
            }
        }).then((response) => {
                console.log(response);
                history.push('/financeleave')
            }
          ).catch(error => {
                console.log("ERRRR:: "+error);
            });
    }

    //VALIDATION
    const onCreateValidation = ()=>{
        if(type=='' || reason=='' || startdate=='' || enddate==''){
            setTypeErr('* Type Required');
            setReasonErr('* Reason Required');
            setStartdateErr('* Start Date Required');
            setEnddateErr('* End Date Required');
        }
        else{
            onCreateLeave();
        }
    }

    return(
        <div>
            <FinanceNavbar/>
            <div align="center" style={{paddingTop:"20px"}}>
                <Card style={{ width: '70rem', height:'40rem' }}>
                    <Card.Header>Leave-Request - New</Card.Header>
                    <Card.Body>
                    <Table responsive>
                            <tr>
                                <td>Leave Type: </td>
                                <td>
                                    <Form.Control type="text" onChange={event => setType(event.target.value)} placeholder="Leave Type" />
                                    <FormLabel style={{color:"red"}}><b>{errtype}</b></FormLabel>
                                </td>
                            </tr>
                            <tr>
                                <td>Reason (Description): </td>
                                <td>
                                    <Form.Control type="textarea" onChange={event => setReason(event.target.value)} placeholder="Describe Your Reason" />
                                    <FormLabel style={{color:"red"}}><b>{errreason}</b></FormLabel>
                                </td>
                            </tr>
                            <tr>
                                <td>Start Date: </td>
                                <td>
                                    <Form.Control type="date" onChange={event => setStartdate(event.target.value)} placeholder="Start Date" />
                                    <FormLabel style={{color:"red"}}><b>{errstartdate}</b></FormLabel>
                                </td>
                            </tr>
                            <tr>
                                <td>End Date: </td>
                                <td>
                                    <Form.Control type="date" onChange={event => setEnddate(event.target.value)} placeholder="End Date" />
                                    <FormLabel style={{color:"red"}}><b>{errenddate}</b></FormLabel>
                                </td>
                            </tr>
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