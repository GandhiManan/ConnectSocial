import { add, searchByBody } from './rest-service';

const postURI = '/post';

// export const searchUser =async () => {
//     const user = await search(authURI, {})
//     return user;
// }

export const getAllPostByUserID =async (id) => {
    const user = await searchByBody(`/dashboard/feed/`, {}, id);
    return user;
}

export const addPost =async (data) => {
    const p = await add(`${postURI}/create`, {}, data)
    return p;
}

export const updatePost =async (newData) => {
    const p = await update(`${postURI}`, {}, newData)
    return p;
}