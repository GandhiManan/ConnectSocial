//handles all the business logic
import User from '../models/user.js';

/**
 * Returns all users
 * @param {*} params 
 * @returns 
 */
export const search = async (params) => {
    console.log("paramss", params)
    const users = User.find(params).exec();
    return users;
}

/**
 * To register a new user detail
 * @param {*} newUser 
 * @returns 
 */
export const save = async (newUser) => {
    console.log('in save1', newUser)
    let user = new User(newUser);
    console.log('in save2', user)
    return user.save();
}

/**
 * Returns by email id
 * @param {*} params 
 * @returns 
 */
export const searchByEmail = async (email) => {
    try {
        const user = await User.findOne({ email }).exec();
        return user;
    } catch (error) {
        console.error('Error searching by email:', error);
        throw error;
    }
}

/**
 * To search user by id
 * @param {*} id 
 * @returns 
 */
export const getById = async (id) => {
    const user = User.findById(id);
    return user;
}

/**
 * Update user
 * @param {*} id 
 * @param {*} updatedUser 
 * @returns 
 */
export const update = async (id, updatedUser) => {
    const user = User.findByIdAndUpdate(id, updatedUser).exec();
    return user;
}

/**
 * To delete a User
 * @param {*} id 
 * @returns 
 */
export const remove = async (id) => {
    const user = User.findByIdAndDelete(id).exec();
    return user;
}