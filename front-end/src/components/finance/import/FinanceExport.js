import axios from "axios";
import { API } from "../../../config";
import FinanceNavbar from "../layouts/FinanceNavbar";
import { Card } from "react-bootstrap";
import setPageTitle from "../../../setPageTitle";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { FormLabel } from "react-bootstrap";


export default function FinanceExport(){
    setPageTitle("Import/Export | Export");
    //REDIRECT IF NOT LOGGED IN
    const history = useHistory();
    if(!localStorage.getItem('type')){
        history.push('/');
    }

    const onExport = ()=>{
        axios.get(API+"financeexport/"+localStorage.getItem('id'), { headers: { 'Access-Control-Allow-Origin': '*', 'Accept' : 'application/json', 'user_type':localStorage.getItem('type') } })
        .then((response)=>{console.log(response.data)})
        .catch((error)=>{console.log('ERROR: '+error)});
        history.push('/financeimporthistory');
    }

    return(
        <div>
            <FinanceNavbar/>
            <div align="center" style={{paddingTop:"20px"}}>
                <Card style={{ width: '70rem', height:'40rem' }}>
                    <Card.Header>Import/Export - Export</Card.Header>
                    <Card.Body>
                        <h4><b>These Data Will be Exported</b></h4>
                        <ListGroup.Item>
                            <FormLabel style={{color:"red"}}><b>Assets</b></FormLabel>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <FormLabel style={{color:"red"}}><b>Liabilities</b></FormLabel>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <FormLabel style={{color:"red"}}><b>Expenses</b></FormLabel>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <FormLabel style={{color:"red"}}><b>Import/Export History</b></FormLabel>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <FormLabel style={{color:"red"}}><b>Invoices</b></FormLabel>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <FormLabel style={{color:"red"}}><b>Leave Requests</b></FormLabel>
                        </ListGroup.Item>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" onClick={onExport}>Export</Button>
                    </Card.Footer>
                </Card>
            </div>
        </div>
    );
}