/* eslint-disable */
import Vue from 'vue';
export default class {
    constructor(data) {
        for (let error of this.errors()) {

            if (error.code !== data.code) {
                continue;
            }
            if (error.message) {
                $ele.$message.error(error.message);
                continue;
            }
            if (typeof error.method === 'function') {
                error.method();
            }
            break;
        }
    }

    errors() {
        return [
            {
                code: 40001,
                method: () => {
                    $ele.$message.error('请登录后操作');
                    if (Vue.$store) {
                        Vue.$store.commit('updateToken', null);
                    }
                    window.location.href = '/';
                }
            }
        ];
    }
}
