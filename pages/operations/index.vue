<template>
  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Perform Operation</h2>
    </div>
    <form @submit.prevent="addTodo" class="mx-auto mt-16 max-w-xl sm:mt-20">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div v-if="!isRandomOperation" class="sm:col-span-2">
          <label for="term1" class="block text-sm font-semibold leading-6 text-gray-900">Term 1:</label>
          <input
            type="text"
            id="term1"
            v-model="term1"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div class="sm:col-span-2">
          <label for="type" class="block text-sm font-medium text-gray-900">Choose an operation</label>
          <select
            id="type"
            v-model="type"
            name="type"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option disabled value="">Select an operation</option>
            <option v-for="op in operations" :key="op.id" :value="op.name">
              {{ op.symbol }}
            </option>
          </select>
        </div>
        <div v-if="!isRandomOperation && !isSquareRootOperation" class="sm:col-span-2">
          <label for="term2" class="block text-sm font-semibold leading-6 text-gray-900">Term 2:</label>
          <input
            type="text"
            id="term2"
            v-model="term2"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="mt-10">
        <button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Perform Operation
        </button>
      </div>
      <div v-if="!isResultEmpty" class="sm:col-span-2">
          <label for="result" class="block text-sm font-semibold leading-6 text-gray-900">Result:</label>
          <input
            type="text"
            id="result"
            v-model="result"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
    </form>
    <p class="mt-10 text-center text-sm text-gray-500">
      Check previous operations
      <a href="/records" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">here</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRuntimeConfig } from '#app';


interface Todo {
  first_term?: string | null;
  second_term?: string | null;
  type: string;
}

export default defineComponent({
  name: 'TodoList',
  setup() {
    const term1 = ref<string | null>(null);
    const term2 = ref<string | null>(null);
    const type = ref<string>('');
    const result = ref<string>('');
    const operations = ref([
      { name: "addition", symbol: "➕", id: 1 },
      { name: "subtraction", symbol: "➖", id: 2 },
      { name: "multiplication", symbol: "✖️", id: 3 },
      { name: "division", symbol: "➗", id: 4 },
      { name: "squareRoot", symbol: "√", id: 5 },
      { name: "randomString", symbol: "🎲", id: 6 },
    ]);

    const config = useRuntimeConfig();

    const isRandomOperation = computed(() => type.value === 'randomString');
    const isSquareRootOperation = computed(() => type.value === 'squareRoot');
    const isResultEmpty = computed(() => result.value === '');

    const addTodo = async () => {
      try {
        const payload: Partial<Todo> = {
          type: type.value,
        };

        if (!isRandomOperation.value) {
          payload.first_term = term1.value;
        }
        if (!isRandomOperation.value && !isSquareRootOperation.value) {
          payload.second_term = term2.value;
        }
        result.value = '';
        const response = await axios.post<string>(`${config.public.apiBaseUrl}/api/operation/`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        // Clear the form fields after submission
        term1.value = '';
        term2.value = '';
        type.value = '';
        result.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    return {
      term1,
      term2,
      result,
      type,
      operations,
      addTodo,
      isRandomOperation,
      isSquareRootOperation,
      isResultEmpty
    };
  }
});
</script>
