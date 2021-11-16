/* eslint-disable */
import ErrorHandle from '~/api/ErrorHandle';

export default function ({ $axios, redirect, store }) {
	$axios.onRequest(config => {
		if (store.state.token) {
			config.headers.common['Authorization'] = store.state.token;
		} else {
			let token = window.sessionStorage.getItem("token");
			config.headers.common['Authorization'] = token;
		}
	})
	$axios.onResponse(response => {
		if (!response.data.code) {
			return response.data;
		}
		if (response.data.code) {
			new ErrorHandle(response.data);
			return Promise.reject(response.data);
		}
		if (response.data.msg) {
			return Promise.reject(response.data);
		}
	})

	$axios.onError(error => {
		if (error.response && error.response.status > 200) {
			return httpErrorHandle({ error, redirect });
		}
		return Promise.reject(error);
	})
}