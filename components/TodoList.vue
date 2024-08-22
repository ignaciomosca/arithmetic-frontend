<template>
  <div class="container">
    <h2>Todo List</h2>
    <form @submit.prevent="addTodo">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" class="form-control" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <input type="text" id="description" v-model="description" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Add Todo</button>
    </form>
    <ul class="list-group mt-4">
      <li v-for="todo in todos" :key="todo.id" class="list-group-item d-flex justify-content-between align-items-center">
        <span>
          <strong>{{ todo.title }}</strong>: {{ todo.description }}
        </span>
        <button @click="deleteTodo(todo.id)" class="btn btn-danger btn-sm">✖</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  description: string;
}

export default defineComponent({
  name: 'TodoList',
  setup() {
    const title = ref<string>('');
    const description = ref<string>('');
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
          title: title.value,
          description: description.value
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        todos.value.push(response.data);
        title.value = '';
        description.value = '';
      } catch (error) {
        console.error(error);
      }
    };

    const deleteTodo = async (todoId: number) => {
      try {
        await axios.delete(`http://localhost:8000/todos/${todoId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        todos.value = todos.value.filter(todo => todo.id !== todoId);
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(fetchTodos);

    return {
      title,
      description,
      todos,
      addTodo,
      deleteTodo
    };
  }
});
</script>
