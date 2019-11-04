import route from './connect'

export default {
    // User
    login(body) {
        return route().post('api/auth/login', body)
    },
    register(body) {
        return route().post('api/auth/register', body)
    },


    // Payment
    getProviderList() {
        return route().get('/payment/providers')
    }
}