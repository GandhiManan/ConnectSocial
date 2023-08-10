// responsible for reading the http request and sending the http request
import * as notifService from '../services/notification-service.js';
import { setResponse, setErrorResponse } from './response-handler.js'

/**
 * Returns all the notifications or based on request header
 * @param {*} request 
 * @param {*} response 
 */
export const getAll = async (request, response) => {
    try {
        const params = { ...request.query };
        const notif = await notifService.search(params);
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
export const post = async (request, response) => {
    try {
        const newNotif = request.body;
        const notif = await notifService.save(newNotif);
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
        const params = request.query;
        const notif = await notifService.search(params);
        setResponse(notif, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

/**
 * Returns notification by id
 * @param {*} request 
 * @param {*} response 
 */
export const getById = async (request, response) => {
    try {
        const id = request.params.id;
        const notif = await notifService.getById(id);
        setResponse(notif, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

/**
 * To update an existing notification
 * @param {*} request 
 * @param {*} response 
 */
export const put = async (request, response) => {
    try {
        const id = request.params.id;
        const updateNotif = request.body;
        const notifs = await notifService.update(id, updateNotif);
        setResponse(notifs, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

/**
 * to delete nottification by id
 * @param {*} request 
 * @param {*} response 
 */
export const remove = async (request, response) => {
    try {
        const id = request.params.id;
        const notifs = await notifService.remove(id);
        setResponse({}, response)
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}