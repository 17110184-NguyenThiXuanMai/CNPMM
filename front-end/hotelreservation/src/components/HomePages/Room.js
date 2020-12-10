import React, { Component } from 'react';

import { connect } from 'react-redux';
import { deleteBook } from '../../services/index';

import './../../css/Style.css';
import { Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Room extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            search: '',
            currentPage: 1,
            booksPerPage: 5,
            sortDir: "asc"
        };
    }

    sortData = () => {
        setTimeout(() => {
            this.state.sortDir === "asc" ? this.setState({ sortDir: "desc" }) : this.setState({ sortDir: "asc" });
            this.findAllBooks(this.state.currentPage);
        }, 500);
    };

    componentDidMount() {
        this.findAllBooks(this.state.currentPage);
    }

    /*findAllBooks() {
        fetch("http://localhost:8080/rest/books")
            .then(response => response.json())
            .then((data) => {
                this.setState({books: data});
            });
    };*/

    findAllBooks(currentPage) {
        currentPage -= 1;
        axios.get("http://localhost:8080/api/test/books?pageNumber=" + currentPage + "&pageSize=" + this.state.booksPerPage + "&sortBy=price&sortDir=" + this.state.sortDir)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    books: data.content,
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

    deleteBook = (bookId) => {
        this.props.deleteBook(bookId);
        setTimeout(() => {
            if (this.props.bookObject != null) {
                this.setState({ "show": true });
                setTimeout(() => this.setState({ "show": false }), 3000);
                this.findAllBooks(this.state.currentPage);
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
        axios.get("http://localhost:8080/api/test/books/search/" + this.state.search + "?page=" + currentPage + "&size=" + this.state.booksPerPage)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    books: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    render() {
        const { books } = this.state;

        return (
            books.map((book) => (
                <article className="room">
                    <div className="img-container">
                        <Image src={book.coverPhotoURL} r alt="single room" />
                        <div className="price-top">
                            <h6>${book.price}</h6>
                            <p>per night</p>
                        </div>
                        <Link to={`/rooms/` + book.id} className="btn-primary room-link">Features</Link>
                    </div>
                    <p className="room-info">{book.title}</p>
                </article>
            ))
        );
    }
}

const mapStateToProps = state => {
    return {
        bookObject: state.book
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteBook: (bookId) => dispatch(deleteBook(bookId))
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



