import React, { Component } from 'react'
import RoomTypeService from '../../services/RoomTypeService';

class ListRoomType extends Component {
    constructor(props) {
        super(props)

        this.state = {
            roomTypes: []
        }
        this.addRoomType = this.addRoomType.bind(this);
        this.editRoomType = this.editRoomType.bind(this);
        this.deleteRoomType = this.deleteRoomType.bind(this);
    }

    deleteRoomType(id) {
        RoomTypeService.deleteRoomType(id).then(res => {
            this.setState({ roomTypes: this.state.roomTypes.filter(roomType => roomType.id !== id) });
        });
    }
    viewRoomType(id) {
        this.props.history.push(`/admin/view-roomtype/${id}`);
    }
    editRoomType(id) {
        this.props.history.push(`/admin/add-roomtype/${id}`);
    }

    componentDidMount() {
        RoomTypeService.getRoomTypes().then((res) => {
            this.setState({ roomTypes: res.data });
        });
    }

    addRoomType() {
        this.props.history.push('/admin/add-roomtype/_add');
    }

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

    // imageHandler = (e) => {
    //     const reader = new FileReader();
    //     reader.onload = () =>{
    //       if(reader.readyState === 2){
    //         this.setState({profileImg: reader.result})
    //       }
    //     }
    //     reader.readAsDataURL(e.target.files[0])
    //   };

    render() {
        return (
            <div className="container mt-4">
                <div className="card my-3 shadow-lg p-3 mb-5 bg-white rounded">
                    <div className="card-header">
                        <div className="row justify-content-between">
                            <div className="col-12">
                                <h2 className="text-center text-info font-weight-bold">Room Type Manager</h2>
                            </div>
                            <div className="col">
                                <button className="btn btn-primary" onClick={this.addRoomType}> Add Room Type</button>
                            </div>
                        </div>                       
                    </div>
                    <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Title Room Type</th>
                                    <th> Description</th>
                                    <th> Slug</th>
                                    <th> Price Daily</th>
                                    <th> Capacity</th>
                                    <th> Size</th>
                                    <th> Amount</th>
                                    <th> Pets</th>
                                    <th> Breakfast</th>
                                    <th> Featured</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.roomTypes.map(
                                        roomType =>
                                        <tr key={roomType.slug}>
                                            <td> {roomType.titleRoomType} </td>
                                            <td> {roomType.description}</td>
                                            <td> {roomType.slug}</td>
                                            <td> {roomType.priceDaily}</td>
                                            <td> {roomType.capacity}</td>
                                            <td> {roomType.size}</td>
                                            <td> {roomType.amount}</td>
                                            <td> {this.checkRoomType(roomType.pets)}</td>
                                            <td> {this.checkRoomType(roomType.breakfast)}</td>
                                            <td> {this.checkRoomType(roomType.featured)}</td>
                                            <td className="row">
                                                <button onClick={() => this.editRoomType(roomType.slug)} className="btn btn-info">Update </button>
                                                <button onClick={() => this.deleteRoomType(roomType.slug)} className="btn btn-danger">Delete </button>
                                                <button onClick={() => this.viewRoomType(roomType.slug)} className="btn btn-info">View </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default ListRoomType
