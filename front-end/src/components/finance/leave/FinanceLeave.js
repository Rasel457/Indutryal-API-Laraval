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

export default function FinanceLeave(){
    setPageTitle("Leave-Request | All");
    //REDIRECT IF NOT LOGGED IN
    const history = useHistory();
    if(!localStorage.getItem('type')){
        history.push('/');
    }
    const [leaves,setLeaves] = useState([]);

    useGet(API+'financeleaves/'+localStorage.getItem('id'),setLeaves);

    const onDelete = (id)=>{
        axios.get(API+"financeleavedelete/"+id, { headers: { 'Access-Control-Allow-Origin': '*', 'Accept' : 'application/json', 'user_type':localStorage.getItem('type') } })
        .then((response)=>{console.log(response.data)})
        .catch((error)=>{console.log('ERROR: '+error)});
        const data = leaves.filter((leave)=>leave.id !== id);
        setLeaves(data);
    }

    return(
        <div>
            <FinanceNavbar/>
            <div align="center" style={{paddingTop:"20px"}}>
                <Card style={{ width: '70rem', height:'40rem' }}>
                    <Card.Header>Leave-Request - All</Card.Header>
                    <div style={{overflow:'scroll'}}>
                    <Card.Body>
                        <Table striped responsive bordered>
                            <tr>
                                <th>Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Requested At</th>
                                <th>Status</th>
                                <th>Delete</th>
                            </tr>
                            {
                                leaves.length?(
                                    leaves.map((leave)=>{
                                        return(
                                            <tr>
                                                <td>{leave.type}</td>
                                                <td>{leave.start_time}</td>
                                                <td>{leave.end_time}</td>
                                                <td>{leave.request_made}</td>
                                                <td>{leave.status}</td>
                                                <td><Button variant="danger" onClick={()=>{onDelete(leave.id)}}>Delete</Button></td>
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