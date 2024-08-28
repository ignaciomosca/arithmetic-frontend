<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
    </div>
    <form class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6" @submit.prevent="login">
      <div class="form-group">
        <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username:</label>
        <input type="text" id="username" v-model="username"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <div class="form-group">
        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password:</label>
        <input type="password" id="password" v-model="password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
    </form>
    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a href="/create" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up!</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'UserLogin',
  setup() {
    const username = ref<string>('');
    const password = ref<string>('');
    const router = useRouter();
    const config = useRuntimeConfig();


    const login = async () => {
      try {
        const response = await axios.post(`${config.public.apiBaseUrl}/api/auth/token`, {
            username: username.value,
            password: password.value
          });
        localStorage.setItem('token', response.data.access_token);
        router.push('/operations');
      } catch (error) {
        console.error(error);
      }
    };

    return {
      username,
      password,
      login
    };
  }
});
</script>
