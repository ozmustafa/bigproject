import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { AddEmpModal } from './AddEmpModal';
import { EditEmpModal } from './EditEmpModal';

export  class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emps: [],
            addModalShow: false,
            editModalShow: false
        };
    }

    refreshList() {
        fetch('http://localhost:63208/api/employee')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({
                    emps: data
                })
            });
    }

    deleteEmp(empid){   
        if(window.confirm('Do you want to delete this row?')) {
            fetch('http://localhost:63208/api/employee/'+empid,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }); 
        }
           
        
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }
    render() {
        const { emps, empid, empname, depm, email, doj } = this.state;
        let addModalClose = () => {
            this.setState({
                addModalShow: false
            });
        }

        let editModalClose = () => {
            this.setState({
                editModalShow: false
            });
        }

        let showModal = () => {
            this.setState({
                addModalShow: true
            });
        }
        return (
            <div>
                <Table striped bordered hover size="sm" variant="dark" className="mt-4 ">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Mail Address</th>
                            <th>Date Of Join</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp =>
                            <tr key={emp.EmployeeID}>
                                <td>{emp.EmployeeID}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.MailID}</td>
                                <td>{emp.DOJ}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button onClick={() =>
                                            this.setState({
                                                editModalShow: true,
                                                empid: emp.EmployeeID,
                                                empname: emp.EmployeeName,
                                                depm:emp.Department,
                                                email:emp.MailID,
                                                doj:emp.DOJ

                                            })}>
                                            Edit
                                        </Button>
                                        <Button className="ml-2" variant="danger" onClick={()=>this.deleteEmp(emp.EmployeeID)}>
                                            Delete
                                        </Button>
                                    </ButtonToolbar>
                                    <EditEmpModal
                                        show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        empid={empid}
                                        empname={empname}
                                        depm={depm}
                                        email={email}
                                        doj={doj}
                                    />
                                </td>
                            </tr>
                        )
                        }
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button onClick={showModal}>Add Employee</Button>
                </ButtonToolbar>
                <AddEmpModal show={this.state.addModalShow} onHide={addModalClose} />
            </div>
        )
    }
}
