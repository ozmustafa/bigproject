import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

export class AddDepModal extends Component {
    constructor(props) {
        super(props);
    }

    submitHandler(e) {
        e.preventDefault();
        console.log(e.target.DepartmentName.value);
        //Enter api url below
        axios.post(`http://localhost:63208/api/department`,{
            DepartmentID:null,
            DepartmentName:e.target.DepartmentName.value
        })
        .then(res=>{
            alert(res.data);
        })
        .catch(function (error) {
            alert(error);
          });
        
        
    }
    render() {
        return (
            <div>
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
                        <div className="container">

                            <Row>
                                <Col sm={6}>
                                    <Form onSubmit={this.submitHandler}>
                                        <Form.Group>
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
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
