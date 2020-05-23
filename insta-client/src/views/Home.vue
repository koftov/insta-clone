<template>
  <div class="home">
    Hello World!
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('jwt');
      this.$router.push('/login');
    },
  },
};
</script>
