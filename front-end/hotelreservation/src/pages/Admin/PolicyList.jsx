import React, {Component} from 'react';

import {connect} from 'react-redux';
import {deleteService} from '../../services/index';

import './../../css/Style.css';
import {Card, Table,ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import MyToast from '../../components/Admin/MyToast';
import axios from 'axios';
import { BsFillTrashFill, BsPencilSquare, BsSearch, BsFillXCircleFill, BsList, BsChevronBarRight, BsChevronRight, BsChevronLeft, BsChevronBarLeft} from "react-icons/bs";

class PolicyList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            services : [],
            search : '',
            currentPage : 1,
            policiesPerPage : 5,
            sortDir: "asc",
            // listServices:[],
        };
    }

    sortData = () => {
        setTimeout(() => {
            this.state.sortDir === "asc" ? this.setState({sortDir: "desc"}) : this.setState({sortDir: "asc"});
            this.findAllServices(this.state.currentPage);
        }, 500);
    };

    componentDidMount() {
        this.findAllServices(this.state.currentPage);
        console.log(this.props.match.params.type);
        // const typeParam = this.props.match.params.type;
        // if(this.props.match.params.type==="all"){
        //     this.setState({
        //         listServices:this.state.services
        //     })
        // }else{
        //     this.setState({
        //         listServices:this.state.services.filter(item=>item.type ===typeParam)
        //     })
        // }
    }

    findAllServices(currentPage) {
        currentPage -= 1;
        axios.get("http://localhost:8080/api/test/services?pageNumber="+currentPage+"&pageSize="+this.state.policiesPerPage+"&sortBy=title&sortDir="+this.state.sortDir)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    services: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    deleteService = (serviceId) => {
        this.props.deleteService(serviceId);
        setTimeout(() => {
            if(this.props.serviceObject != null) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 3000);
                this.findAllPolicies(this.state.currentPage);
            } else {
                this.setState({"show":false});
            }
        }, 1000);
    };

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        if(this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllPolicies(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if(this.state.currentPage > firstPage) {
            if(this.state.search) {
                this.searchData(firstPage);
            } else {
                this.findAllPolicies(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if(this.state.currentPage > prevPage) {
            if(this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllPolicies(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.policiesPerPage);
        if(this.state.currentPage < condition) {
            if(this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllPolicies(condition);
            }
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.policiesPerPage)) {
            if(this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllPolicies(this.state.currentPage + 1);
            }
        }
    };

    searchChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    cancelSearch = () => {
        this.setState({"search" : ''});
        this.findAllPolicies(this.state.currentPage);
    };

    searchData = (currentPage) => {
        currentPage -= 1;
        axios.get("http://localhost:8080/api/test/services/search/"+this.state.search+"?page="+currentPage+"&size="+this.state.policiesPerPage)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    services: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    add = () => {
        return this.props.history.push("/admin/addpolicy");
    };

    checkService = (Code) => {
        if (Code === true) {
            return (
                <td className="text-center">
                    <div>True</div>
                </td>
            );
        } else {
            return (
                <td className="text-center">
                    <div>False</div>
                </td>
            );
        }
    };

    render() {
        const {services, currentPage, totalPages, search} = this.state;
        const typeParam = this.props.match.params.type;
        return (
            <div className="container">
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Policy Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"card"}>
                    <Card.Header>
                        <div style={{"float":"left"}}> <BsList /> Policy List
                        <InputGroup size="sm">
                            <FormControl placeholder="Search" name="search" value={search}
                                className={"info-border bg-dark"}                                   
                                onChange={this.searchChange} />                             
                            <InputGroup.Append>
                                <Button size="sm" variant="outline-info" type="button" onClick={this.searchData}>
                                <BsSearch />
                                </Button>
                                <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}>
                                    <BsFillXCircleFill />
                                </Button>
                            </InputGroup.Append>
                            </InputGroup>
                        </div>
                        <div style={{"float":"right"}}>
                             <Button size="sm" variant="info" type="button" onClick={this.add.bind()}>
                                Add
                                 </Button>                        
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                  <th>Title</th>
                                  <th>Type</th>
                                  <th>Description</th>
                                </tr>
                              </thead>
                              <tbody>                                
                                {
                                    services.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="2">No Policies Available.</td>
                                    </tr> :
                                    services.filter(item=>item.type ===typeParam).map((service) => (                                                                                   
                                        <tr key={service.id}>                                  
                                        <td>{service.title}</td>    
                                        <td>{service.type}</td>                                        
                                        <td>{service.description}</td>                                                                       
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"admin/editpolicy/"+service.id} className="btn btn-sm btn-outline-primary"><BsPencilSquare /></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteService.bind(this, service.id)}><BsFillTrashFill /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    ))
                                }
                              </tbody>
                        </Table>
                    </Card.Body>
                    {services.length > 0 ?
                        <Card.Footer>
                            <div style={{"float":"left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{"float":"right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}> <BsChevronBarLeft />
                                           First
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}> <BsChevronLeft />
                                          Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl className={"page-num bg-dark"} name="currentPage" value={currentPage}
                                        onChange={this.changePage}/>
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}> 
                                             Next <BsChevronRight />
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}> <BsChevronBarRight />
                                           Last
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Card.Footer> : null
                     }
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        serviceObject: state.service
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteService: (serviceId) => dispatch(deleteService(serviceId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PolicyList);