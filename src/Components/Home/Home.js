import React from 'react';
import Articles from '../Articles/Articles';
import Banner from '../Banner/Banner';
import PhoneViewPost from './Tab/PhoneViewPost';
import Post from './Tab/Post';

const Home = () => {
    return (
        <div>
            <Banner />

            <Post />
            <PhoneViewPost />
            <Articles />
        </div>
    );
};

export default Home;