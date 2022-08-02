import FinanceNavbar from "../layouts/FinanceNavbar";
import useGet from "../requests/useGet";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { API } from "../../../config";
import setPageTitle from "../../../setPageTitle";
import { useHistory } from "react-router";
import { ListGroup } from "react-bootstrap";
import { FormLabel } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function FinanceProfile(){
    setPageTitle("Finance | Profile");
    //REDIRECT IF NOT LOGGED IN
    const history = useHistory();
    if(!localStorage.getItem('type')){
        history.push('/');
    }
    const [profile,setProfile] = useState('');
    useGet(API+'financeprofile/'+localStorage.getItem('id'),setProfile);
    const [myfile,setMyfile] = useState('');
    const [errmyfile,setMyfileErr] = useState('');

    //POST DATA
    const onUpdate = async () => {
        const formdata = new FormData();
        var imagefile = document.querySelector('#file');
        formdata.append("pp", imagefile.files[0]);
        await axios.post(API+"financeprofile/"+localStorage.getItem('id'), formdata,{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data',
                'Accept' : 'application/json',
                'user_type' : 'finance'
            }
        }).then((response) => {
                console.log(response);
                window.location.reload();
            }
          ).catch(error => {
                console.log("ERRRR:: "+error);
                setMyfileErr('* Image File Invalid');
            });
    }

    //VALIDATION
    const onUpdateValidation = ()=>{
        if(myfile==''){
            setMyfileErr('* Profile Picture Required');
        }
        else{
            onUpdate();
        }
    }

    return(
        <div>
            <FinanceNavbar/>
            <div align="center" style={{paddingTop:"20px"}}>
                <Card style={{ width: '70rem', height:'40rem' }}>
                    <Card.Header>My - Profile</Card.Header>
                    <Card.Body>
                        <ListGroup.Item>
                            <Image style={{height:"150px", width:"150px"}} rounded src={'http://127.0.0.1:8000/upload/Users/'+profile.profile_pic}></Image>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Form.Control name="file" id="file" type="file" onChange={event => setMyfile(event.target.value)} placeholder="Profile Picture" accept="image/*"/>
                            <FormLabel style={{color:"red"}}><b>{errmyfile}</b></FormLabel>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <FormLabel><b>Fullname: {profile.firstname+' '+profile.lastname}</b></FormLabel>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <FormLabel><b>Username: {profile.username}</b></FormLabel>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <FormLabel><b>Email: {profile.email}</b></FormLabel>
                        </ListGroup.Item>
                    <Card.Footer>
                        <Button variant="primary" onClick={onUpdateValidation}>Update</Button>
                    </Card.Footer>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}