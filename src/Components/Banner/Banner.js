import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const Banner = () => {
    return (
        <div className='banner_section position-relative'>
            <div className="join_group_section position-absolute d-flex align-items-center pt-5">
                <FaArrowLeft className='text-white fs-4' />
                <button className="join_group_button btn btn-success">Join Group</button>
            </div>
            <div className="position-absolute banner_text">
                <h1 className='text-white'>Computer Engineering</h1>
                <p className='text-white fw-normal'>142,765 Computer Engineers follow this</p>
            </div>
        </div>
    );
};

export default Banner;