import React, { useContext } from 'react';
import { articleContext } from '../../../App';
import Articles from '../../Articles/Articles';

const PhoneViewPost = () => {
    const data = useContext(articleContext);
    const articles = data.articles;
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

            <Articles />
        </div>
    );
};

export default PhoneViewPost;