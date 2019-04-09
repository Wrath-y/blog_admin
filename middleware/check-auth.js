export default function ({ store, route, redirect }) {
    let token = store.state.token || window.sessionStorage.getItem("token");
    if (!token && route !== '/') {
        return redirect('/');
    }
}