import React, {Component} from 'react';

import {connect} from 'react-redux';
import {deleteBook} from '../../services/index';

import './../../css/Style.css';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import MyToast from '../../components/Admin/MyToast';
import axios from 'axios';
import { BsFillTrashFill, BsPencilSquare, BsSearch, BsFillXCircleFill, BsList, BsChevronBarRight, BsChevronRight, BsChevronLeft, BsChevronBarLeft} from "react-icons/bs";

class BookList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books : [],
            search : '',
            currentPage : 1,
            booksPerPage : 5,
            sortDir: "asc"
        };
    }

    sortData = () => {
        setTimeout(() => {
            this.state.sortDir === "asc" ? this.setState({sortDir: "desc"}) : this.setState({sortDir: "asc"});
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
        axios.get("http://localhost:8080/api/test/books?pageNumber="+currentPage+"&pageSize="+this.state.booksPerPage+"&sortBy=price&sortDir="+this.state.sortDir)
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
            if(this.props.bookObject != null) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 3000);
                this.findAllBooks(this.state.currentPage);
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
            this.findAllBooks(targetPage);
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
                this.findAllBooks(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if(this.state.currentPage > prevPage) {
            if(this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllBooks(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.booksPerPage);
        if(this.state.currentPage < condition) {
            if(this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllBooks(condition);
            }
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.booksPerPage)) {
            if(this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllBooks(this.state.currentPage + 1);
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
        this.findAllBooks(this.state.currentPage);
    };

    searchData = (currentPage) => {
        currentPage -= 1;
        axios.get("http://localhost:8080/api/test/books/search/"+this.state.search+"?page="+currentPage+"&size="+this.state.booksPerPage)
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

    add = () => {
        return this.props.history.push("/admin/add");
    };

    render() {
        const {books, currentPage, totalPages, search} = this.state;

        return (
            <div className="container">
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Book Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"card"}>
                    <Card.Header>
                        <div style={{"float":"left"}}> <BsList /> Book List
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
                                  <th>Author</th>
                                  <th>ISBN Number</th>
                                  <th onClick={this.sortData}>Price <div className={this.state.sortDir === "asc" ? "arrow arrow-up" : "arrow arrow-down"}> </div></th>
                                  <th>Language</th>
                                  <th>Genre</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    books.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="7">No Books Available.</td>
                                    </tr> :
                                    books.map((book) => (
                                    <tr key={book.id}>
                                        <td>
                                            <Image src={book.coverPhotoURL} rounded width="100" height="100"/> {book.title}
                                        </td>
                                        <td>{book.author}</td>
                                        <td>{book.isbnNumber}</td>
                                        <td>{book.price}</td>
                                        <td>{book.language}</td>
                                        <td>{book.genre}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"admin/edit/"+book.id} className="btn btn-sm btn-outline-primary"><BsPencilSquare /></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteBook.bind(this, book.id)}><BsFillTrashFill /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    ))
                                }
                              </tbody>
                        </Table>
                    </Card.Body>
                    {books.length > 0 ?
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
        bookObject: state.book
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteBook: (bookId) => dispatch(deleteBook(bookId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);