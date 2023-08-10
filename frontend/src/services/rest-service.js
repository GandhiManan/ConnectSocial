const baseURI = 'http://localhost:9000';

export const search = async (uri, query) => {
    const params = new URLSearchParams(query);
    console.log('uri', uri)
    const response = await fetch(baseURI+uri, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data= (await response.json());
    return data;
}

export const searchByBody = async (uri, query, bodyParam) => {
    const params = new URLSearchParams(query);
    console.log('uri', baseURI+uri, bodyParam)
    const response = await fetch(baseURI+uri, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        params: bodyParam
    });
    const data = (await response.json());
    return data;
}

export const add = async(uri, query, newData) => {
    const params = new URLSearchParams(query);
    console.log('uri', baseURI+uri, 'new',newData , JSON.stringify(newData))
    const response = await fetch(baseURI+uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    });
    const data = (await response.json());
    return data;
}

export const update = async (uri, query, updatedData) => {
    const params = new URLSearchParams(query);
    // console.log('uri', baseURI+uri, 'new',updatedData._id , JSON.stringify(updatedData))
    if(updatedData){
        const response = await fetch(baseURI+uri+`/${updatedData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });
        const data = (await response.json());
        return data;
    }
}
