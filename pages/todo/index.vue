<template>
    <div class="container-fluid">
        <h1 class="h3 mb-4 text-gray-800">Todo</h1>
        <div class="card shadow">
            <div class="card-body">
                <div class="mb-4">
                    <nuxt-link class="btn btn-success" :to="{ name: 'todo-add' }">Create New Todo List</nuxt-link>
                </div> 
                <b-table striped hover :items="todos.data" :fields="fields" show-empty>
                    <!-- <template v-slot:cell(name)="row">
                        <p>{{ row.item.todo_name }}</p>
                    </template> -->
                    <template v-slot:cell(action)="row">
                        <button class="btn btn-warning btn-sm" @click="openEditModal(row)">Edit</button>
                        <button class="btn btn-danger btn-sm" @click="openDeleteModal(row)">Delete</button>
                    </template>
                </b-table>

                <b-modal v-model="editModal" title="Update Data Todo">
                    <template>
                        <div>
                            <div class="form-group">
                                <input type="input" class="form-control form-control-user" placeholder="Todo Nama" v-model="sendData.name">
                            </div>
                        </div>
                    </template>
                    <template v-slot:modal-footer>
                        <div class="w-100 float-right">
                            <b-button
                                variant="secondary"
                                size="sm"
                                class="mr-2"
                            >
                                Close
                            </b-button>
                            <b-button
                                variant="primary"
                                size="sm"
                                @click="editDataTodo"
                            >
                                Update
                            </b-button>
                        </div>
                    </template>
                </b-modal>

                <b-modal v-model="deleteModal" title="Hapus Data Todo">
                    <p>Kamu yakin ingin menghapus data: <code>{{ data_selected ? data_selected.todo_name:'' }}</code>?</p>
                    <template v-slot:modal-footer>
                        <div class="w-100 float-right">
                            <b-button
                                variant="secondary"
                                size="sm"
                                class="mr-2"
                            >
                                Close
                            </b-button>
                            <b-button
                                variant="primary"
                                size="sm"
                                @click="deleteDataTodo"
                            >
                                Delete
                            </b-button>
                        </div>
                    </template>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    async asyncData({ store }) {
        await Promise.all([
            store.dispatch('todo/getTodosData')
        ])
        return
    },
    data(){
        return {
            fields: ['todo_name', 'createdeAt', 'action'],
            items: [],
            sendData: {
                name: null
            },
            editModal: false,
            deleteModal: false,
            data_selected: null
        }
    },
    computed: {
        ...mapState('todo', {
            todos: state => state.todos
        }),
    },
    methods: {
        ...mapActions('todo', ['getTodosData', 'deleteTodosData', 'editTodosData']),
        openEditModal(row) {
            this.data_selected = row.item
            this.sendData.name = row.item.todo_name
            this.editModal = true
        },
        editDataTodo() {
            this.editTodosData({ todo_id: this.data_selected.todo_id, name: this.sendData.name }).then(() => {
                this.editModal = false
                this.data_selected = null
                this.sendData.name = null
            })
        },
        openDeleteModal(row) {
            this.data_selected = row.item
            this.deleteModal = true
        },
        deleteDataTodo() {
            this.deleteTodosData(this.data_selected.todo_id).then(() => {
                this.deleteModal = false
                this.data_selected = null
            })
        }
    }
}
</script>