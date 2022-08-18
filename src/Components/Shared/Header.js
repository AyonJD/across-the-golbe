import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/whole.png';
import Popup from 'reactjs-popup';
import googleImage from '../../assets/icons8-google.svg';
import gitImage from '../../assets/gid.gif';

const Header = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [openTwo, setOpenTwo] = useState(false);
    const closeModal = () => setOpen(false);
    return (
        <nav className="navbar navbar-expand-lg shadow-sm bg-white position-sticky top-0 header">
            <div className="container">
                <div className="navbar-brand">
                    <img onClick={() => navigate('/')} className="w-50" src={logo} alt="" />
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <form className="nav_form position-relative border-0" role="search">
                    <AiOutlineSearch className='position-absolute search_icon' />
                    <input className="form-control border-0 me-2 ps-5 rounded-pill fw-normal" type="search" placeholder="Search for your favorite groups in ATG" aria-label="Search" />
                </form>
                <div className="collapse nav_option navbar-collapse" id="navbarSupportedContent">


                    <ul className="navbar-nav align-items-center ms-auto mb-2 mb-lg-0">
                        <p className='mb-0 fw-semibold'>Create account.</p>
                        <li className="nav-item dropdown">
                            <Link className="nav-link fw-semibold dropdown-toggle text-primary" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                It's Free
                            </Link>
                            <ul className="dropdown-menu">

                                <li className='dropdown-item' onClick={() => setOpen(o => !o)}>
                                    Sign Up
                                </li>
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

                                                        <div className="submit_parent mt-4">
                                                            <button type='submit' className='btn btn-primary submit_button rounded-pill'>Create Account</button>
                                                        </div>
                                                    </div>
                                                </form>
                                                <div className="social_login">
                                                    <div className='d-flex align-items-center px-3 justify-content-center single_login'>
                                                        <img className=' d-inline-block' src={googleImage} alt="" />
                                                        <h6 className='mb-0 ms-2 d-inline-block'>Signin with Google</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6">
                                                <p className='text-end'>Already have an account? <span className='text-primary'>Sign In</span></p>

                                                <img className='gif' src={gitImage} alt="" />
                                            </div>
                                        </div>
                                    </div>


                                </Popup>

                                {/* <li><Link className="dropdown-item" to="/create-account">Create Account</Link></li> */}


                                <li className='dropdown-item' onClick={() => setOpenTwo(o => !o)}>
                                    Sign In
                                </li>
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

                                                        <div className="submit_parent mt-4">
                                                            <button type='submit' className='btn btn-primary submit_button rounded-pill'>Sign In</button>
                                                        </div>
                                                    </div>
                                                </form>
                                                <div className="social_login">
                                                    <div className='d-flex align-items-center px-3 justify-content-center single_login'>
                                                        <img className=' d-inline-block' src={googleImage} alt="" />
                                                        <h6 className='mb-0 ms-2 d-inline-block'>Signin with Google</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6">
                                                <p className='text-end'>Don't have an account? <span className='text-primary'>Sign Up</span></p>

                                                <img className='gif' src={gitImage} alt="" />
                                            </div>
                                        </div>
                                    </div>

                                </Popup>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div >
        </nav >
    );
};

export default Header;