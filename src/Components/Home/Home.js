import React from 'react';
import Banner from '../Banner/Banner';
import PhoneViewPost from './Tab/PhoneViewPost';
import Post from './Tab/Post';

const Home = () => {
    return (
        <div>
            <Banner />

            <Post />
            <PhoneViewPost />
        </div>
    );
};

export default Home;