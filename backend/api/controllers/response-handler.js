export const setResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}

export const setErrorResponse = (httpStatus, err, response) => {
    response.status(httpStatus);
    const error = {
        code: httpStatus,
        message: err
    }
    response.json({error});

}