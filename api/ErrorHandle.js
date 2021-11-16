/* eslint-disable */
import Vue from 'vue';
export default class {
	constructor(data) {
        this.error = data;
        $ele.$message.error(data.message);
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
            // {
            //     code: 2013,
            //     method: () => {
            //         $ele.$msgbox.confirm('请登录后操作', '').then(
            //             action => {
            //                 Vue.$router.push({
            //                     name: '/'
            //                 });
            //             },
            //             action => {}
            //         );
            //         if (Vue.$store) {
            //             Vue.$store.commit('updateToken', null);
            //         }
            //     }
            // }
		];
	}
}
