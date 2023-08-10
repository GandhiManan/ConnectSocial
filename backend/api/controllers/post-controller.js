// responsible for reading the http request and sending the http request
import * as postService from '../services/post-service.js';
import {setResponse, setErrorResponse} from './response-handler.js'

/**
 * Returns all the posts or based on request header
 * @param {*} request 
 * @param {*} response 
 */
export const getAll = async(request, response) => {
    try{
        const params = {...request.query};
        const post = await postService.search(params);
        setResponse(post, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

/**
 * To register a new post
 * @param {*} request 
 * @param {*} response 
 */
export const post = async(request, response) => {
    try{
        const newpost = request.body;
        const post = await postService.save(newpost);
        setResponse(post, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

/**
 * Get all the posts for a user
 * @param {*} request 
 * @param {*} response 
 */
export const getAllByAccountId = async(request, response) => {
    try{
        const params = request.query;
        const post = await postService.search(params);
        setResponse(post, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

/**
 * Returns post by id
 * @param {*} request 
 * @param {*} response 
 */
export const getById = async(request, response) => {
    try{
        const id = request.params.id;
        const post = await postService.getById(id);
        setResponse(post, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

/**
 * To update an existing post
 * @param {*} request 
 * @param {*} response 
 */
export const put = async(request, response) => {
    try{
        const id = request.params.id;
        const updatepost = request.body;
        const posts = await postService.update(id,updatepost);
        setResponse(posts, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

/**
 * to delete post by id
 * @param {*} request 
 * @param {*} response 
 */
export const remove = async(request, response) => {
    try{
        const id = request.params.id;
        const posts = await postService.remove(id);
        setResponse({}, response)
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}