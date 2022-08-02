import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { React } from 'react';
import AddUser from './AddUser';
import Home from './Home';
import UserList from './UserList';
import EditUser from './EditUser';
import AddEmployee from './AddEmployee';
import AddGroup from './AddGroup';
import EmployeeList from './EmployeeList';
import EditEmployee from './EditEmployee';
import DeleteEmp from './DeleteEmp';
import EmpSchedule from './EmpSchedule';
import MyLeave from './MyLeave';
import PendingList from './PendingList';
import LeaveList from './LeaveList';
import Approve from './Approve';
import Reject from './Reject';
import Expense from './Expense';
import ExpenseList from './ExpenseList';
import EditExpense from './EditExpense';
import DeleteExp from './DeleteExp';
import ExpenseState from './ExpenseState';
import { useEffect } from 'react';
import { useHistory} from 'react-router-dom'


const Navb=({title})=>{
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
                            <li className="nav-item"><Link to='/HR/user/create' className="nav-link btn btn-outline-dark btn-block btm-sm ml-5 mt-2 " >New user</Link></li>
                            <li className="nav-item"><Link to='/HR/user/list' className="nav-link btn btn-outline-dark btn-block mt-2" >User List</Link></li>
                            <li className="nav-item"><Link to='/HR/employee/create' className="nav-link btn btn-outline-dark btn-block mt-2" >New Employee</Link></li>
                            <li className="nav-item"><Link to='/HR/employee/group' className="nav-link btn btn-outline-dark btn-block mt-2" >Add group</Link></li>
                            <li className="nav-item"><Link to='/HR/employee/list' className="nav-link btn btn-outline-dark btn-block mt-2" >Employee List</Link></li>
                            <li className="nav-item"><Link to='/HR/employee/schedule' className="nav-link btn btn-outline-dark btn-block mt-2" >Schedules</Link></li>
                            <li className="nav-item"><Link to='/HR/leave/request' className="nav-link btn btn-outline-dark btn-block mt-2" >Leave Request</Link></li>
                            <li className="nav-item"><Link to='/HR/leave/pending/list' className="nav-link btn btn-outline-dark btn-block mt-2" >Pending List</Link></li>
                            <li className="nav-item"><Link to='/HR/leave/request/list' className="nav-link btn btn-outline-dark btn-block mt-2" >Leave Request List</Link></li>
                            <li className="nav-item"><Link to='/HR/expense/report' className="nav-link btn btn-outline-dark btn-block mt-2" > Expense Report</Link></li>
                            <li className="nav-item"><Link to='/HR/expense/list' className="nav-link btn btn-outline-dark btn-block mt-2" > Expense  Report List</Link></li>
                            <li className="nav-item"><Link to='/HR/expense/statistic' className="nav-link btn btn-outline-dark btn-block mt-2" >Expense Statistic</Link></li>
                        </ul>
                    </Nav>
                </div>
                <div className="col-10">
                    <div className="info-section p-3 text-black ">
                        
                        {(()=>{
                            if(title === 'Pie Chart')
                            {
                                return(
                                    <Home />
                                )
                            }
                            else if (title==='New User')
                            {
                                return(
                                    <AddUser />
                                )
                            }
                            else if (title==='User List')
                            {
                                return(
                                    <UserList />
                                )
                            }
                            else if(title ==='Update User')
                            {
                                return(
                                    <EditUser />
                                )
                            }
                            else if(title ==='New Employee')
                            {
                                return(
                                    <AddEmployee />
                                )
                            }
                            else if(title==='New Group')
                            {
                                return(
                                    <AddGroup />
                                )
                            }
                            else if(title==='Employee List')
                            {
                                return(
                                    <EmployeeList />
                                )
                            }
                            else if(title==='Update Employee')
                            {
                                return(
                                    <EditEmployee />
                                )
                            }
                            else if(title==='Delete Employee')
                            {
                                return(
                                    <DeleteEmp />
                                )
                            }
                            else if(title==='Employees Schedule')
                            {
                                return(
                                    <EmpSchedule/>
                                )
                            }
                            else if (title==='Leave Request')
                            {
                                return(
                                    <MyLeave />
                                )
                            }
                            else if (title==='Pending List')
                            {
                                return(
                                    <PendingList />
                                )
                            }
                            else if (title==='Leave Request List')
                            {
                                return(
                                    <LeaveList />
                                )
                               
                            }
                            else if (title ==='Approved Leave Request')
                            {
                                return(
                                    <Approve />
                                )
                            }
                            else if (title ==='Reject Leave Request')
                            {
                                return(
                                    <Reject />
                                )
                            }
                            else if (title ==='Expense Report')
                            {
                                return(
                                    <Expense />
                                )
                            }
                            else if (title ==='Expense Report List')
                            {
                                return(
                                    <ExpenseList />
                                )
                            }
                            else if(title==='Update Expense Report')
                            {
                                return(
                                    <EditExpense />
                                )
                            }
                            else if(title==='Delete Expense Report')
                            {
                                return(
                                    <DeleteExp />
                                )
                            }
                            else{
                                return(
                                    <ExpenseState />
                                )
                            }
                        })()}
                    </div>
                </div>
            </div>            
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
export default Navb;