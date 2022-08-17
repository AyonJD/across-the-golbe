import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/whole.png';

const Header = () => {
    const navigate = useNavigate()
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
                                <li><Link className="dropdown-item" to="/create-account">Create Account</Link></li>
                                <li><Link className="dropdown-item" to="/signin">Sign In</Link></li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    );
};

export default Header;