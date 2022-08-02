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

export default function FinanceImportHistory(){
    setPageTitle("Import/Export | History");
    //REDIRECT IF NOT LOGGED IN
    const history = useHistory();
    if(!localStorage.getItem('type')){
        history.push('/');
    }
    const [histories,setHistories] = useState([]);

    useGet(API+'financeexporthistory/'+localStorage.getItem('id'),setHistories);

    return(
        <div>
            <FinanceNavbar/>
            <div align="center" style={{paddingTop:"20px"}}>
                <Card style={{ width: '70rem', height:'40rem' }}>
                    <Card.Header>Import/Export - History</Card.Header>
                    <div style={{overflow:'scroll'}}>
                    <Card.Body>
                        <Table striped responsive bordered>
                            <tr>
                                <th>Date</th>
                                <th>Action</th>
                                <th>Download</th>
                            </tr>
                            {
                                histories.length?(
                                    histories.map((history)=>{
                                        return(
                                            <tr>
                                                <td>{history.date}</td>
                                                <td>{history.action}</td>
                                                {history.file?(<td><Button variant="success"><a href={"http://127.0.0.1:8000/upload/Finance/Export/"+history.file}  target="_blank" download>Download</a></Button></td>):''}
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