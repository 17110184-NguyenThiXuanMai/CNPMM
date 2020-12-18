import React, {Component } from 'react';

import {connect} from 'react-redux';
import {saveRoomType, fetchRoomType, updateRoomType} from '../../services/index';

import {Link} from 'react-router-dom'
import {RoomContext} from '../../context'
import axios from 'axios';

class Booknow extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            type: [],
            show : false,
            // defaultBcg
        };
        this.roomTypeChange = this.roomTypeChange.bind(this);
        this.submitRoomType = this.submitRoomType.bind(this);
    }  

    initialState = {
        id:'', titleRoomType:'', slug:'',type:'',size:'',amount:'', capacity:'',pets:'',breakfast:'',featured:'',description:'', coverPhotoURL:'', price:''
    };
    static contextType = RoomContext;

    componentDidMount() {
        const roomTypeId = +this.props.match.params.id;
        if(roomTypeId) {
            this.findRoomTypeById(roomTypeId);
        }
        this.findAllTypes();
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
                    featured: roomType.featured,
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
            featured: this.state.featured,
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
            featured: this.state.featured,
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
            <div className="bg-gra-01">
         <div className="container my-0">
             <div className="row">
                 <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
                     <div>
                         <h1 className="display-4">Booking</h1>
                     </div>
                     <div className="row">
                         <div className="col-md-6 col-12 my-auto">
                             <img src={this.state.coverPhotoURL} className="img-fluid" alt="selected room" />
                         </div>
                         <div className="col-md-6 col-12 my-auto">
                             <h1>Rooms Details</h1>
                             <table className="table">
                                 <thead className="thead-light">
                                     <tr>
                                         <th>Room Type</th>
                                         <td>{this.state.titleRoomType}</td>
                                     </tr>
                                     <tr>
                                         <th>Capacity</th>
                                         {/* <td>{capacity}</td> */}
                                        <td>{this.state.capacity}</td>
                                     </tr>
                                     <tr>
                                         <th>Size</th>
                                         {/* <td>{size} sqft.</td> */}
                                         <td>{this.state.size} sqft.</td>
                                     </tr>
                                     <tr>
                                         <th>Amount</th>
                                         {/* <td>{size} sqft.</td> */}
                                         <td>{this.state.amount} </td>
                                     </tr>
                                     <tr>
                                         <th>Breakfast</th>
                                         {/* <td>{breakfast === true ? `Included`: `Not Included`}</td> */}
                                     </tr>
                                     <tr>
                                         <th>Pets</th>
                                         {/* <td>{pets ===true ? `Allowed` : `Not Allowed`}</td> */}
                                     </tr>
                                 </thead>
                             </table>
                         </div>
                     </div>
                     {/* <div className="row my-3">
                         <div className="col-md-6 col-12">
                             <div className="form-group">
                                 <label htmlFor="Fromdate" className="font-weight-bolder mr-3">From Date </label>
                                 <DatePicker selected={this.state.startDate} onChange={this.handleChangeStart} className="form-control" />
                             </div>
                         </div>
                         <div className="col-md-6 col-12">
                             <div className="form-group">
                                 <label htmlFor="Todate" className="font-weight-bolder mr-3">To Date </label>
                                 <DatePicker selected={this.state.endDate} onChange={this.handleChangeEnd} className="form-control" />
                             </div>
                         </div>
                     </div> */}
                     {/* <div className="row">
                         <div className="col-md-6 col-12">
                             <h6 className="font-weight-bolder">Number of days : {daysLeft}</h6>
                             <mark>Please make sure Checkin time is from 9 am to 12 pm</mark>
                         </div>
                         <div className="col-md-6 col-12">
                             <h6 className="font-weight-bold">Price per day : <span className="badge badge-info">Rs {price}</span></h6>                             <h6 className="font-weight-bold">Total Price to be paid : <span className="text-primary">Rs {daysLeft*price}</span></h6>
                         </div>
                     </div> */}
                     <div className="row my-4">
                         <div className="col-md-6 col-12">
                             <div className="form-group">
                                 <label htmlFor="payment" className="font-weight-bolder">Payment Options</label>
                                 <select className="form-control">
                                     <option disabled>Select payment option</option>
                                     <option value="Credit">Credit Card</option>
                                     <option value="Debit">Debit Card</option>
                                     <option value="checkin">Pay during Checkin</option>
                                 </select>
                             </div>
                         </div>
                         <div className="col-md-6 col-12 my-auto">                         
                          <div className="col-md-6 col-12 float-right">                                
                          <button className="btn btn-block btn-outline-primary" data-toggle="modal" data-target="#thanks">Confirm Booking</button>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
             <div className="modal fade" id="thanks">
                 <div className="modal-dialog modal-dialog-centered">
                     <div className="modal-content">
                         <div className="modal-body p-4">
                             <h3>Thank you </h3>
                             <p className="lead">Your room is booked successfully....</p>
                         </div>
                         <div className="modal-footer">
                             <Link to="/" className="btn btn-dark">Goto Home</Link>
                             <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Booknow);















