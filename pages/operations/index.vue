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

    const addTodo = async () => {
      try {
        const response = await axios.post<Todo>('http://localhost:8000/api/operation/', {
          first_term: term1.value,
          second_term: term2.value,
          type: operation.value
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

    return {
      term1,
      term2,
      operation,
      addTodo
    };
  }
});
</script>
