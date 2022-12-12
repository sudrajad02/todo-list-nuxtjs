<template>
    <div class="container-fluid">
        <h1 class="h3 mb-4 text-gray-800">Create New Todo</h1>
         <div class="card shadow">
            <div class="card-body">
                <app-todo-form />
            </div>
         </div>
    </div>
</template>

<script>
import TodoForm from '@/components/form/Todo.vue' 

export default {
    components: {
        'app-todo-form': TodoForm
    },
}
</script>