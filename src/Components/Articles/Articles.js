import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { articleContext } from '../../App';

const Articles = () => {
    const articles = useContext(articleContext);
    console.log(articles)

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
                                        <h4 className='card-title'>{article?.Title}</h4>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
