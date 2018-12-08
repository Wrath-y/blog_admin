export default function ({ store, route, redirect }) {
    if (!store.state.token && route !== '/') {
        return redirect('/');
    }
}