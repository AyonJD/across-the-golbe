import React, { useContext } from 'react';
import { articleContext } from '../../../App';

const PhoneViewPost = () => {
    const articles = useContext(articleContext);
    return (
        <div name='phone-article' className="container sub_tabs mt-5">
            <div className='row'>
                <p className='fw-bold d-inline-block col-8'>Posts({articles?.length})</p>
                <div className="col-4 text-end">
                    <select defaultValue={'DEFAULT'} className="">
                        <option disabled value="DEFAULT">Filter: All</option>
                        <option value='One'>One</option>
                        <option value='Two'>Two</option>
                        <option value='Three'>Three</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default PhoneViewPost;