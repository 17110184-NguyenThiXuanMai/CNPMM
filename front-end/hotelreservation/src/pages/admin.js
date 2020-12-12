import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import AdminSidebar from '../components/Admin/AdminSidebar'
import AdminHeader from '../components/Admin/AdminHeader'
import RoomType from './Admin/RoomType';
import RoomTypeList from './Admin/RoomTypeList';
import { Provider } from 'react-redux';
import store from '../services/store';

export default class Admin extends Component {
    render() {
        return (
            <div className="d-flex" id="wrapper">
                <AdminSidebar />
                <div id="page-content-wrapper">
                    <AdminHeader />
                    {/* <Switch>
                        <Route path = "/admin" exact component = {ListRoomType}></Route>
                        <Route path = "/admin/roomtypes" component = {ListRoomType}></Route>
                        <Route path = "/admin/add-roomtype/:id" component = {CreateRoomType}></Route>
                        <Route path = "/admin/view-roomtype/:id" component = {ViewRoomType}></Route>
                  </Switch> */}
                    <Switch>                     
                        <Provider store={store}>
                            <Route path="/admin" exact component={RoomTypeList} />
                            <Route path="/admin/add" exact component={RoomType} />
                            <Route path="/admin/edit/:id" exact component={RoomType} />                    
                        </Provider>
                    </Switch>
                </div>
            </div>
        )
    }
}
