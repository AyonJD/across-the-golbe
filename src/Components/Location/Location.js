import React, { useState } from 'react';
import { useEffect } from 'react';
import { BsPencilFill } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';

const Location = () => {
    const [disable, setDisable] = useState(true);
    const [location, setLocation] = useState('');

    // get my location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const p = position.coords;

            // Get my location using google maps api
            return fetch(`https://nominatim.openstreetmap.org/reverse?lat=${p.latitude}&lon=${p.longitude}`)
                .then(response => response.text())
                .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                .then(data => {
                    const location = data.querySelector("state_district").textContent;
                    setLocation(location);
                })
                .catch(err => console.log(err));

        })
    }, [])

    return (

        <form action="#" class="custom-form d-flex justify-content-end align-items-start">
            <div class="form-group d-flex align-items-center" ng-class="{'not-empty': userName.length}">

                <div className='position-relative'>
                    <GoLocation className='location_mark position-relative' />
                    <input type="text" class={`form-control me-3 location_input ${!disable ? "input_border" : "location_input"}`} name="user" id="user" ng-model="userName" disabled={disable} onChange={(e) => setLocation(e.target.value)} value={location} />
                </div>
                {/* <label for="user" class="animated-label">{location}</label> */}
                <BsPencilFill className='focus_button pointer' onClick={() => setDisable(!disable)}>Edit</BsPencilFill>
            </div>
        </form>
    );
};

export default Location;