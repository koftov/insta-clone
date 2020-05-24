<template>
  <footer class="footer">
    <button @click="goto('/')">Home</button>
    <button @click="goto('/')">Global</button>
    <button @click="goto('newpost')">Post</button>
    <button>Notifications</button>
    <button>Profile</button>
  </footer>
</template>

<script>
export default {
  methods: {
    goto(path) {
      this.$router.push(path);
    },
  },
};
</script>
