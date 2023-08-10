// responsible for reading the http request and sending the http request
import * as msgService from '../services/message-service.js';
import {setResponse, setErrorResponse} from './response-handler.js'

/**
 * Returns all the notifications or based on request header
 * @param {*} request 
 * @param {*} response 
 */
export const getAll = async(request, response) => {
    try{
        const params = {...request.query};
        const notif = await msgService.search(params);
        setResponse(notif, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

/**
 * To register a new notification
 * @param {*} request 
 * @param {*} response 
 */
export const post = async(request, response) => {
    try{
        const newNotif = request.body;
        const notif = await msgService.save(newNotif);
        setResponse(notif, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

/**
 * Get all the notifications for a user
 * @param {*} request 
 * @param {*} response 
 */
export const getAllByAccountId = async(request, response) => {
    try{
        const params = request.body;
        const notif = await msgService.search(params);
        setResponse(notif, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

/**
 * Returns message by id
 * @param {*} request 
 * @param {*} response 
 */
export const getById = async(request, response) => {
    try{
        const id = request.params.id;
        const notif = await msgService.getById(id);
        setResponse(notif, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}