import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { BsShareFill } from 'react-icons/bs';
import { articleContext } from '../../App';
import { IoMdThumbsDown, IoMdThumbsUp } from "react-icons/io";

const SingleArticle = () => {
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const [upsertCount, setUpsertCount] = useState(false);
    const data = useContext(articleContext);
    const { signedInUser } = data;
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/articles/${id}`)
            .then(res => res.json())
            .then(data => setArticle(data))
    }, [id, article])


    const handleLike = (id) => {
        if (
            article?.likes?.includes(signedInUser?._id) === false &&
            signedInUser?._id !== undefined
        ) {
            // console.log([...article.blogs.likes, signedInUser._id])
            fetch(`http://localhost:5000/articles/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    likes: [...article?.likes, signedInUser._id],
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if (data.acknowledged && article?.likes.includes(id)) {
                        setUpsertCount(true);
                    } else {
                        setUpsertCount(false);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            alert("Please login to like this article");
        }
    };

    //Handle Unlike button
    const handleUnlike = (id) => {
        if (article?.likes.includes(signedInUser._id)) {
            fetch(`http://localhost:5000/articles/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    likes: article?.likes?.filter(like => like !== signedInUser._id),
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.acknowledged && article?.likes.includes(id)) {
                        setUpsertCount(true);
                    } else {
                        setUpsertCount(false);
                    }
                })
                .catch((err) => console.log(err));
        }
    };


    //Handle Comment button
    const handleComment = (id) => {
        
    }



    return (
        <div className='container my-4 single_article'>
            <div className="author_section d-flex justify-content-between mb-1 bg-secondary p-2 rounded-pill text-white align-items-center">
                <div className="main_author d-flex align-items-center">
                    <img className='rounded-circle' src={article?.author?.authorImage} alt="" />
                    <h6 className='ms-3 fw-bold'>{article?.author?.name}</h6>
                </div>

                <div className="counter d-flex align-items-center">
                    <div className="view_count text-white">
                        <AiOutlineEye className=' text-white' />
                        <span className='ms-1  text-white'>{article?.view} views</span>
                    </div>
                    <BsShareFill title='Share this article' className='ms-3 me-3 share_button' />
                </div>
            </div>

            <div className="card">
                <img src={article?.img} className="card-img-top" alt="..." />
                <div className="card-body">
                    <span className="badge text-bg-primary">{article?.Category}</span>
                    <div className="d-flex justify-content-between align-items-denter">
                        <h4 className='card-title mt-1 d-inline-block' title={article?.Title}>{article?.Title?.slice(0, 45)}{article?.Title?.length > 45 && "..."}</h4>
                    </div>
                    <p>{article?.desc}</p>
                    <div className='d-flex align-items-center'>
                        <p className="text-black mr-4 mb-0">{article?.likes?.length} likes</p>
                        {article?.likes?.includes(signedInUser?._id) || upsertCount ? (
                            <IoMdThumbsDown
                                className="thumbs_down"
                                onClick={() => handleUnlike(id)}
                            />
                        ) : (
                            <IoMdThumbsUp
                                className="thumbs_up me-2 "
                                onClick={() => handleLike(id)}
                            />
                        )}
                    </div>
                </div>
            </div >

            <h4>Leave a comment</h4>
            <form onSubmit={() => handleComment(id)} className="form-group">
                <textarea className="form-control" rows="3" placeholder="Write a comment..."
                    onKeyUp={(e) => { setComment(e.target.value) }}
                ></textarea>
                <button className="btn btn-primary mt-2">Submit</button>
            </form>

        </div>
    );
};

export default SingleArticle;