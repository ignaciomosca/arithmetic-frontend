<template>
  <div class="container">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'UserRegister',
  setup() {
    const username = ref<string>('');
    const password = ref<string>('');
    const router = useRouter();

    const register = async () => {
      try {
        const response = await axios.post('http://localhost:8000/register', {
          username: username.value,
          password: password.value
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data);
        router.push('/login');
      } catch (error) {
        console.error(error);
      }
    };

    return {
      username,
      password,
      register
    };
  }
});
</script>
