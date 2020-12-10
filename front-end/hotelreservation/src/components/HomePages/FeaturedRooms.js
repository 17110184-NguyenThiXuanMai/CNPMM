import React, { Component } from 'react';
import {RoomContext} from '../../context';
import Loading from './Loading';
import Room from './Room';
import Title from './Title';
import store from '../../services/store';
import { Provider } from 'react-redux';

export default class FeaturedRooms extends Component {
    static contextType = RoomContext;
    render() {
        let { loading , featuredRooms: books} = this.context;
        books = books.map(book => {
            return <Room key={book.id} book={book} />
        });
        return (
            <section className="featured-rooms">
                <Title title="featured rooms" />
                <Provider store={store}>
                <div className="featured-rooms-center">
                    {loading?<Loading/>:<Room />}                  
                </div>
                </Provider>
            </section>
        );
    }
}
