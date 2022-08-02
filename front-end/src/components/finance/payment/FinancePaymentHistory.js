import FinanceNavbar from "../layouts/FinanceNavbar";
import useGet from "../requests/useGet";
import { Card } from "react-bootstrap";
import { Table } from "react-bootstrap";
import setPageTitle from "../../../setPageTitle";
import { useHistory } from "react-router";
import { useState } from "react";
import { API } from "../../../config";

export default function FinancePaymentHistory(){
    setPageTitle("Payment | History");
    //REDIRECT IF NOT LOGGED IN
    const history = useHistory();
    if(!localStorage.getItem('type')){
        history.push('/');
    }
    const [histories,setHistories] = useState([]);

    useGet(API+'financepaymenthistory/'+localStorage.getItem('id'),setHistories);

    return(
        <div>
            <FinanceNavbar/>
            <div align="center" style={{paddingTop:"20px"}}>
                <Card style={{ width: '70rem', height:'40rem' }}>
                    <Card.Header>Payment History</Card.Header>
                    <div style={{overflow:'scroll'}}>
                    <Card.Body>
                        <Table striped responsive bordered>
                            <tr>
                                <th>Type (Debit/Credit)</th>
                                <th>Amount</th>
                            </tr>
                            {
                                histories.length?(
                                    histories.map((hist)=>{
                                        return(
                                            <tr>
                                                <td>{hist.type}</td>
                                                <td>{hist.amount}</td>
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