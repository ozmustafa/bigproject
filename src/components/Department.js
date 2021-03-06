import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { AddDepModal } from './AddDepModal';
import { EditDepModal } from './EditDepModal';



export class Department extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deps: [],
            addModalShow: false,
            editModalShow: false
        };
    }

    refreshList() {
        fetch('http://localhost:63208/api/department')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({
                    deps: data
                })
            });
    }

    deleteDep(depid){   
        if(window.confirm('Do you want to delete this row?')) {
            fetch('http://localhost:63208/api/department/'+depid,{
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
        const { deps, depID, depName } = this.state;
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
                            <th>Department ID</th>
                            <th>Department Name</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep =>
                            <tr key={dep.DepartmentID}>
                                <td>{dep.DepartmentID}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button onClick={() =>
                                            this.setState({
                                                editModalShow: true,
                                                depID: dep.DepartmentID,
                                                depName: dep.DepartmentName
                                            })}>
                                            Edit
                                        </Button>
                                        <Button className="ml-2" variant="danger" onClick={()=>this.deleteDep(dep.DepartmentID)}>
                                            Delete
                                        </Button>
                                    </ButtonToolbar>
                                    <EditDepModal
                                        show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        depID={depID}
                                        depName={depName}
                                    />
                                </td>
                            </tr>
                        )
                        }
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button onClick={showModal}>Add Department</Button>
                </ButtonToolbar>
                <AddDepModal show={this.state.addModalShow} onHide={addModalClose} />
            </div>

        )
    }
}
