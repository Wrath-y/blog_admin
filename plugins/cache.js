/* ============
 * store.js
 * ============
 *
 * https://github.com/marcuswestin/store.js
 */
const StoreEngine = require('store/src/store-engine');
/**
 * SessionStore.get('key')
 * SessionStore.set('key', 'value')
 * SessionStore.set('key', 'value', new Date().getTime()+ 2 * 60 * 1000)
 */
window.SessionStore = StoreEngine.createStore([
    require('store/storages/sessionStorage'),
], [
    require('store/plugins/expire'),
]);
window.axios = require('axios');
