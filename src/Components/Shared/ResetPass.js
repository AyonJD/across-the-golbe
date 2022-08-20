import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';

function ResetPass() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Handle Forget Password
    const handleForgetPassword = e => {
        e.preventDefault()
        if (email === '') {
            toast.error('Please enter your email');
            return
        } else {
            fetch(`http://localhost:5000/users/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.message === "User does not exist") {
                        toast.error(data.message);
                    } else {
                        toast.success(data.message);
                        handleClose();
                    }
                })
        }
    }

    return (
        <>
            <li variant="none" onClick={handleShow}>
                Reset Password
            </li>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={(e) => handleForgetPassword(e)} className='py-5 px-3' >
                        <input type="email" placeholder='Email address' className="input mb-2 py-2 form-control"

                            onKeyUp={(e) => {
                                setEmail(e.target.value)
                            }}
                        />

                        <input className="form-control signup_input_group py-2" type="password" placeholder='Password'
                            onKeyUp={(e) => {
                                setPassword(e.target.value)
                            }}
                        />





                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type='submit' variant="primary">Change Password</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ResetPass;