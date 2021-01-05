import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { AddDepModal } from './AddDepModal';


export class Department extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deps: [],
            addModalShow:false
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

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }
    
    
    render() {
        const { deps } = this.state;
        let addModalClose = () => {
            this.setState({
                addModalShow:false
            });
        }

        let showModal = () => {
                this.setState({
                    addModalShow:true
                });
        }
        return (
            <div>
                <Table striped bordered hover size="sm" variant="dark" className="mt-4 ">
                    <thead>
                        <tr>
                            <th>Department ID</th>
                            <th>Department Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep =>
                            <tr key={dep.DepartmentID}>
                                <td>{dep.DepartmentID}</td>
                                <td>{dep.DepartmentName}</td>
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
