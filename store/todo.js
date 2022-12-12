export const state = () => ({
    todos: [],
    errors: []
})

export const mutations = {
    SET_TODO_DATA(state, payload) {
        state.todos = payload
    },
    SET_ERRORS(state, payload) {
        state.errors = payload
    }
}

export const actions = {
    getTodosData({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/api/todo').then((response) => {
                commit('SET_TODO_DATA', response.data)
                resolve()
            }).catch((err => {
                console.log(err);
                reject()
            }))
        })
    },
    storeTodosData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/todo', payload).then((response) => {
                dispatch('getTodosData')
                resolve()
            }).catch((err => {
                console.log(err);
                commit('SET_ERRORS', err)
                reject()
            }))
        })
    },
    editTodosData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.put(`/api/todo/${payload.todo_id}`, payload).then((response) => {
                dispatch('getTodosData')
                resolve()
            }).catch((err => {
                console.log(err);
                commit('SET_ERRORS', err)
                reject()
            }))
        })
    },
    deleteTodosData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/api/todo/${payload}`).then((response) => {
                dispatch('getTodosData')
                resolve()
            }).catch((err => {
                console.log(err);
                commit('SET_ERRORS', err)
                reject()
            }))
        })
    },
}