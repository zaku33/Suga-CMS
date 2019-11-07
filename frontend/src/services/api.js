import route from './connect'

export default {
    // User
    login(body) {
        return route().post('api/auth/login', body)
    },
    register(body) {
        return route().post('api/auth/register', body)
    },


    // Symbol
    iconDashboard(){
        return route().get('system/main-icon')
    },


    // Payment
    getProviderList() {
        return route().get('/payment/providers')
    }
}