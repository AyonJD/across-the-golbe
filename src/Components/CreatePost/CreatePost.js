import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { articleContext } from '../../App';
const CreatePost = () => {
    const { register, handleSubmit, watch, formState: { errors }, trigger, reset } = useForm();
    const data = useContext(articleContext);
    const { signedInUser } = data;

    const imageSotrageKey = `0ca5c9cdb23add3ecfaff014d8e4ad9c`

    const handleAddPost = async data => {
        const image = data.image[0];
        const url = `https://api.imgbb.com/1/upload?key=${imageSotrageKey}`
        const formData = new FormData();
        formData.append('image', image);
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result)
                if (result.success) {
                    const img = result.data.url;
                    // console.log(img, 'img-url');
                    const article = {
                        Title: data.title,
                        category: data.category,
                        desc: data.details,
                        img: img,
                        view: 0,
                        date: new Date().toLocaleDateString(),
                        author: signedInUser,
                        likes: [],
                        comments: []
                    }
                    //send data to db
                    fetch(`http://localhost:5000/articles`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            // authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(article)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.message === 'Article created') {
                                // alert('Succuessfully posted')
                                toast.success(`Your post ${data.title.slice(0, 5)}... added successfully.`);

                                reset()
                            }
                            else {
                                toast.error('Failed to add a Article')
                            }
                        }
                        )
                }
            })
    }
    return (
        <div className='container'>
            <form className='w-50 mx-auto' onSubmit={handleSubmit(handleAddPost)}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={signedInUser?.email} readOnly disabled />

                </div>
                <div class="mb-3">
                    <label for="exampleInputtitle" class="form-label">Title</label>
                    <input type="text" class="form-control" id="exampleInputtitle"
                        {...register("title", {
                            required: {
                                value: true,
                                message: 'Title is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.title?.type === 'required' && <small className="label-text-alt text-danger">{errors.title.message}</small>}
                    </label>
                </div>
                <div class="mb-3">
                    <label for="exampleInputCategory" class="form-label">Category</label>
                    <input type="text" class="form-control" id="exampleInputCategory"
                        {...register("category", {
                            required: {
                                value: true,
                                message: 'Category is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.category?.type === 'required' && <small className="label-text-alt text-danger">{errors.category.message}</small>}
                    </label>
                </div>

                <div class="mb-3">
                    <label for="exampleInputTag" class="form-label">Tags</label>
                    <input type="text" class="form-control" id="exampleInputTag"
                        {...register("tag", {
                            required: {
                                value: true,
                                message: 'Tag is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.tags?.type === 'required' && <small className="label-text-alt text-danger">{errors.tag.message}</small>}
                    </label>
                </div>

                <div class="mb-3">
                    <label for="exampleInputDetails" class="form-label">Details</label>
                    <textarea type="text" class="form-control" id="exampleInputDetails"
                        {...register("details", {
                            required: {
                                value: true,
                                message: 'Details is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.details?.type === 'required' && <small className="label-text-alt text-danger">{errors.details.message}</small>}
                    </label>
                </div>

                <div class="mb-3">
                    <label for="exampleInputFile" class="form-label">Image</label>
                    <input type="file" class="form-control" id="exampleInputFile"
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.image?.type === 'required' && <small className="label-text-alt text-danger">{errors.image.message}</small>}
                    </label>
                </div>

                <button type="submit" class="btn btn-primary">Post</button>
            </form>

        </div>
    );
};

export default CreatePost;