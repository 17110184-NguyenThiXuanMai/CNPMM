import React from 'react'
import Hero from '../../components/HomePages/Hero';
import Banner from '../../components/HomePages/Banner';
import {Link} from 'react-router-dom';
import Services from '../../components/HomePages/Services';
import FeaturedRooms from '../../components/HomePages/FeaturedRooms';
import Policy from '../../components/HomePages/Restaurant';

export default function Home() {
    return (
    <>
    <Hero> 
        <Banner title="luxurious rooms" subtitle="deluxe rooms starting at $299">
        <Link to='/rooms' className="btn-primary">
            our rooms
        </Link>
        </Banner>
    </Hero>
    <Services />
    <FeaturedRooms />
    <Policy />
    </>
    );
}