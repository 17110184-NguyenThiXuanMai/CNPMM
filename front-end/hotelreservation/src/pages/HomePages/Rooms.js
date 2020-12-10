import React from 'react'
import Hero from '../../components/HomePages/Hero'
import Banner from '../../components/HomePages/Banner';
import {Link} from 'react-router-dom'
import RoomContainer from '../../components/HomePages/RoomContainer'

const Rooms = () => {
    return (
        <>
    <Hero hero="roomsHero">
        <Banner title="our rooms">
            <Link to='/' className="btn-primary">
                return home
            </Link>
        </Banner>
    </Hero>

    <RoomContainer />
    </>
    );
};

export default Rooms;

