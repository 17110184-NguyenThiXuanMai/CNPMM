import React, {Component } from 'react';

import {connect} from 'react-redux';
import {saveRoomType, fetchRoomType, updateRoomType} from '../../services/index';

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
            // genres: [],
            // languages : [],
            type: [],
            show : false,
            defaultBcg
        };
        this.roomTypeChange = this.roomTypeChange.bind(this);
        this.submitRoomType = this.submitRoomType.bind(this);
    }  

    initialState = {
        id:'', titleRoomType:'', slug:'',type:'',size:'',amount:'', capacity:'',pets:'',breakfast:'',television:'', bath:'',description:'', coverPhotoURL:'', price:''
    };
    static contextType = RoomContext;

    componentDidMount() {
        const roomTypeId = +this.props.match.params.id;
        if(roomTypeId) {
            this.findRoomTypeById(roomTypeId);
        }
        this.findAllTypes();
        // this.findAllLanguages();
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
    //     axios.get("http://localhost:8080/api/test/books/genres")
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
    };

    resetRoomType = () => {
        this.setState(() => this.initialState);
    };


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
            price: this.state.price,
            television: this.state.television,
            bath: this.state.bath,
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

        this.setState(this.initialState);
    };

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
            price: this.state.price,
            television: this.state.television,
            bath: this.state.bath,
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
        this.setState(this.initialState);
    };

    roomTypeChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    roomTypeList = () => {
        return this.props.history.push("/admin");
    };

    render() {

        return (
            <div>
                  <StyledHero img={this.state.coverPhotoURL}>
                     <Banner title={`${this.state.titleRoomType} room`}>
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
                            <p>{this.state.description}</p>
                        </article>
                        <article className="info">
                            <h3>info</h3>
                            <h6>price : ${this.state.price}  </h6>
                            <h6>size : ${this.state.size} SQFT</h6>
                            <h6>Amount: {this.state.amount} room</h6>
                            <h6>Type: {this.state.type} </h6>
                            <h6>
                                max capacity : {
                                    this.state.capacity > 1 ? `${this.state.capacity} people` : 
                                    `${this.state.capacity} person `}
                            </h6>
                                <h6> {this.state.pets? "pets allowed":"no pets allowed"}</h6>
                                <h6>{this.state.breakfast && "free breakfast included"}</h6>
                                <h6>{this.state.television && "television included"}</h6>
                                <h6>{this.state.bath && "bath included"}</h6>
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
