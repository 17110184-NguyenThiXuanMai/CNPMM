import React, { Component } from 'react'
import RoomTypeService from '../../services/RoomTypeService';

class ViewRoomType extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            roomType: {}
        }
    }

    componentDidMount(){
        RoomTypeService.getRoomTypeById(this.state.id).then( res => {
            this.setState({roomType: res.data});
        })
    }

    return(){
        this.props.history.push('/admin/roomtypes');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3 ">
                    <h3 className = "text-center text-primary"> View Room Type Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <b className="card-title"> Title Room Type: </b> &nbsp;
                            <div className="card-text"> { this.state.roomType.titleRoomType }</div>
                        </div>
                        <div className = "row">
                            <b className="card-title"> Description: </b> &nbsp;
                            <div  className="card-text"> { this.state.roomType.description }</div>
                        </div>
                        <div className = "row">
                            <b className="card-title"> Slug: </b> &nbsp;
                            <div  className="card-text"> { this.state.roomType.slug }</div>
                        </div>
                        <div className = "row">
                            <b className="card-title"> Price Daily: </b> &nbsp;
                            <div  className="card-text"> { this.state.roomType.priceDaily }</div>
                        </div>
                        <div className = "row">
                            <b className="card-title"> Capacity: </b> &nbsp;
                            <div  className="card-text"> { this.state.roomType.capacity }</div>
                        </div>
                        <div className = "row">
                            <b className="card-title"> Size: </b> &nbsp;
                            <div  className="card-text"> { this.state.roomType.size }</div>
                        </div>
                        <div className = "row">
                            <b className="card-title"> Amount: </b> &nbsp;
                            <div  className="card-text"> { this.state.roomType.amount }</div>
                        </div>
                        <div className = "row">
                            <b className="card-title"> Pets: </b> &nbsp;
                            <div  className="card-text"> { this.state.roomType.pets }</div>
                        </div>
                        <div className = "row">
                            <b className="card-title"> Breakfast: </b> &nbsp;
                            <div  className="card-text"> { this.state.roomType.breakfast }</div>
                        </div>
                        <div className = "row">
                            <b className="card-title"> Featured: </b> &nbsp;
                            <div  className="card-text"> { this.state.roomType.featured }</div>
                        </div>
                        <div className="row">
                        <button className="btn btn-secondary" onClick={this.return.bind(this)}>Return</button>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default ViewRoomType
