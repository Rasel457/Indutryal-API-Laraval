import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TableEmails = () => {

    const[items, setItems] = useState([]);
    const[error, setError] = useState();

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/sales/email/all")
            .then(response=>{
                setItems(response.data)
                setError("success");
            })
            .catch((error)=>{
                setError("failed");
            }
            );            
    }, [])

    return (
        <div>
            <table className="CusTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Sent By</th>
                        <th>Sent To</th>
                        <th>Content</th>
                        <th>Sent</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        error=="failed"
                        ?
                        <tr><td colSpan="5">Failed to Load</td></tr>
                        :
                        items == false
                        ?
                        <tr><td colSpan="5">Loading</td></tr>
                        :
                        items.length>0
                        ?
                        items.map(email=>{
                            return (
                                <tr key={email.id}>
                                    <td>{email.id}</td>
                                    <td>{email.sent_from}</td>
                                    <td>{email.sent_to}</td>
                                    <td>{email.content}</td>
                                    <td>{email.sent_datetime}</td>
                                    <td>{email.status}</td>
                                    <td>
                                        <Link className="LinkBtn" to={`/sales/email/${email.id}`} >Read</Link>
                                        {/* <input name="quantity" value={} style={{width:"40px"}} type="numeric"/> */}
                                        {/* <input value={email.id} onChange={onCheck} type="checkbox"/> */}
                                    </td>
                                </tr>
                            );
                        })
                        :
                        <tr><td colSpan="7">No such  exists</td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableEmails
