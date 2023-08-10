//handles all the business logic
import Notification from '../models/notification.js';

/**
 * Returns all notifications
 * @param {*} params 
 * @returns 
 */
export const search= async (params) => {
    const notif = Notification.find(params).exec();
    return notif;
}

/**
 * To add a new notification detail
 * @param {*} newNotif
 * @returns 
 */
export const save = async (newNotif) => {
    console.log('in save1', newNotif)
    const notif = new Notification(newNotif);
    return notif.save();
}

/**
 * To search notification by id
 * @param {*} id 
 * @returns 
 */
export const getById = async(id) => {
    const notif = Notification.findById(id).exec();
    return notif;
}

/**
 * Update notification
 * @param {*} id 
 * @param {*} updatedNotif
 * @returns 
 */
export const update = async(id, updatedNotif) => {
    const notif = Notification.findByIdAndUpdate(id, updatedNotif).exec();
    return notif;
}

/**
 * To delete a notification
 * @param {*} id 
 * @returns 
 */
export const remove = async(id) => {
    const notif = Notification.findByIdAndDelete(id).exec();
    return notif;
}