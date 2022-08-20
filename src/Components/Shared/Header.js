import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/whole.png';
import Popup from 'reactjs-popup';
import googleImage from '../../assets/icons8-google.svg';
import gitImage from '../../assets/gid.gif';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import ResetPass from './ResetPass';

const Header = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [openTwo, setOpenTwo] = useState(false);
    const closeModal = () => setOpen(false);
    const [user, setUser] = useState({});
    const [userName, setUserName] = useState('');
    const { register, formState: { errors }, handleSubmit, trigger, reset } = useForm();

    const [signInWithGoogle, , , ,] = useSignInWithGoogle(auth);
    const [createUserWithEmailAndPassword, , , ,] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithEmailAndPassword, , , ,] = useSignInWithEmailAndPassword(auth);
    const authUser = useAuthState(auth);

    //Handle signup with email and password
    const onSubmit = async data => {
        const displayName = `${data.fName} ${data.lName}`;
        setUserName(displayName);
        createUserWithEmailAndPassword(data.email, data.password)

        //POST a new user to the database
        const user = {
            name: displayName,
            email: data.email,
            authorImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
            password: data.password,
            createdAt: new Date().toISOString(),
        };
        fetch(`http://localhost:5000/users/${data.email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'User already exists') {
                    toast.error(data.message);
                } else {
                    toast.success(data.message);
                    setUser(data.user)
                    reset();
                    setOpenTwo(false);
                    setOpen(false);
                }
            })
    }

    //Handle login with email and password
    const handleLogin = e => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password)
        if (email === '' || password === '') {
            toast.error('Please fill out all fields');
            return
        }

        fetch(`http://localhost:5000/users/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.password !== password) {
                    toast.error('Incorrect password');
                } else if (data.message === 'User not found') {
                    toast.error(data.message);
                } else {
                    toast.success('Logged in successfully');
                    setUser(data.user);
                    setOpen(false);
                    setOpenTwo(false);
                }
            })
    }



    const handleGoogleSigning = async () => {
        await signInWithGoogle();
        setOpenTwo(false);
        setOpen(false);
    }
    // console.log(authUser);

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
                </form >
                <div className="collapse nav_option navbar-collapse" id="navbarSupportedContent">


                    <ul className="navbar-nav align-items-center ms-auto mb-2 mb-lg-0">

                        {
                            authUser[0]?.email ? (
                                <div className="d-flex align-items-center">
                                    <img className='authUser' src={user?.authorImage
                                    } alt="" /> <span>{user?.name}</span>


                                    <li className="nav-item dropdown">
                                        <Link className="nav-link fw-semibold text-black dropdown-toggle text-primary" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span className="ml-2 text-black">{authUser[0]?.displayName}</span>
                                        </Link>

                                        <ul className="dropdown-menu">
                                            <li onClick={() => signOut(auth)} className='dropdown-item'>
                                                Sign Out
                                            </li>
                                        </ul>
                                    </li>

                                </div>
                            ) : (
                                <>
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

                                                            <form onClick={handleSubmit(onSubmit)} className='form_radius'>
                                                                <div className="input-group main_group">
                                                                    <input type="text" placeholder='First Name' aria-label="First name" className="form-control signup_input_group"
                                                                        {...register("fName", {
                                                                            required: true,
                                                                            minLength: {
                                                                                value: 3, message: 'Minimum 3 character required'
                                                                            }
                                                                        })}

                                                                        onKeyUp={() => {
                                                                            trigger('fName')
                                                                        }}
                                                                    />
                                                                    <input type="text" placeholder='Last Name' aria-label="Last name" className="form-control signup_input_group"
                                                                        {...register("lName", {
                                                                            required: true,
                                                                            minLength: {
                                                                                value: 3, message: 'Minimum 3 character required'
                                                                            }
                                                                        })}

                                                                        onKeyUp={() => {
                                                                            trigger('lName')
                                                                        }}
                                                                    />

                                                                    <div className="input-group ">
                                                                        <input className="form-control signup_input_group" type="email" placeholder="Email" aria-label="Email"
                                                                            {...register("email", {
                                                                                required: 'Email is required',
                                                                                pattern: {
                                                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                                    message: "Please enter a valid Email"
                                                                                }
                                                                            })}
                                                                            onKeyUp={(e) => {
                                                                                trigger('email')
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className="input-group ">
                                                                        <input className="form-control signup_input_group" type="password" placeholder='Password'
                                                                            {...register('password', {
                                                                                required: 'Password is required',
                                                                                pattern: {
                                                                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                                                                    message: "Minimum eight characters, at least one uppercase and one number"
                                                                                }
                                                                            })}
                                                                            onKeyUp={() => {
                                                                                trigger('password')
                                                                            }}
                                                                        />


                                                                    </div>
                                                                    <div className="input-group ">
                                                                        <input className="form-control last signup_input_group" type="password" placeholder='Confirm Password'
                                                                            {...register('Cpassword', {
                                                                                required: 'Password is required',
                                                                                pattern: {
                                                                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                                                                    message: "Minimum eight characters, at least one uppercase and one number"
                                                                                }
                                                                            })}
                                                                            onKeyUp={() => {
                                                                                trigger('Cpassword')
                                                                            }}
                                                                        />
                                                                    </div>

                                                                    <div className="submit_parent mt-4">
                                                                        <button type='submit' className='btn btn-primary submit_button rounded-pill'>Create Account</button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                            <div className="social_login">
                                                                <div onClick={() => handleGoogleSigning()} className='d-flex align-items-center px-3 justify-content-center single_login'>
                                                                    <img className=' d-inline-block' src={googleImage} alt="" />
                                                                    <h6 className='mb-0 ms-2 d-inline-block'>Signin with Google</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-6 hide_on_mobile">
                                                            <p className='text-end'>Already have an account? <span className='text-primary pointer'>Sign In</span></p>

                                                            <img className='gif' src={gitImage} alt="" />
                                                        </div>
                                                    </div>
                                                </div>


                                            </Popup>


                                            <li className='dropdown-item' onClick={() => setOpenTwo(o => !o)}>
                                                Sign In
                                            </li>
                                            <Popup className="popup_content " open={openTwo} closeOnDocumentClick onClose={closeModal} position="left center">

                                                <div className='bg-light px-4 container pb-4 popup_bg'>
                                                    <p className='signup_top text-center py-3'>Let's learn, share & inspire each other with our passion for computer engineering. Sign In now 🤘🏼</p>
                                                    <div className="row">
                                                        <div className="col-12 col-lg-6">
                                                            <h1>Sign In</h1>

                                                            <form onClick={(e) => handleLogin(e)} className='form_radius'>
                                                                <div className="input-group main_group">



                                                                    <div className="input-group ">
                                                                        <input className="form-control signup_input_group" type="email" placeholder="Email" aria-label="Email"
                                                                            onKeyUp={(e) => {
                                                                                setEmail(e.target.value)
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className="input-group ">
                                                                        <input className="last form-control signup_input_group" type="password" placeholder='Password'
                                                                            onKeyUp={(e) => {
                                                                                setPassword(e.target.value)
                                                                            }}
                                                                        />


                                                                    </div>

                                                                    <div className="submit_parent mt-4">
                                                                        <button type='submit' className='btn btn-primary submit_button rounded-pill'>Sign In</button>
                                                                    </div>
                                                                </div>
                                                            </form>

                                                            <div className="social_login">
                                                                <div onClick={() => handleGoogleSigning()} className='d-flex align-items-center px-3 justify-content-center single_login'>
                                                                    <img className=' d-inline-block' src={googleImage} alt="" />
                                                                    <h6 className='mb-0 ms-2 d-inline-block'>Signin with Google</h6>
                                                                </div>
                                                            </div>
                                                            {/* <p onClick={handleForgetPassword} className='text-primary text-center mt-3 pointer'>Forget Password</p> */}


                                                        </div>
                                                        <div className="col-12 col-lg-6">
                                                            <p className='text-end'>Don't have an account? <span className='text-primary'>Sign Up</span></p>

                                                            <img className='gif' src={gitImage} alt="" />
                                                        </div>
                                                    </div>
                                                </div>

                                            </Popup>
                                            <li className="dropdown-item">
                                                <ResetPass />
                                            </li>

                                        </ul>
                                    </li>


                                </>
                            )
                        }
                    </ul>
                </div>
            </div >
        </nav >
    );
};

export default Header;