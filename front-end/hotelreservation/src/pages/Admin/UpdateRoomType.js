import React, { Component } from 'react'
import RoomTypeService from '../../services/RoomTypeService';

class UpdateRoomType extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            titleRoomType: "",
            description: "",
            slug: "",
            priceDaily: "",
            capacity:"",
            size: "",
            amount: "",
            pets: false,
            breakfast:false,
            featured: false
        }
        this.changeTitleRoomTypeHandler = this.changeTitleRoomTypeHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeSlugHandler = this.changeSlugHandler.bind(this);
        this.changePriceDailyHandler = this.changePriceDailyHandler.bind(this);
        this.changeCapacityHandler = this.changeCapacityHandler.bind(this);
        this.changeSizeHandler = this.changeSizeHandler.bind(this);
        this.changePetsHandler = this.changePetsHandler.bind(this);
        this.changeBreakfastHandler = this.changeBreakfastHandler.bind(this);
        this.changeFeaturedHandler = this.changeFeaturedHandler.bind(this);
        this.changeAmountHandler = this.changeAmountHandler.bind(this);
        this.updateRoomType = this.updateRoomType.bind(this);
    }

    componentDidMount(){
        RoomTypeService.getRoomTypeById(this.state.id).then( (res) =>{
            let roomType = res.data;
            this.setState({titleRoomType: roomType.titleRoomType,
                description: roomType.description,
                slug: roomType.slug,
                priceDaily : roomType.priceDaily,
                capacity: roomType.capacity,
                size : roomType.size,
                amount : roomType.amount,
                pets: roomType.pets,
                breakfast : roomType.breakfast,
                featured: roomType.featured
            });
        });
    }

    updateRoomType = (e) => {
        e.preventDefault();
        let roomType = {
            titleRoomType: this.state.titleRoomType,
            description: this.state.description,
            slug: this.state.slug,
            priceDaily: this.state.priceDaily,
            capacity: this.state.capacity,
            size: this.state.size,
            amount: this.state.amount,
            pets: this.state.pets,
            breakfast: this.state.breakfast,
            featured: this.state.featured
        };
        console.log('roomType => ' + JSON.stringify(roomType));
        console.log('id => ' + JSON.stringify(this.state.id));
        RoomTypeService.updateRoomType(roomType, this.state.id).then( res => {
            this.props.history.push('/admin/roomtypes');
        });
    }
    
    changeTitleRoomTypeHandler= (event) => {
        this.setState({titleRoomType: event.target.value});
    }

    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }

    changeSlugHandler= (event) => {
        this.setState({slug: event.target.value});
    }

    changePriceDailyHandler= (event) => {
        this.setState({priceDaily: event.target.value});
    }

    changeCapacityHandler= (event) => {
        this.setState({capacity: event.target.value});
    }

    changeSizeHandler= (event) => {
        this.setState({size: event.target.value});
    }
    changeAmountHandler= (event) => {
        this.setState({amount: event.target.value});
    }

    changePetsHandler= (event) => {
        this.setState({pets: event.target.value});
    }

    changeBreakfastHandler= (event) => {
        this.setState({breakfast: event.target.value});
    }

    changeFeaturedHandler= (event) => {
        this.setState({featured: event.target.value});
    }

    cancel(){
        this.props.history.push('/admin/roomtypes');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Room Type</h3>
                                <div className = "card-body">
                                    <form>
                                    <div className = "form-group">
                                            <label> Title Room Type: </label>
                                            <input placeholder="Title room type" name="titleRooType" className="form-control" 
                                                value={this.state.titleRoomType} onChange={this.changeTitleRoomTypeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Description: </label>
                                            <input placeholder="Description" name="description" className="form-control" 
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Slug: </label>
                                            <input placeholder="Description" name="slug" className="form-control" 
                                                value={this.state.slug} onChange={this.changeSlugHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Price Daily: </label>
                                            <input placeholder="Price daily" name="priceDaily" className="form-control" 
                                                value={this.state.priceDaily} onChange={this.changePriceDailyHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Capacity: </label>
                                            <input placeholder="Capacity" name="capacity" className="form-control" 
                                                value={this.state.capacity} onChange={this.changeCapacityHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Size: </label>
                                            <input placeholder="Size" name="size" className="form-control" 
                                                value={this.state.size} onChange={this.changeSizeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Amount: </label>
                                            <input placeholder="Amount" name="amount" className="form-control" 
                                                value={this.state.amount} onChange={this.changeAmountHandler}/>
                                        </div>
                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="pets"  required
                                                // value={this.state.pets}
                                                onChange={this.changePetsHandler}
                                                name="pets" />
                                            <label className="form-check-label" for="pets">Pets</label>
                                            <input type="checkbox" className="form-check-input" id="breakfast"  
                                                // value={this.state.breakfast}
                                                onChange={this.changeBreakfastHandler}
                                                name="breakfast" />
                                            <label className="form-check-label" for="breakfast">Breakfast</label>
                                            <input type="checkbox" className="form-check-input" id="featured"  
                                                // value={this.state.featured}
                                                onChange={this.changeFeaturedHandler}
                                                name="featured" />
                                            <label className="form-check-label" for="featured">Featured</label>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateRoomType}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateRoomType
