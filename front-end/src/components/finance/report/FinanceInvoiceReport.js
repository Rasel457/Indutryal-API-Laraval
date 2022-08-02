import useGet from "../requests/useGet";
import { useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import FinanceNavbar from "../layouts/FinanceNavbar";
import setPageTitle from "../../../setPageTitle";
import { useHistory } from "react-router";
import { API } from "../../../config";

export default function FinancialInvoiceReport(){
    setPageTitle("Report | Invoice");
    //REDIRECT IF NOT LOGGED IN
    const history = useHistory();
    if(!localStorage.getItem('type')){
        history.push('/');
    }
    const [reports,setReports] = useState([]);

    useGet(API+'financereportinvoices/'+localStorage.getItem('id'),setReports);

    const onReportGenerate = async ()=>{
        await axios.get(API+"financereportgenerateinvoice/"+localStorage.getItem('id'), { headers: { 'Access-Control-Allow-Origin': '*', 'Accept' : 'application/json', 'user_type':localStorage.getItem('type') } })
        .then((response)=>{console.log(response.data)})
        .catch((error)=>{console.log('ERROR: '+error)});
        window.location.reload();
    }

    return(
        <div>
            <FinanceNavbar/>
            <div align="center" style={{paddingTop:"20px"}}>
                <Card style={{ width: '70rem', height:'40rem' }}>
                    <Card.Header>Report - Invoice</Card.Header>
                    <div style={{overflow:'scroll'}}>
                    <Card.Body>
                        <Table striped responsive bordered>
                            <tr>
                                <th>Type</th>
                                <th>Weekly</th>
                                <th>Monthly</th>
                            </tr>
                            {
                                reports.length?(
                                    reports.map((report)=>{
                                        return(
                                            <tr>
                                                <td>{report.type}</td>
                                                <td><Button variant="success"><a href={"http://127.0.0.1:8000/upload/Finance/Report/"+report.weekly}  target="_blank" download>Download</a></Button></td>
                                                <td><Button variant="success"><a href={"http://127.0.0.1:8000/upload/Finance/Report/"+report.monthly}  target="_blank" download>Download</a></Button></td>
                                            </tr>
                                        )
                                    })
                                ):''
                            }
                        </Table>
                    </Card.Body>
                    </div>
                    <Card.Footer>
                        <Button variant="primary" onClick={onReportGenerate}>Generate</Button>
                    </Card.Footer>
                </Card>
            </div>
        </div>
    );
}