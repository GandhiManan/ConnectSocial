//handles all the business logic
import PostUploaded from '../models/post.js';

/**
 * Returns all posts
 * @param {*} params 
 * @returns 
 */
export const search= async (params) => {
    const p = PostUploaded.find(params).exec();
    return p;
}

/**
 * To add a new post detail
 * @param {*} newPost
 * @returns 
 */
export const save = async (newPost) => {
    console.log('in save1', newPost)
    const p = new PostUploaded(newPost);
    console.log('in save2', p)
    return p.save();
}

/**
 * To search post by id
 * @param {*} id 
 * @returns 
 */
export const getById = async(id) => {
    const p = PostUploaded.findById(id).exec();
    return p;
}

/**
 * Update post
 * @param {*} id 
 * @param {*} updatedPost
 * @returns 
 */
export const update = async(id, updatedPost) => {
    const p = PostUploaded.findByIdAndUpdate(id, updatedPost).exec();
    return p;
}

/**
 * To delete a Post
 * @param {*} id 
 * @returns 
 */
export const remove = async(id) => {
    const p = PostUploaded.findByIdAndDelete(id).exec();
    return p;
}