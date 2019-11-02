import route from './connect'

export default {
    login(body) {
        return route().post('api/auth/login', body)
    },
    register(body) {
        return route().post('api/auth/register', body)
    }
}