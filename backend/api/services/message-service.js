//handles all the business logic
import Message from '../models/message.js';

/**
 * Returns all msgs
 * @param {*} params 
 * @returns 
 */
export const search= async (params) => {
    console.log("paramss", params)
    const msg = Message.find(params).exec();
    return msg;
}

/**
 * To add a new message
 * @param {*} newMessage
 * @returns 
 */
export const save = async (newMessage) => {
    console.log('in save1', newMessage)
    const msg = new Message(newMessage);
    console.log('in save2', msg)
    return msg.save();
}

/**
 * To search message by id
 * @param {*} id 
 * @returns 
 */
export const getById = async(id) => {
    const msg = Message.findById(id).exec();
    return msg;
}