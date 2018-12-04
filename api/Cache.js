export const handle = async (apiUrl, minutes = 1, params = null) => {
    const cacheTime = new Date().getTime() + minutes * 60 * 1000;
    const cacheKey = params || apiUrl;
    let store = null;
    if (minutes) {
        store = sessionStorage.getItem(cacheKey);
        console.log(store);
    }
    if (!store) {
        store = await axios.get(apiUrl, { params });
        sessionStorage.setItem(cacheKey, store, cacheTime);
    }
    return store;
};

/**
 * import {uploadToken} from 'api/Cache'
 * @returns {Promise<*>}
 * @constructor
 */
export const uploadToken = (drive) => handle('http://127.0.0.1:8080/uploads', 2, { drive });

/**
 * import {My} from 'api/Cache'
 * @returns {Promise.<void>}
 * @constructor
 */
export const my = async (commit = null, isCache = true) => {
    const store = await handle('my/profile', Number(isCache));
    commit ? commit('setMy', store) : vm.$store.commit('setMy', store);
    return store;
};
