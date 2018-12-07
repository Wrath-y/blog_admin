export const handle = async (apiUrl, minutes = 1, params = null) => {
    const cacheTime = new Date().getTime() + minutes * 60 * 1000;
    const cacheKey = params || apiUrl;
    let store = null;
    if (minutes) {
        store = JSON.parse(sessionStorage.getItem(cacheKey));
    }
    if (!store) {
        await axios.get(apiUrl, { params }).then((res) => {
            store = res.data.Data;
            sessionStorage.setItem(cacheKey, JSON.stringify(store), cacheTime);
        });
    }
    return store;
};

/**
 * import {uploadToken} from 'api/Cache'
 * @returns {Promise<*>}
 * @constructor
 */
export const uploadToken = (drive) => handle('http://127.0.0.1:8080/uploads', 2);
