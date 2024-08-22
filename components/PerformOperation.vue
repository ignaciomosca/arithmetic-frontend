<template>
  <div class="container">
    <h2>Todo List</h2>
    <form @submit.prevent="addTodo">
      <div class="form-group">
        <label for="title">Term 1:</label>
        <input type="text" id="term1" v-model="term1" class="form-control" />
      </div>
      <div class="form-group">
        <label for="operation">Operation:</label>
        <input type="text" id="operation" v-model="operation" class="form-control" />
      </div>
      <div class="form-group">
        <label for="title">Term 2:</label>
        <input type="text" id="term2" v-model="term2" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Perform Operation</button>
    </form>
    <ul class="list-group mt-4">
      <li v-for="todo in todos" :key="todo.id" class="list-group-item d-flex justify-content-between align-items-center">
        <span>
          <strong>{{ todo.title }}</strong>: {{ todo.description }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

interface Todo {
  id: number;
  term1: string;
  term2: string;
  description: string;
}

export default defineComponent({
  name: 'TodoList',
  setup() {
    const term1 = ref<string>('');
    const term2 = ref<string>('');
    const operation = ref<string>('');
    const todos = ref<Todo[]>([]);

    const fetchTodos = async () => {
      try {
        const response = await axios.get<Todo[]>('http://localhost:8000/todos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        todos.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const addTodo = async () => {
      try {
        const response = await axios.post<Todo>('http://localhost:8000/todos', {
          term1: term1.value,
          term2: term2.value,
          operation: operation.value
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        term1.value = '';
        term2.value = '';
        operation.value = '';
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(fetchTodos);
    return {
      term1,
      term2,
      operation,
      addTodo
    };
  }
});
</script>
