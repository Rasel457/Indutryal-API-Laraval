import axios from "axios";
import { API } from "../../../config";
import FinanceNavbar from "../layouts/FinanceNavbar";
import { Card } from "react-bootstrap";
import setPageTitle from "../../../setPageTitle";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { FormLabel } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";


export default function FinanceImport(){
    setPageTitle("Import/Export | Import");
    //REDIRECT IF NOT LOGGED IN
    const history = useHistory();
    if(!localStorage.getItem('type')){
        history.push('/');
    }

    const [myfile,setMyfile] = useState('');
    const [errmyfile,setMyfileErr] = useState('');

    //POST DATA
    const onImport = async () => {
        const formdata = new FormData();
        var imagefile = document.querySelector('#file');
        formdata.append("importfile", imagefile.files[0]);
        await axios.post(API+"financeimport/"+localStorage.getItem('id'), formdata,{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data',
                'Accept' : 'application/json',
                'user_type' : 'finance'
            }
        }).then((response) => {
                console.log(response);
                history.push('/financeimporthistory')
            }
          ).catch(error => {
                console.log("ERRRR:: "+error);
                setMyfileErr('* JSON File Invalid');
            });
    }

    //VALIDATION
    const onImportValidation = ()=>{
        if(myfile==''){
            setMyfileErr('* File Required');
        }
        else{
            onImport();
        }
    }

    return(
        <div>
            <FinanceNavbar/>
            <div align="center" style={{paddingTop:"20px"}}>
                <Card style={{ width: '70rem', height:'40rem' }}>
                    <Card.Header>Import/Export - Import</Card.Header>
                    <Card.Body>
                        <ListGroup.Item>
                            <Form.Control type="file" name="file" id="file" onChange={event => setMyfile(event.target.value)} placeholder="JSON File" accept="application/JSON"/>
                            <FormLabel style={{color:"red"}}><b>{errmyfile}</b></FormLabel>
                        </ListGroup.Item>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" onClick={onImportValidation}>Import</Button>
                    </Card.Footer>
                </Card>
            </div>
        </div>
    );
}