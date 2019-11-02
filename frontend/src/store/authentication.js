export default {
    namespaced: true,
    state: {
        registerEmail: null,
        registerPassword: null,
    },
    mutaions: {
        setRegisterEmail(state, email) {
            state.registerEmail = email
        },
        setRegisterPassword(state, password) {
            state.registerPassword = password
        }
    },
}