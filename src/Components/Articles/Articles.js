import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { articleContext } from '../../App';
import { AiOutlineEye } from 'react-icons/ai';
import { BsShareFill } from 'react-icons/bs';

const Articles = () => {
    const articles = useContext(articleContext);
    console.log(articles)

    useEffect(() => {
        document.addEventListener("DOMContentLoaded", () => {

            ('[data-toggle="tooltip"]').tooltip();
        });
    }, [])

    return (
        <div className='container'>
            <div className='row'>
                <div className="col-12 col-md-7">
                    {
                        articles.map(article => {
                            return (
                                <div key={article?._id} className="card">
                                    <img src={article?.img} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <span class="badge text-bg-primary">{article?.Category}</span>
                                        <div className="d-flex justify-content-between align-items-denter">
                                            <h4 className='card-title mt-1 d-inline-block' title={article?.Title}>{article?.Title?.slice(0, 45)}{article?.Title?.length > 45 && "..."}</h4>
                                            <h2 title='Edit' className='d-inline-block edit_button ms-3'>...</h2>
                                        </div>
                                        <p title={article?.desc} className="card-text text-muted">{article?.desc?.slice(0, 150)}{article?.desc?.length > 150 && "..."}</p>

                                        <div className="author_section d-flex justify-content-between align-items-center">
                                            <div className="main_author d-flex align-items-center">
                                                <img className='' src={article?.author?.authorImage} alt="" />
                                                <h6 className='ms-3 fw-bold'>{article?.author?.name}</h6>
                                            </div>

                                            <div className="counter d-flex align-items-center">
                                                <div className="view_count">
                                                    <AiOutlineEye className='views' />
                                                    <span className='ms-1 views'>{article?.view} views</span>
                                                </div>
                                                <BsShareFill title='Share this article' className='ms-5 share_button' />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
                <div className="col-12 col-md-4">

                </div>
            </div>

        </div>
    );
};

export default Articles;
