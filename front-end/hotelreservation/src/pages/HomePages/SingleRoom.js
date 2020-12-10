import React, {Component } from 'react';

import {connect} from 'react-redux';
import {saveBook, fetchBook, updateBook} from '../../services/index';

import Banner from '../../components/HomePages/Banner';
import defaultBcg from '../../images/room-1.jpeg'
import {Link} from 'react-router-dom'
import {RoomContext} from '../../context'
import StyledHero from '../../components/HomePages/StyledHero';
import axios from 'axios';

class SingleRoom extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            genres: [],
            languages : [],
            show : false,
            defaultBcg
        };
        this.bookChange = this.bookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);
    }  

    initialState = {
        id:'', title:'', author:'', coverPhotoURL:'', isbnNumber:'', price:'', language:'', genre:''
    };
    static contextType = RoomContext;

    componentDidMount() {
        const bookId = +this.props.match.params.id;
        if(bookId) {
            this.findBookById(bookId);
        }
        this.findAllLanguages();
        this.findAllGenres();
    }

    findAllLanguages = () => {
        axios.get("http://localhost:8080/api/test/books/languages")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    languages: [{value:'', display:'Select Language'}]
                        .concat(data.map(language => {
                            return {value:language, display:language}
                        }))
                });
            });
    };

    findAllGenres = () => {
        axios.get("http://localhost:8080/api/test/books/genres")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    genres: [{value:'', display:'Select Genre'}]
                        .concat(data.map(genre => {
                            return {value:genre, display:genre}
                        }))
                });
            });
    };

    findBookById = (bookId) => {
        this.props.fetchBook(bookId);
        setTimeout(() => {
            let book = this.props.bookObject.book;
            if(book != null) {
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
        }, 1000);
    };

    resetBook = () => {
        this.setState(() => this.initialState);
    };


    submitBook = event => {
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

        this.props.saveBook(book);
        setTimeout(() => {
            if(this.props.savedBookObject.book != null) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);

        this.setState(this.initialState);
    };

    updateBook = event => {
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
        this.props.updateBook(book);
        setTimeout(() => {
            if(this.props.updatedBookObject.book != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);     
        this.setState(this.initialState);
    };

    bookChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    bookList = () => {
        return this.props.history.push("/admin");
    };

    render() {
        const {title, author, coverPhotoURL, isbnNumber, price, language, genre} = this.state;

        return (
            <div>
                  <StyledHero img={this.state.coverPhotoURL}>
                     <Banner title={`${this.state.title} room`}>
                         <Link to="/rooms" className="btn-primary">
                             back to rooms
                         </Link> 
                     </Banner>
                 </StyledHero>
                 <section className="single-room">
                     {/* <div className="single-room-images">
                         {defaultImg.map((item, index) => {
                            return <img key={index} src={item} alt={this.state.title} />;
                        })}
                    </div> */}
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>details</h3>
                            <p>{this.state.author}</p>
                        </article>
                        <article className="info">
                            <h3>info</h3>
                            <h6>price : ${this.state.price}  </h6>
                            <h6>size : ${this.state.price} SQFT</h6>
                            {/* <h6>
                                max capacity : {
                                    this.state.isbnNumber > 1 ? `${this.state.isbnNumber} people` : 
                                    `${this.state.isbnNumber} person `}
                            </h6> */}

                                {/* <h6> {pets?"pets allowed":"no pets allowed"}</h6>
                                <h6>{breakfast && "free breakfast included"}</h6> */}
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                     <h3>Extras</h3>
                     {/* <ul className="extras">
                         {extras.map((item, index) => {
                            return <li key={index}>- {item}</li>
                        })}
                    </ul> */}
                    <div className="p-4 clearfix">
                    <div className="row">
                       <div className="col-md-3 col-12 ml-auto">
                          <Link to={`/booknow/${this.state.id}`} className="btn btn-outline-primary btn-block btn-lg float-right ">Book Now</Link>
                       </div>
                    </div>
                </div>
                </section>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        savedBookObject: state.book,
        bookObject: state.book,
        updatedBookObject: state.book
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveBook: (book) => dispatch(saveBook(book)),
        fetchBook: (bookId) => dispatch(fetchBook(bookId)),
        updateBook: (book) => dispatch(updateBook(book))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleRoom);












// import React, { Component } from 'react';
// import defaultBcg from '../../images/room-1.jpeg'
// import Banner from '../../components/HomePages/Banner'
// import {Link} from 'react-router-dom'
// import {RoomContext} from '../../context'
// import StyledHero from '../../components/HomePages/StyledHero';

// export default class SingleRoom extends Component {
//     constructor(props) {
//         super(props)
//         // console.log(this.props)
//         this.state = {
//             slug: this.props.match.params.id,
//             defaultBcg,
//         }
//     }
//     // componentDidMount() {
//     // }

//     static contextType = RoomContext;

//     render() {
//             const { getRoom} = this.context;
//             const room = getRoom(this.state.slug);
//             if(!room) {
//                 return <div className="error">
//                     <h3>no such room could be found...</h3>
//                     <Link to='/rooms' className="btn-primary">
//                         back to rooms
//                     </Link>
//                 </div>
//             }
//             const {name, description, capacity, size, price, extras, 
//             breakfast, pets, images } = room;

//             const [mainImg,...defaultImg] = images;

//             return (
//                 <>
//                 <StyledHero img={mainImg || this.state.defaultBcg}>

//                     <Banner title={`${name} room`}>
//                         <Link to="/rooms" className="btn-primary">
//                             back to rooms
//                         </Link> 
//                     </Banner>
//                 </StyledHero>
//                 <section className="single-room">
//                     <div className="single-room-images">
//                         {defaultImg.map((item, index) => {
//                             return <img key={index} src={item} alt={name} />;
//                         })}
//                     </div>
//                     <div className="single-room-info">
//                         <article className="desc">
//                             <h3>details</h3>
//                             <p>{description}</p>
//                         </article>
//                         <article className="info">
//                             <h3>info</h3>
//                             <h6>price : ${this.state.roomType.priceDaily}</h6>
//                             <h6>size : ${size} SQFT</h6>
//                             <h6>
//                                 max capacity : {
//                                     capacity > 1 ? `${capacity} people` : 
//                                     `${capacity} person `}
//                             </h6>

//                                 <h6> {pets?"pets allowed":"no pets allowed"}</h6>
//                                 <h6>{breakfast && "free breakfast included"}</h6>
//                         </article>
//                     </div>
//                 </section>
//                 <section className="room-extras">
//                     <h3>Extras</h3>
//                     <ul className="extras">
//                         {extras.map((item, index) => {
//                             return <li key={index}>- {item}</li>
//                         })}
//                     </ul>
//                     <div className="p-4 clearfix">
//                     <div className="row">
//                        <div className="col-md-3 col-12 ml-auto">
//                           <Link to={`/booknow/${this.state.slug}`} className="btn btn-outline-primary btn-block btn-lg float-right ">Book Now</Link>
//                        </div>
//                     </div>
//                 </div>
//                 </section>
//                 </>
//             );
//     }
// }
