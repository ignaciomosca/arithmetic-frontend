<template>
  <div class="container">
    <h2 class="text-3xl font-bold underline">Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
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

    const login = async () => {
      try {
        const params = new URLSearchParams();
        params.append('username', username.value);
        params.append('password', password.value);

        const response = await axios.post('http://localhost:8000/api/auth/token', {
            username: username.value,
            password: password.value
          });
        console.log(response.data);
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
