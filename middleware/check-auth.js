export default function ({ store, route, redirect }) {
    if (!store.state.token && route !== '/login') {
        return redirect('/login');
    }
}