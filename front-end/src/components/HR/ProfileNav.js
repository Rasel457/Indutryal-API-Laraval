import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { React } from 'react';
import Profile from './Profile';
import EditProfile from './EditProfile';
import ChangePass from './ChangePass';
import UploadImage from './UploadImage';
import { useEffect } from 'react';
import { useHistory} from 'react-router-dom'

const ProfileNav=({title})=>{
    const history = useHistory();
    useEffect(()=>{
        if(!localStorage.getItem('username'))
        {
            history.push('/');
        }
    },[])
    function logout()
    {
        localStorage.clear();
        history.push('/');
    }

    return(
        <>
            <header>
                <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
                    <Container>
                        <Link to ="/HR" className="navbar-brand" >Industryal</Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            </Nav>
                            <Nav>
                            <Link to="/HR/user/profile" className="navbar-brand">Profile</Link>
                            <Nav.Link onClick={logout} className="navbar-brand">Logout</Nav.Link>
                            
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <div className="row">
                <div className="col-2" >
                <br></br>
                    <Nav className=" navbar border-dark">
                        <ul className="navbar-nav ml-2">
                            <li className="nav-item"><Link to='/HR/user/profile/edit' className="nav-link btn btn-outline-dark btn-block btm-sm ml-5 mt-2 " >Edit Profile</Link></li>
                            <li className="nav-item"><Link to='/HR/user/change/password' className="nav-link btn btn-outline-dark btn-block mt-2" >Change Password</Link></li>
                            <li className="nav-item"><Link to='/HR/user/upload/image' className="nav-link btn btn-outline-dark btn-block mt-2" >Upload Profile Pic</Link></li>
                            
                        </ul>
                    </Nav>
                    </div>
                <div className="col-10">
                    <div className="info-section p-3 text-black ">
                        {(()=>{
                            if(title === 'Profile')
                            {
                                return(
                                    <Profile />
                                )
                            }
                            else if(title==='Update Profile')
                            {
                                return(
                                    <EditProfile />
                                )
                               
                            }
                            else if(title==='Change Password')
                            {
                                return(
                                    <ChangePass />
                                )
                               
                            }
                            else{
                                return(
                                    <UploadImage />
                                )
                            } 
                        })()} 

                    </div>
                </div>
            </div>
            <br></br><br></br><br></br>
            <footer className="bg-dark text-white mt-2 p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                        <p class="lead text-center">
                            Copyright &copy; &nbsp;
                            <span id="year">2020-2021</span> -
                            Industryal
                        </p>
                        </div>
                    </div>
                </div>
            </footer> 

            
        
        </>
    )
}
export default ProfileNav;