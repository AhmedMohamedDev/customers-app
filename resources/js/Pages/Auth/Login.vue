<template>
    <div class="d-flex justify-content-center align-items-center h-100">
      <form class="p-5 bg-light w-50" @submit.prevent="submitLogin">
        <h2 class="text-center mb-4">Login</h2>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" class="form-control" v-model="password">
        </div>
        <div v-for="(error,index) in errors" :key="index" class="alert alert-danger mt-3">
          {{ error }}
        </div>
        <button type="submit" class="btn btn-primary btn-block mt-3">Submit</button>
      </form>
    </div>
  </template>
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        errors: {},
      };
    },
    methods: {
      async submitLogin() {
        try {
            this.errors = {};
          const response = await axios.post('/api/login', {
            email: this.email,
            password: this.password,
          });
  
          if (response.data.status === 'success') {
            this.$store.dispatch('login', {
              user: response.data.user,
              authorization: response.data.authorisation,
            });

            window.location.href = '/dashboard';
          }
        } catch (error) {
          this.errors = error.response.data.errors;
        }
      },
    },
  };
  </script>