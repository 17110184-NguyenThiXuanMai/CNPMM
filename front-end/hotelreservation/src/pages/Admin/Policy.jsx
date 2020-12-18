import React, {Component } from 'react';

import {connect} from 'react-redux';
import {saveService, fetchService, updateService} from '../../services/index';
import {Card, Form, Button, Col, Row} from 'react-bootstrap';
import MyToast from '../../components/Admin/MyToast';
import axios from 'axios';
import {BsListUl, BsArrowCounterclockwise, BsPlusSquareFill} from "react-icons/bs";

class Policy extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            types: [],
            show : false
        };
        this.serviceChange = this.serviceChange.bind(this);
        this.submitService = this.submitService.bind(this);
    }  

    initialState = {
        id:'', title:'', type:'', description:''
    };
    
    componentDidMount() {
        const serviceId = + this.props.match.params.id;
        if(serviceId) {
            this.findServiceById(serviceId);
        }
        this.findAllTypes();
    }

    findServiceById = (serviceId) => {
        this.props.fetchService(serviceId);
        setTimeout(() => {
            let service = this.props.serviceObject.service;
            if(service != null) {
                this.setState({
                    id: service.id,
                    title: service.title,
                    description: service.description,
                });
            }
        }, 1000);
    };

    findAllTypes = () => {
        axios.get("http://localhost:8080/api/test/services/types")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    types: [{value:'', display:'Select Type'}]
                        .concat(data.map(type => {
                            return {value:type, display:type}
                        }))
                });
            });
    };

    resetService = () => {
        this.setState(() => this.initialState);
    };

    // submitService = event => {
    //     event.preventDefault();

    //     const service = {
    //         title: this.state.title,  
    //         type: this.state.type,      
    //         description: this.state.description,
    //     };

    //     this.props.saveService(service,()=>{
    //         // console.log(this.props.savedServiceObject.service); 
    //         this.props.history.push(`/admin/policy/type=${this.state.type}`);
    //         if(this.props.savedServiceObject.service != null) {
    //             console.log('worked');
    //         this.setState({"show":true, "method":"post"},()=>{
    //                 this.setState({"show":false});
    //             });
    //             // setTimeout(() => this.setState({"show":false}), 3000);
    //         } else {
    //             this.setState({"show":false},()=>{
    //                 // this.props.history.push(`/admin/policy/type=${this.state.type}`)
    //             });
                
    //         }
    //         // this.props.history.push(`/admin/policy/type=${this.state.type}`)
    //         console.log(this.props.savedServiceObject.service); 
    //     });
    //     // this.props.saveService(service);
    //     // console.log(service); 
    //     // setTimeout(() => {
    //     //     if(this.props.savedServiceObject.service != null) {
    //     //         this.setState({"show":true, "method":"post"});
    //     //         setTimeout(() => this.setState({"show":false}), 3000);
    //     //     } else {
    //     //         this.setState({"show":false});
    //     //     }
            
    //     // }, 2000); 
    //     // this.setState(this.initialState, () => { 
    //     // this.props.history.push(`/admin/policy/type=${this.state.type}`)})
    //     this.setState(this.initialState)
    //     this.props.history.push(`/admin/policy/type=${this.state.type}`)
    // };


    submitService = event => {
        event.preventDefault();

        const service = {
            title: this.state.title,  
            type: this.state.type,      
            description: this.state.description,
        };

        this.props.saveService(service);
        setTimeout(() => {
            if(!!this.props.savedServiceObject.service) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 3000);
                
            } else {
                this.setState({"show":false});
            }
        }, 2000);
        this.setState(this.initialState);
        this.props.history.push(`/admin/policy/type=${this.state.type}`)
    };

    updateService = event => {
        event.preventDefault();

        const service = {
            title: this.state.title, 
            type: this.state.type,     
            description: this.state.description,
        };
        this.props.updateService(service);
        setTimeout(() => {
            if(this.props.updatedServiceObject.service != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
    
        this.setState(this.initialState);
    };

    serviceChange = event => {
        this.setState({
            [event.target.name]:event.target.value
            
        });
    };

    serviceList = () => {
        return this.props.history.push(`/admin/policy/type=${this.state.type}`);
        //  console.log(this.state.type);
    };

    render() {
        const {title,description, type} = this.state;
        
        return (
            <div className="container">
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Policy Updated Successfully." : "Policy Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"card"}>
                    <Card.Header>
                        {this.state.id ? <BsPlusSquareFill /> : <BsPlusSquareFill /> } {this.state.id ? " Update Policy" :  " Add New Policy"}
                    </Card.Header>
                    <Form onReset={this.resetService} onSubmit={this.state.id ? this.updateService : this.submitService} id="policyFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Title Policy</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="title"
                                        value={title} onChange={this.serviceChange}
                                        className={"bg-dark"}
                                        placeholder="Enter Title Policy" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridType">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control required as="select"
                                        custom onChange={this.serviceChange}
                                        name="type" value={type}
                                        className={"bg-dark"}>
                                        {this.state.types.map(type =>
                                            <option key={type.value} value={type.value}>
                                                {type.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="description"
                                        value={description} onChange={this.serviceChange}
                                        className={"bg-dark"}
                                        placeholder="Enter Description" />
                                </Form.Group>
                            </Form.Row>                        
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Row>
                                <Button size="sm" variant="success" type="submit">
                                    {this.state.id ? "Update" : "Save"}
                                </Button>{' '}
                                <Button size="sm" variant="info" type="reset"> <BsArrowCounterclockwise /> Reset
                                </Button>{' '}
                                <Button size="sm" variant="info" type="button" onClick={this.serviceList.bind()}> <BsListUl /> Policy List
                                </Button>       
                            </Row>             
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        savedServiceObject: state.service,
        serviceObject: state.service,
        updatedServiceObject: state.service
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveService: (service) => dispatch(saveService(service)),
        fetchService: (serviceId) => dispatch(fetchService(serviceId)),
        updateService: (service) => dispatch(updateService(service))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Policy);