import { search, add, searchByBody } from './rest-service';
import User from '../models/user.ts';

const authURI = '/auth';

export const searchUser =async () => {
    const user = await search(authURI, {})
    return user;
}

export const searchUserByEmail =async (email) => {
    const user = await searchByBody(`${authURI}/login`, {}, email);
    return user;
}

export const addUser =async (data) => {
    const user = await add(`${authURI}/register`, {}, data)
    return user;
}