import React, { Component } from 'react';

import { connect } from 'react-redux';
import { deleteRoomType } from '../../services/index';

import './../../css/Style.css';
import { Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Room extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomTypes: [],
            search: '',
            currentPage: 1,
            roomTypesPerPage: 5,
            sortDir: "asc"
        };
    }

    sortData = () => {
        setTimeout(() => {
            this.state.sortDir === "asc" ? this.setState({ sortDir: "desc" }) : this.setState({ sortDir: "asc" });
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
        axios.get("http://localhost:8080/api/test/roomtypes?pageNumber=" + currentPage + "&pageSize=" + this.state.roomTypesPerPage + "&sortBy=price&sortDir=" + this.state.sortDir)
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
            if (this.props.roomTypeObject != null) {
                this.setState({ "show": true });
                setTimeout(() => this.setState({ "show": false }), 3000);
                this.findAllRoomTypes(this.state.currentPage);
            } else {
                this.setState({ "show": false });
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

    searchData = (currentPage) => {
        currentPage -= 1;
        axios.get("http://localhost:8080/api/test/roomtypes/search/" + this.state.search + "?page=" + currentPage + "&size=" + this.state.roomTypesPerPage)
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

    render() {
        const { roomTypes } = this.state;

        return (
            roomTypes.map((roomType) => (
                <article className="room">
                    <div className="img-container">
                        <Image src={roomType.coverPhotoURL} r alt="single room" />
                        <div className="price-top">
                            <h6>${roomType.price}</h6>
                            <p>per night</p>
                        </div>
                        <Link to={`/rooms/` + roomType.id} className="btn-primary room-link">Features</Link>
                    </div>
                    <p className="room-info">{roomType.title}</p>
                </article>
            ))
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

export default connect(mapStateToProps, mapDispatchToProps)(Room);




// import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
// import defaultImg from '../../images/room-1.jpeg';
//  import PropTypes from 'prop-types';
// export default function Room({room}) {
//     const{name, slug, images, price} = room;
//     return (
//         <article className="room">
//             <div className="img-container">
//                 <img src={images[0] || defaultImg} alt="single room" />
//                 <div className="price-top">
//                     <h6>${price}</h6>
//                     <p>per night</p>
//                 </div>
//                 <Link to={`/rooms/${slug}`} className="btn-primary room-link">Features</Link>
//             </div>
//             <p className="room-info">{name}</p>
//         </article>
//     );
// }

// Room.propTypes = {
//     room: PropTypes.shape({
//         name:PropTypes.string.isRequired,
//         slug:PropTypes.string.isRequired,
//         images:PropTypes.arrayOf(PropTypes.string).isRequired,
//         price:PropTypes.number.isRequired,
//     })
// }



