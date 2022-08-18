import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { articleContext } from '../../App';

const Groups = () => {
    const [groups, setGroups] = useState([])
    const data = useContext(articleContext);
    const setHandleGroupState = data.setHandleGroupState;
    useEffect(() => {
        fetch('https://still-waters-50260.herokuapp.com/groups')
            .then(res => res.json())
            .then(data => setGroups(data))
    }, [])

    return (
        <div>
            {
                groups.map(group => {
                    return (
                        <div className='d-flex align-items-center my-3 ms-auto justify-content-between group_width'>
                            <div className='d-flex align-items-center'>
                                <img className='group_image' src={group?.img} alt="" />
                                <h6>{group?.name}</h6>
                            </div>
                            <button onClick={() => setHandleGroupState(true)} className='btn rounded-pill follow_button'>Follow</button>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Groups;