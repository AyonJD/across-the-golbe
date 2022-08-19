import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import googleImage from '../../assets/icons8-google.svg';
import gitImage from '../../assets/gid.gif';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Banner = () => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [openTwo, setOpenTwo] = useState(false);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    const handleGoogleSigning = async () => {
        await signInWithGoogle();
        setOpenTwo(false);
        setOpen(false);
    }
    return (
        <div className='banner_section position-relative'>
            <div className="join_group_section position-absolute d-flex align-items-center pt-5">
                <FaArrowLeft className='text-white fs-4' />
                <button onClick={() => setOpen(o => !o)} className="join_group_button btn btn-success">Join Group</button>
            </div>

            <Popup className="popup_content " open={open} closeOnDocumentClick onClose={closeModal} position="left center">

                <div className='bg-light px-4 container pb-4 popup_bg'>
                    <p className='signup_top text-center py-3'>Let's learn, share & inspire each other with our passion for computer engineering. Sign up now 🤘🏼</p>
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <h1>Create Cccount</h1>

                            <form className='form_radius'>
                                <div class="input-group main_group">
                                    <input type="text" placeholder='First Name' aria-label="First name" class="form-control signup_input_group" />
                                    <input type="text" placeholder='Last Name' aria-label="Last name" class="form-control signup_input_group" />

                                    <div class="input-group ">
                                        <input class="form-control signup_input_group" type="email" placeholder="Email" aria-label="Email" />
                                    </div>
                                    <div class="input-group ">
                                        <input class="form-control signup_input_group" type="password" placeholder='Password' />
                                    </div>
                                    <div class="input-group ">
                                        <input class="form-control last signup_input_group" type="password" placeholder='Confirm Password' />
                                    </div>

                                    <div className="mt-4 w-100 d-flex align-items-center justify-content-between">
                                        <button type='submit' className='btn btn-primary w-50 rounded-pill'>Create Account</button>
                                        <p onClick={() => setOpenTwo(o => !o)} className='ms-auto text-end fw-bold pointer'>or, Sign In</p>
                                    </div>
                                </div>
                            </form>
                            <div className="social_login">
                                <div onClick={() => handleGoogleSigning()} className='d-flex align-items-center px-3 bg-white justify-content-center single_login'>
                                    <img className=' d-inline-block' src={googleImage} alt="" />
                                    <h6 className='mb-0 ms-2 d-inline-block'>Signin with Google</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 hide_on_mobile">
                            <p className='text-end'>Already have an account? <span className='text-primary'>Sign In</span></p>

                            <img className='gif' src={gitImage} alt="" />
                        </div>
                    </div>
                </div>


            </Popup>


            <Popup className="popup_content " open={openTwo} closeOnDocumentClick onClose={closeModal} position="left center">

                <div className='bg-light px-4 container pb-4 popup_bg'>
                    <p className='signup_top text-center py-3'>Let's learn, share & inspire each other with our passion for computer engineering. Sign In now 🤘🏼</p>
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <h1>Sign In</h1>

                            <form className='form_radius'>
                                <div class="input-group main_group">

                                    <div class="input-group ">
                                        <input class="form-control signup_input_group" type="email" placeholder="Email" aria-label="Email" />
                                    </div>
                                    <div class="input-group ">
                                        <input class="form-control signup_input_group last" type="password" placeholder='Password' />
                                    </div>


                                    <div className="mt-4 w-100 d-flex align-items-center justify-content-between">
                                        <button type='submit' className='btn btn-primary w-50 rounded-pill'>Sign In</button>
                                        <p onClick={() => setOpen(o => !o)} className='ms-auto text-end fw-bold pointer'>or, Sign Up</p>
                                    </div>

                                </div>
                            </form>
                            <div className="social_login">
                                <div onClick={() => handleGoogleSigning()} className='d-flex align-items-center px-3 justify-content-center single_login'>
                                    <img className=' d-inline-block' src={googleImage} alt="" />
                                    <h6 className='mb-0 ms-2 d-inline-block'>Signin with Google</h6>
                                </div>
                            </div>
                            <p className='text-primary text-center mt-3 pointer'>Forget Password</p>
                        </div>
                        <div className="col-12 col-lg-6 hide_on_mobile">
                            <p className='text-end'>Don't have an account? <span className='text-primary'>Sign Up</span></p>

                            <img className='gif' src={gitImage} alt="" />
                        </div>
                    </div>
                </div>

            </Popup>

            <div className="position-absolute banner_text">
                <h1 className='text-white'>Computer Engineering</h1>
                <p className='text-white fw-normal'>142,765 Computer Engineers follow this</p>
            </div>
        </div>
    );
};

export default Banner;