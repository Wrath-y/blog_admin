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
		return response.data;
	})
}