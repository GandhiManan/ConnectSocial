// responsible for reading the http request and sending the http request
import * as userService from '../services/user-service.js';
import {setResponse, setErrorResponse} from './response-handler.js'

/**
 * Returns all the users or based on request header
 * @param {*} request 
 * @param {*} response 
 */
export const index = async(request, response) => {
    try{
        const params = {...request.query};
        const user = await userService.search(params);
        setResponse(user, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

/**
 * To register a new user
 * @param {*} request 
 * @param {*} response 
 */
export const post = async(request, response) => {
    try{
        const newUser = request.body;
        const user = await userService.save(newUser);
        setResponse(user, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

/**
 * Return users by email
 * @param {*} request 
 * @param {*} response 
 */
export const searchByEmail = async(request, response) => {
    try{
        const params = request.query
        console.log('request body email', request)
        const user = await userService.searchByEmail(params);
        setResponse(user, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

/**
 * Returns user by id
 * @param {*} request 
 * @param {*} response 
 */
export const getById = async(request, response) => {
    try{
        const id = request.params.id;
        const user = await userService.getById(id);
        setResponse(user, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

/**
 * To update an existing user
 * @param {*} request 
 * @param {*} response 
 */
export const put = async(request, response) => {
    try{
        const id = request.params.id;
        const updateUser = request.body;
        const users = await userService.update(id,updateUser);
        setResponse(users, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

/**
 * to delete user by id
 * @param {*} request 
 * @param {*} response 
 */
export const remove = async(request, response) => {
    try{
        const id = request.params.id;
        const users = await userService.remove(id);
        setResponse({}, response)
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}