// import React, { Component } from 'react'
// import { RoomContext } from '../../context';
// import { Link } from 'react-router-dom';
// import moment from 'moment';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import defaultBcg from '../../images/room-3.jpeg';
// export default class Booknow extends Component {
//     constructor (props){
//         super(props);
//         this.state = {
//         slug: this.props.match.params.slug,
//         defaultBcg,
//         startDate: new Date(),
//         endDate: new Date(),
//     };
//     this.handleChangeEnd = this.handleChangeEnd.bind(this);
//     this.handleChangeStart = this.handleChangeStart.bind(this);
//     }
//     handleChangeStart(date) {
//         this.setState({
//         startDate: date
//         });
//     }
//     handleChangeEnd(date) {
//         this.setState({
//         endDate: date
//         });
//     }
//     calculateDaysLeft(startDate, endDate) {
//         if (!moment.isMoment(startDate)) startDate = moment(startDate);
//         if (!moment.isMoment(endDate)) endDate = moment(endDate);
//         return endDate.diff(startDate, "days");
//     }
//     static contextType = RoomContext;
//     render() {
//         const { getRoom } = this.context;
//         const room = getRoom(this.state.slug);
//         const { startDate, endDate } = this.state;
//         const daysLeft = this.calculateDaysLeft(startDate, endDate);
//     if(!room){
//         return (<div className="container roomerror">
//             <div className="row my-5">
//                 <div className="col-md-6 col-12 mx-auto">
//                     <div className="card shadow-lg border-0 p-4 error">
//                         <h1 className="text-center display-4">SORRY</h1>
//                         <h3>No such room could be found...</h3>
//                         <Link to="/rooms" className="btn btn-warning mt-4 ">Back to Rooms</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>);
//         }
//         const {name,capacity,size,price,breakfast,pets,images} = room;
//         const [mainImg, ...defaultBcg] = images;
//         return (
//             <div className="bg-gra-01">
//         <div className="container my-0">
//             <div className="row">
//                 <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
//                     <div>
//                         <h1 className="display-4">Booking</h1>
//                     </div>
//                     <div className="row">
//                         <div className="col-md-6 col-12 my-auto">
//                             <img src={mainImg || defaultBcg} className="img-fluid" alt="selected room" />
//                         </div>
//                         <div className="col-md-6 col-12 my-auto">
//                             <h1>Rooms Details</h1>
//                             <table className="table">
//                                 <thead className="thead-light">
//                                     <tr>
//                                         <th>Room Type</th>
//                                         <td>{name}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Capacity</th>
//                                         <td>{capacity}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Size</th>
//                                         <td>{size} sqft.</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Breakfast</th>
//                                         <td>{breakfast === true ? `Included`: `Not Included`}</td>
//                                     </tr>
//                                     <tr>
//                                         <th>Pets</th>
//                                         <td>{pets ===true ? `Allowed` : `Not Allowed`}</td>
//                                     </tr>
//                                 </thead>
//                             </table>
//                         </div>
//                     </div>
//                     <div className="row my-3">
//                         <div className="col-md-6 col-12">
//                             <div className="form-group">
//                                 <label htmlFor="Fromdate" className="font-weight-bolder mr-3">From Date </label>
//                                 <DatePicker selected={this.state.startDate} onChange={this.handleChangeStart} className="form-control" />
//                             </div>
//                         </div>
//                         <div className="col-md-6 col-12">
//                             <div className="form-group">
//                                 <label htmlFor="Todate" className="font-weight-bolder mr-3">To Date </label>
//                                 <DatePicker selected={this.state.endDate} onChange={this.handleChangeEnd} className="form-control" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-md-6 col-12">
//                             <h6 className="font-weight-bolder">Number of days : {daysLeft}</h6>
//                             <mark>Please make sure Checkin time is from 9 am to 12 pm</mark>
//                         </div>
//                         <div className="col-md-6 col-12">
//                             <h6 className="font-weight-bold">Price per day : <span className="badge badge-info">Rs {price}</span></h6>
//                             <h6 className="font-weight-bold">Total Price to be paid : <span className="text-primary">Rs {daysLeft*price}</span></h6>
//                         </div>
//                     </div>
//                     <div className="row my-4">
//                         <div className="col-md-6 col-12">
//                             <div className="form-group">
//                                 <label htmlFor="payment" className="font-weight-bolder">Payment Options</label>
//                                 <select className="form-control">
//                                     <option disabled>Select payment option</option>
//                                     <option value="Credit">Credit Card</option>
//                                     <option value="Debit">Debit Card</option>
//                                     <option value="checkin">Pay during Checkin</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <div className="col-md-6 col-12 my-auto">
//                             <div className="col-md-6 col-12 float-right">
//                                 <button className="btn btn-block btn-outline-primary" data-toggle="modal" data-target="#thanks">Confirm Booking</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="modal fade" id="thanks">
//                 <div className="modal-dialog modal-dialog-centered">
//                     <div className="modal-content">
//                         <div className="modal-body p-4">
//                             <h3>Thank you </h3>
//                             <p className="lead">Your room is booked successfully....</p>
//                         </div>
//                         <div className="modal-footer">
//                             <Link to="/" className="btn btn-dark">Goto Home</Link>
//                             <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </div>
//         )
//     }
// }