import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class AddEmpModal extends Component {
    constructor(props) {
        super(props);
        this.state={
            deps:[],
            snackbaropen:false,
            snackbarmsg:''
        }

        this.submitHandler=this.submitHandler.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:63208/api/department').then(response => response.json()).then(data=>{
            this.setState({
                deps:data
            });
            
        })
    }
    

    submitHandler(e) {
        e.preventDefault();
        //Enter api url below
        const newDOJ=e.target.DOJ.value.toString();
        console.log(newDOJ);
        axios.post(`http://localhost:63208/api/employee`,{
            EmployeeID:null,
            EmployeeName:e.target.EmployeeName.value,
            Department:e.target.Department.value,
            MailID:e.target.MailID.value,
            DOJ:newDOJ
        })
        .then(res=>{
            this.setState({
                snackbaropen:true,
                snackbarmsg:res.data
            });
            this.props.onHide();
            //alert(res.data);
        })
        .catch(function (error) {
            this.setState({
                snackbaropen:true,
                snackbarmsg:error
            });
            alert(error);
          });
        
        
    }

    snackbarClose = () =>{
        this.setState({
            snackbaropen:false
        });
    }


    render() {
        return (
            <div className="container">
                <Snackbar 
                anchorOrigin={{vertical:'bottom', horizontal:'center'}}
                open={this.state.snackbaropen}
                autoHideDuration={3000}
                onClose={this.snackbarClose}
                message={<span id="msg-id">{this.state.snackbarmsg}</span>}
                action={[
                    <IconButton key="close" aria-label="Close" color="inherit" onClick={this.snackbarClose}>
                        X
                    </IconButton>
                ]}
                />
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add a new employee
        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        

                            <Row>
                                <Col sm={6}>
                                    <Form onSubmit={this.submitHandler}>
                                        <Form.Group controlId="EmployeeName">
                                            <Form.Label>
                                                Type employee name below:
                                        </Form.Label>
                                            <Form.Control type="text" name="EmployeeName" required placeholder="Employee name" />
                                        </Form.Group>
                                        <Form.Group controlId="Department">
                                            <Form.Label>
                                                Select department name below:
                                        </Form.Label>
                                            <Form.Control as="select">
                                                {this.state.deps.map(dep=>
                                                    <option key={dep.DepartmentID} value={dep.DepartmentName}>
                                                        {dep.DepartmentName}
                                                    </option>
                                                )}
                                                
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="MailID">
                                            <Form.Label>
                                                Type mail address below:
                                        </Form.Label>
                                            <Form.Control type="text" name="MailID" required placeholder="example@domain.com" />
                                        </Form.Group>
                                        <Form.Group controlId="DOJ">
                                            <Form.Label>
                                                Select date of join below:
                                        </Form.Label>
                                            <Form.Control type="date" name="DOJ" required placeholder="Date of join" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Button variant="primary" type="submit">
                                                Add
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
