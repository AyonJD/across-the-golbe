import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/whole.png';

const Header = () => {
    const navigate = useNavigate()
    return (
        <nav class="navbar navbar-expand-lg shadow-sm bg-white">
            <div class="container">
                <div class="navbar-brand">
                    <img onClick={() => navigate('/')} class="w-50" src={logo} alt="" />
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <form class="nav_form position-relative border-0" role="search">
                    <AiOutlineSearch className='position-absolute search_icon' />
                    <input class="form-control border-0 me-2 ps-5 rounded-pill fw-normal" type="search" placeholder="Search for your favorite groups in ATG" aria-label="Search" />
                </form>
                <div class="collapse nav_option navbar-collapse" id="navbarSupportedContent">


                    <ul class="navbar-nav align-items-center ms-auto mb-2 mb-lg-0">
                        <p className='mb-0 fw-semibold'>Create account.</p>
                        <li class="nav-item dropdown">
                            <Link class="nav-link fw-semibold dropdown-toggle text-primary" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                It's Free
                            </Link>
                            <ul class="dropdown-menu">
                                <li><Link class="dropdown-item" to="/create-account">Create Account</Link></li>
                                <li><Link class="dropdown-item" to="/signin">Sign In</Link></li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    );
};

export default Header;