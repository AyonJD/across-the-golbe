import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { articleContext } from '../../App';
import { AiOutlineEye } from 'react-icons/ai';
import { BsShareFill } from 'react-icons/bs';
import { RiErrorWarningLine } from 'react-icons/ri';
import Location from '../Location/Location';
import Groups from '../Groups/Groups';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import UpdatePost from '../UpdatePost/UpdatePost';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Articles = () => {
    const navigate = useNavigate()
    const data = useContext(articleContext);
    const { articles, setArticleId, signedInUser } = data;
    const user = useAuthState(auth)
    const articleCopy = [...articles];
    const authUser = useAuthState(auth);

    useEffect(() => {
        document.addEventListener("DOMContentLoaded", () => {

            ('[data-toggle="tooltip"]').tooltip();
        });
    }, [])

    const handleArticleClick = (id) => {
        if (authUser[0]) {
            setArticleId(id);
        } else {
            toast.error('Please sign in to edit this article');
        }
    }

    return (
        <div className='container mt-3'>
            <div className='row making_responsive_gap'>
                <div className="col-12 col-md-7">
                    {
                        articleCopy?.reverse().map(article => {
                            return (
                                <div key={article?._id} onClick={() => navigate(`/articles/${article?._id}`)} className="card my-4">
                                    <img src={article?.img} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <span className="badge text-bg-primary">{article?.Category}</span>
                                        <div className="d-flex justify-content-between align-items-denter">
                                            <h4 className='card-title mt-1 d-inline-block' title={article?.Title}>{article?.Title?.slice(0, 45)}{article?.Title?.length > 45 && "..."}</h4>
                                            <h2 onClick={() => { handleArticleClick(article?._id) }} title='Edit' className='d-inline-block edit_button ms-3'>
                                                {authUser[0] ? (<UpdatePost />) : "..."}
                                            </h2>
                                        </div>
                                        <p title={article?.desc} className="card-text text-muted">{article?.desc?.slice(0, 150)}{article?.desc?.length > 150 && "..."}</p>

                                        <div className="author_section d-flex justify-content-between align-items-center">
                                            <div className="main_author d-flex align-items-center">
                                                <img className='rounded-circle' src={article?.author?.authorImage} alt="" />
                                                <h6 className='ms-3 fw-bold'>{article?.author?.name}</h6>
                                            </div>

                                            <div className="counter d-flex align-items-center">
                                                <div className="view_count">
                                                    <AiOutlineEye className='views' />
                                                    <span className='ms-1 views'>{article?.view} views</span>
                                                </div>
                                                <BsShareFill title='Share this article' className='ms-3 share_button' />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
                <div className="col-12 col-md-4 ms-auto hide_on_mobile position-sticky">
                    <Location />
                    <div className='d-flex width_control'>
                        <RiErrorWarningLine className='warning_icon' />
                        <p className='location_details'>Your location will help us serve better and extend a personalised experience.</p>
                    </div>

                    {
                        user[0] && <Groups />
                    }
                </div>
            </div>

        </div>
    );
};

export default Articles;
