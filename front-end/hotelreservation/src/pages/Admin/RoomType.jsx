import React, {Component } from 'react';

import {connect} from 'react-redux';
import {saveRoomType, fetchRoomType, updateRoomType} from '../../services/index';

import {Card, Form, Button, Col, InputGroup, Image, Row} from 'react-bootstrap';
import MyToast from '../../components/Admin/MyToast';
import axios from 'axios';
import {BsListUl, BsArrowCounterclockwise, BsPlusSquareFill} from "react-icons/bs";

class RoomType extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            // genres: [],
            // languages : [],
            types: [],
            pets: false,
            breakfast: false,
            television: false,
            bath: false,
            show : false
        };
        this.roomTypeChange = this.roomTypeChange.bind(this);
        this.submitRoomType = this.submitRoomType.bind(this);
    }  

    initialState = {
        id:'', titleRoomType:'', slug:'',type:'',size:'',pets:'',breakfast:'',television:'', bath:'', amount:'', capacity:'',description:'', coverPhotoURL:'', price:''
    };
    
    componentDidMount() {
        const roomTypeId = +this.props.match.params.id;
        if(roomTypeId) {
            this.findRoomTypeById(roomTypeId);
        }
        this.findAllTypes();
        // this.findAllGenres();
    }

    findAllTypes = () => {
        axios.get("http://localhost:8080/api/test/roomtypes/types")
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

    // findAllGenres = () => {
    //     axios.get("http://localhost:8080/api/test/roomtypes/genres")
    //         .then(response => response.data)
    //         .then((data) => {
    //             this.setState({
    //                 genres: [{value:'', display:'Select Genre'}]
    //                     .concat(data.map(genre => {
    //                         return {value:genre, display:genre}
    //                     }))
    //             });
    //         });
    // };


    /*findBookById = (bookId) => {
        fetch("http://localhost:8081/rest/books/"+bookId)
            .then(response => response.json())
            .then((book) => {
                if(book) {
                    this.setState({
                        id: book.id,
                        title: book.title,
                        author: book.author,
                        coverPhotoURL: book.coverPhotoURL,
                        isbnNumber: book.isbnNumber,
                        price: book.price,
                        language: book.language,
                        genre: book.genre
                    });
                }
            }).catch((error) => {
                console.error("Error - "+error);
            });
    };*/

    findRoomTypeById = (roomTypeId) => {
        this.props.fetchRoomType(roomTypeId);
        setTimeout(() => {
            let roomType = this.props.roomTypeObject.roomType;
            if(roomType != null) {
                this.setState({
                    id: roomType.id,
                    titleRoomType: roomType.titleRoomType,
                    slug: roomType.slug,
                    type: roomType.type,
                    size: roomType.size,
                    amount: roomType.amount,
                    capacity: roomType.capacity,
                    pets: roomType.pets,
                    breakfast: roomType.breakfast,
                    television: roomType.television,
                    bath: roomType.bath,
                    description: roomType.description,
                    coverPhotoURL: roomType.coverPhotoURL,
                    price: roomType.price
                });
            }
        }, 1000);
        /*axios.get("http://localhost:8081/rest/books/"+bookId)
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        id: response.data.id,
                        title: response.data.title,
                        author: response.data.author,
                        coverPhotoURL: response.data.coverPhotoURL,
                        isbnNumber: response.data.isbnNumber,
                        price: response.data.price,
                        language: response.data.language,
                        genre: response.data.genre
                    });
                }
            }).catch((error) => {
                console.error("Error - "+error);
            });*/
    };

    resetRoomType = () => {
        this.setState(() => this.initialState);
    };

    /*submitBook = event => {
        event.preventDefault();

        const book = {
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch("http://localhost:8081/rest/books", {
            method: 'POST',
            body: JSON.stringify(book),
            headers
        })
        .then(response => response.json())
        .then((book) => {
            if(book) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        });
        this.setState(this.initialState);
    };*/

    submitRoomType = event => {
        event.preventDefault();

        const roomType = {
            titleRoomType: this.state.titleRoomType,
            slug: this.state.slug,
            type: this.state.type,
            size: this.state.size,
            amount: this.state.amount,
            capacity: this.state.capacity,
            pets: this.state.pets,
            breakfast: this.state.breakfast,
            television: this.state.television,
            bath: this.state.bath,
            price: this.state.price,
            description: this.state.description,
            coverPhotoURL: this.state.coverPhotoURL
        };

        this.props.saveRoomType(roomType);
        setTimeout(() => {
            if(this.props.savedRoomTypeObject.roomType != null) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
        /*axios.post("http://localhost:8081/rest/books", book)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"post"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                } else {
                    this.setState({"show":false});
                }
            });*/

        this.setState(this.initialState);
    };

    /*updateBook = event => {
        event.preventDefault();

        const book = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch("http://localhost:8081/rest/books", {
            method: 'PUT',
            body: JSON.stringify(book),
            headers
        })
        .then(response => response.json())
        .then((book) => {
            if(book) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
                setTimeout(() => this.bookList(), 3000);
            } else {
                this.setState({"show":false});
            }
        });
        this.setState(this.initialState);
    };*/

    updateRoomType = event => {
        event.preventDefault();

        const roomType = {
            titleRoomType: this.state.titleRoomType,
            slug: this.state.slug,
            type: this.state.type,
            size: this.state.size,
            amount: this.state.amount,
            capacity: this.state.capacity,
            pets: this.state.pets,
            breakfast: this.state.breakfast,
            television: this.state.television,
            bath: this.state.bath,
            price: this.state.price,
            description: this.state.description,
            coverPhotoURL: this.state.coverPhotoURL
        };
        this.props.updateRoomType(roomType);
        setTimeout(() => {
            if(this.props.updatedRoomTypeObject.roomType != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
        /*axios.put("http://localhost:8081/rest/books", book)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"put"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    setTimeout(() => this.bookList(), 3000);
                } else {
                    this.setState({"show":false});
                }
            });*/
        this.setState(this.initialState);
    };

    roomTypeChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    handleCheckPets = event => {
        this.setState({pets: event.target.checked});
    }

    handleCheckBreakfast = event => {
        this.setState({breakfast: event.target.checked});
    }

    handleCheckTelevision = event => {
        this.setState({television: event.target.checked});
    }

    handleCheckBath = event => {
        this.setState({bath: event.target.checked});
    }

    roomTypeList = () => {
        return this.props.history.push("/admin");
    };

    render() {
        const {titleRoomType, slug,type,size,amount,capacity,description, coverPhotoURL, price} = this.state;
        
        return (
            <div className="container">
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "RoomType Updated Successfully." : "RoomType Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"card"}>
                    <Card.Header>
                        {this.state.id ? <BsPlusSquareFill /> : <BsPlusSquareFill /> } {this.state.id ? " Update RoomType" :  " Add New RoomType"}
                    </Card.Header>
                    <Form onReset={this.resetRoomType} onSubmit={this.state.id ? this.updateRoomType : this.submitRoomType} id="roomTypeFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitleRoomType">
                                    <Form.Label>Title Room Type</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="titleRoomType"
                                        value={titleRoomType} onChange={this.roomTypeChange}
                                        className={"bg-dark"}
                                        placeholder="Enter Title Room Type" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridSlug">
                                    <Form.Label>Slug</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="slug"
                                        value={slug} onChange={this.roomTypeChange}
                                        className={"bg-dark"}
                                        placeholder="Enter Slug" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="price"
                                        value={price} onChange={this.roomTypeChange}
                                        className={"bg-dark"}
                                        placeholder="Enter RoomType Price" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridType">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control required as="select"
                                        custom onChange={this.roomTypeChange}
                                        name="type" value={type}
                                        className={"bg-dark"}>
                                        {this.state.types.map(type =>
                                            <option key={type.value} value={type.value}>
                                                {type.display}
                                            </option>                               
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                             <Form.Row>
                                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                                    <Form.Label>Cover Photo URL</Form.Label>
                                     <InputGroup>
                                        <Form.Control required autoComplete="off"
                                            type="test" name="coverPhotoURL"
                                            value={coverPhotoURL} onChange={this.roomTypeChange}
                                            className={"bg-dark"}
                                            placeholder="Enter Room Type Cover Photo URL" />
                                        <InputGroup.Append>
                                            {this.state.coverPhotoURL !== '' && <Image src={this.state.coverPhotoURL} roundedRight width="40" height="38"/>}
                                        </InputGroup.Append>
                                    </InputGroup>                    
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridSize">
                                    <Form.Label>Size</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="size"
                                        value={size} onChange={this.roomTypeChange}
                                        className={"bg-dark"}
                                        placeholder="Enter Size" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="amount"
                                        value={amount} onChange={this.roomTypeChange}
                                        className={"bg-dark"}
                                        placeholder="Enter Amount" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Capacity</Form.Label>
                                     <InputGroup>
                                        <Form.Control required autoComplete="off"
                                            type="test" name="capacity"
                                            value={capacity} onChange={this.roomTypeChange}
                                            className={"bg-dark"}
                                            placeholder="Enter Capacity" />
                                    </InputGroup>                    
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="description"
                                        value={description} onChange={this.roomTypeChange}
                                        className={"bg-dark"}
                                        placeholder="Enter Description" />
                                </Form.Group>
                            </Form.Row>
                           <Form.Row>
                                <div className="form-group form-check">
                                    <label className="checkbox-inline" for="pets">
                                        <input type="checkbox" className="form-check-input"
                                            value={this.state.pets}
                                            onChange={this.handleCheckPets}
                                            checked={this.state.pets}
                                            name="pets" />
                                    Pets </label>
                                    <label className="checkbox-inline" for="breakfast">
                                        <input type="checkbox" className="form-check-input" 
                                            value={this.state.breakfast}
                                            onChange={this.handleCheckBreakfast}
                                            checked={this.state.breakfast}                           
                                            name="breakfast" />
                                        Breakfast </label>
                                        <label className="checkbox-inline" for="featured">
                                        <input type="checkbox" className="form-check-input"
                                            value={this.state.television}
                                            onChange={this.handleCheckTelevision}
                                            checked={this.state.television}
                                            name="featured" />
                                        Television</label>
                                        <label className="checkbox-inline" for="featured">
                                        <input type="checkbox" className="form-check-input"
                                            value={this.state.bath}
                                            onChange={this.handleCheckBath}
                                            checked={this.state.bath}
                                            name="featured" />
                                        Bath</label>
                                    </div>
                            </Form.Row>                          
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Row>
                                <Button size="sm" variant="success" type="submit">
                                    {this.state.id ? "Update" : "Save"}
                                </Button>{' '}
                                <Button size="sm" variant="info" type="reset"> <BsArrowCounterclockwise /> Reset
                                </Button>{' '}
                                <Button size="sm" variant="info" type="button" onClick={this.roomTypeList.bind()}> <BsListUl /> RoomType List
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
        savedRoomTypeObject: state.roomType,
        roomTypeObject: state.roomType,
        updatedRoomTypeObject: state.roomType
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveRoomType: (roomType) => dispatch(saveRoomType(roomType)),
        fetchRoomType: (roomTypeId) => dispatch(fetchRoomType(roomTypeId)),
        updateRoomType: (roomType) => dispatch(updateRoomType(roomType))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomType);