import React, {Component } from 'react';

import {connect} from 'react-redux';
import {savePolicy, fetchPolicy, updatePolicy} from '../../services/index';
import {Card, Form, Button, Col, Row} from 'react-bootstrap';
import MyToast from '../../components/Admin/MyToast';
import {BsListUl, BsArrowCounterclockwise, BsPlusSquareFill} from "react-icons/bs";

class Policy extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            show : false
        };
        this.policyChange = this.policyChange.bind(this);
        this.submitPolicy = this.submitPolicy.bind(this);
    }  

    initialState = {
        id:'', title:'', description:''
    };
    
    componentDidMount() {
        const policyId = + this.props.match.params.id;
        if(policyId) {
            this.findPolicyById(policyId);
        }
    }

    findPolicyById = (policyId) => {
        this.props.fetchPolicy(policyId);
        setTimeout(() => {
            let policy = this.props.policyObject.policy;
            if(policy != null) {
                this.setState({
                    id: policy.id,
                    title: policy.title,
                    description: policy.description,
                });
            }
        }, 1000);
    };

    resetPolicy = () => {
        this.setState(() => this.initialState);
    };

    submitPolicy = event => {
        event.preventDefault();

        const policy = {
            title: this.state.title,        
            description: this.state.description,
        };

        this.props.savePolicy(policy);
        setTimeout(() => {
            if(this.props.savedPolicyObject.policy != null) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);

        this.setState(this.initialState);
    };

    updatePolicy = event => {
        event.preventDefault();

        const policy = {
            title: this.state.title,      
            description: this.state.description,
        };
        this.props.updatePolicy(policy);
        setTimeout(() => {
            if(this.props.updatedPolicyObject.policy != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
    
        this.setState(this.initialState);
    };

    policyChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    policyList = () => {
        return this.props.history.push("/admin/policy");
    };

    render() {
        const {title,description} = this.state;
        
        return (
            <div className="container">
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Policy Updated Successfully." : "Policy Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"card"}>
                    <Card.Header>
                        {this.state.id ? <BsPlusSquareFill /> : <BsPlusSquareFill /> } {this.state.id ? " Update Policy" :  " Add New Policy"}
                    </Card.Header>
                    <Form onReset={this.resetPolicy} onSubmit={this.state.id ? this.updatePolicy : this.submitPolicy} id="policyFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Title Policy</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="title"
                                        value={title} onChange={this.policyChange}
                                        className={"bg-dark"}
                                        placeholder="Enter Title Policy" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="description"
                                        value={description} onChange={this.policyChange}
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
                                <Button size="sm" variant="info" type="button" onClick={this.policyList.bind()}> <BsListUl /> Policy List
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
        savedPolicyObject: state.policy,
        policyObject: state.policy,
        updatedPolicyObject: state.policy
    };
};

const mapDispatchToProps = dispatch => {
    return {
        savePolicy: (policy) => dispatch(savePolicy(policy)),
        fetchPolicy: (policyId) => dispatch(fetchPolicy(policyId)),
        updatePolicy: (policy) => dispatch(updatePolicy(policy))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Policy);