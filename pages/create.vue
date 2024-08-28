<template>
  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Sign Up</h2>
    </div>
    <form @submit.prevent="createUser" class="mx-auto mt-16 max-w-xl sm:mt-20">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label for="username" class="block text-sm font-semibold leading-6 text-gray-900">Username:</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div class="sm:col-span-2">
          <label for="password" class="block text-sm font-semibold leading-6 text-gray-900">Password:</label>
          <input
            type="text"
            id="password"
            v-model="password"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div class="sm:col-span-2">
          <label for="confirmPassword" class="block text-sm font-semibold leading-6 text-gray-900">Confirm Password:</label>
          <input
            type="text"
            id="confirmPassword"
            v-model="confirmPassword"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="mt-10">
        <button :disabled="!passwordsMatch" type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Create User
        </button>
      </div>
    </form>
    <p class="mt-10 text-center text-sm text-gray-500">
      Already have an account?
      <a href="/" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign In</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useRuntimeConfig } from '#app';

interface Todo {
  username: string;
  password: string;
  confirmPassword: string;
}

export default defineComponent({
  name: 'CreateUser',
  setup() {
    const router = useRouter();
    const username = ref<string>('');
    const password = ref<string>('');
    const confirmPassword = ref<string>('');

    const config = useRuntimeConfig();

    const createUser = async () => {
      try {
        const response = await axios.post<Todo>(`${config.public.apiBaseUrl}/api/auth/`, {
          username: username.value,
          password: password.value
        });
        // Clear the form fields after submission
        username.value = '';
        password.value = '';
        router.push('/login');
      } catch (error) {
        console.error(error);
      }
    };

    const passwordsMatch = computed(() => password.value === confirmPassword.value);

    return {
      username,
      password,
      confirmPassword,
      createUser,
      passwordsMatch
    };
  }
});
</script>
