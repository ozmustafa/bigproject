import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class AddDepModal extends Component {
    constructor(props) {
        super(props);
        this.state={
            snackbaropen:false,
            snackbarmsg:''
        }

        this.submitHandler=this.submitHandler.bind(this);
    }

    submitHandler(e) {
        e.preventDefault();
        //Enter api url below
        axios.post(`http://localhost:63208/api/department`,{
            DepartmentID:null,
            DepartmentName:e.target.DepartmentName.value
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
                            Add a new department
        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        

                            <Row>
                                <Col sm={6}>
                                    <Form onSubmit={this.submitHandler}>
                                        <Form.Group  controlId="DepartmentName">
                                            <Form.Label>
                                                Type department name below:
                                        </Form.Label>
                                            <Form.Control type="text" name="DepartmentName" required placeholder="Department name" />
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
