import React, { Component } from 'react';

import { connect } from 'react-redux';
import { deleteBook } from '../../services/index';

import './../../css/Style.css';
import store from '../../services/store';
import { Provider } from 'react-redux';
import axios from 'axios';
import Room from './Room'

class BookList extends Component {

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
    };

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        if (this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllBooks(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage
        });
    };

    searchChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    cancelSearch = () => {
        this.setState({ "search": '' });
        this.findAllBooks(this.state.currentPage);
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
            <section className="roomslist">
                <div className="roomslist-center">
                    <Provider store={store}>
                        {books.map(book => {
                            return <Room key={book.id} room={book} />;
                        })
                        }
                    </Provider>
                </div>
            </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookList);



















// import React from 'react'
// import Room from './Room'
// import store from '../../services/store';
// import { Provider } from 'react-redux';

// export default function RoomList({rooms}) {
//     if (rooms.length === 0 ) {
//         return (
//             <div className="empty-search">
//                 <h3>unfortunately no rooms matched your search parameters</h3> 
//             </div>
//         );
//     }

//     return (
//         <section className="roomslist">
//             <div className="roomslist-center">
//                 <Provider store={store}>
//                 {
//                     rooms.map(book => {
//                         return <Room key={book.id} room={book} />;
//                     })
//                 }
//                 </Provider>
//             </div>
//         </section>
//     )
// }
