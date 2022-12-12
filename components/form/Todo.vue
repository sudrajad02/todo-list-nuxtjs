<template>
    <div>
        <div class="form-group col-4">
            <input type="input" class="form-control form-control-user" placeholder="Todo Nama" v-model="todos.name">
            <!-- <p class="text-danger" v-if="errors.length > 0">{{ errors }}</p> -->
        </div>
        <div class="form-group col-4">
            <button @click="submit()" href="login.html" class="btn btn-primary btn-user btn-block">Save</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    data(){
        return {
            todos: {
                name: null
            }
        }
    },
    computed: {
        ...mapState('todo', {
            errors: state => state.errors
        })
    },
    methods: {
        ...mapActions('todo', ['storeTodosData']),
        submit() {
            this.storeTodosData(this.todos).then(() => this.$router.push({ name: 'todo' }))
        }
    }
}
</script>