import React, {Component} from 'react';

import {connect} from 'react-redux';
import {deleteRoomType} from '../../services/index';

import './../../css/Style.css';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import MyToast from '../../components/Admin/MyToast';
import axios from 'axios';
import { BsFillTrashFill, BsPencilSquare, BsSearch, BsFillXCircleFill, BsList, BsChevronBarRight, BsChevronRight, BsChevronLeft, BsChevronBarLeft} from "react-icons/bs";

class RoomTypeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomTypes : [],
            search : '',
            currentPage : 1,
            roomTypesPerPage : 5,
            sortDir: "asc",
            
        };
    }

    sortData = () => {
        setTimeout(() => {
            this.state.sortDir === "asc" ? this.setState({sortDir: "desc"}) : this.setState({sortDir: "asc"});
            this.findAllRoomTypes(this.state.currentPage);
        }, 500);
    };

    componentDidMount() {
        this.findAllRoomTypes(this.state.currentPage);
    }

    /*findAllBooks() {
        fetch("http://localhost:8080/rest/books")
            .then(response => response.json())
            .then((data) => {
                this.setState({books: data});
            });
    };*/

    findAllRoomTypes(currentPage) {
        currentPage -= 1;
        axios.get("http://localhost:8080/api/test/roomtypes?pageNumber="+currentPage+"&pageSize="+this.state.roomTypesPerPage+"&sortBy=price&sortDir="+this.state.sortDir)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    roomTypes: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    /*deleteBook = (bookId) => {
        fetch("http://localhost:8080/rest/books/"+bookId, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then((book) => {
            if(book) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 3000);
                this.setState({
                    books: this.state.books.filter(book => book.id !== bookId)
                });
            } else {
                this.setState({"show":false});
            }
        });
    };*/

    deleteRoomType = (roomTypeId) => {
        this.props.deleteRoomType(roomTypeId);
        setTimeout(() => {
            if(this.props.roomTypeObject != null) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 3000);
                this.findAllRoomTypes(this.state.currentPage);
            } else {
                this.setState({"show":false});
            }
        }, 1000);
        /*axios.delete("http://localhost:8080/rest/books/"+bookId)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    this.setState({
                        books: this.state.books.filter(book => book.id !== bookId)
                    });
                } else {
                    this.setState({"show":false});
                }
            });*/
    };

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        if(this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllRoomTypes(targetPage);
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
                this.findAllRoomTypes(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if(this.state.currentPage > prevPage) {
            if(this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllRoomTypes(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.roomTypesPerPage);
        if(this.state.currentPage < condition) {
            if(this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllRoomTypes(condition);
            }
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.roomTypesPerPage)) {
            if(this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllRoomTypes(this.state.currentPage + 1);
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
        this.findAllRoomTypes(this.state.currentPage);
    };

    searchData = (currentPage) => {
        currentPage -= 1;
        axios.get("http://localhost:8080/api/test/roomtypes/search/"+this.state.search+"?page="+currentPage+"&size="+this.state.roomTypesPerPage)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    roomTypes: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    add = () => {
        return this.props.history.push("/admin/add");
    };

    
    checkRoomType = (Code) => {
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
        const {roomTypes, currentPage, totalPages, search} = this.state;

        return (
            <div className="container">
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"RoomType Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"card"}>
                    <Card.Header>
                        <div style={{"float":"left"}}> <BsList /> RoomType List
                            <InputGroup className="mb-3">
                                <FormControl placeholder="Search" name="search" value={search}
                                    className={"info-border bg-dark"}                                   
                                    onChange={this.searchChange}
                                     />                             
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
                                  <th>Title Room Type</th>
                                  <th>Slug</th>
                                  <th>Type</th>
                                  <th onClick={this.sortData}>Price <div className={this.state.sortDir === "asc" ? "arrow arrow-up" : "arrow arrow-down"}> </div></th>
                                  <th>Size</th>
                                  <th>Amount</th>
                                  <th>Capacity</th>
                                  <th>Description</th>
                                  <th>Pets</th>
                                  <th>Breakfast</th>
                                  <th>Television</th>
                                  <th>Bath</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    roomTypes.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="12">No RoomTypes Available.</td>
                                    </tr> :
                                    roomTypes.map((roomType) => (
                                    <tr key={roomType.id}>
                                        <td>
                                            <Image src={roomType.coverPhotoURL} rounded width="100" height="100"/>{roomType.titleRoomType}
                                        </td>
                                        <td>{roomType.slug}</td>
                                        <td>{roomType.type}</td>
                                        <td>{roomType.price}</td>
                                        <td>{roomType.size}</td>
                                        <td>{roomType.amount}</td>
                                        <td>{roomType.capacity}</td>
                                        <td>{roomType.description}</td>
                                        <td> {this.checkRoomType(roomType.pets)}</td>
                                        <td> {this.checkRoomType(roomType.breakfast)}</td>
                                        <td> {this.checkRoomType(roomType.television)}</td>
                                        <td> {this.checkRoomType(roomType.bath)}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"admin/edit/"+roomType.id} className="btn btn-sm btn-outline-primary"><BsPencilSquare /></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteRoomType.bind(this, roomType.id)}><BsFillTrashFill /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    ))
                                }
                              </tbody>
                        </Table>
                    </Card.Body>
                    {roomTypes.length > 0 ?
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
        roomTypeObject: state.roomType
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteRoomType: (roomTypeId) => dispatch(deleteRoomType(roomTypeId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomTypeList);