<template>
  <main class="view feed">
    <article class="post" v-for="post in feed" :key="post.id">
      <header class="user-title">{{ post.display_name }}</header>
      <section class="post-picture">
        <img :src="post.image" :alt="post.desc" class="post-image" />
      </section>
      <footer class="post-desc">
        <p>
          <strong>{{ post.display_name }}:</strong> {{ post.desc }}
        </p>
        <p>
          {{ timestampToDate(post.timestamp) }}
        </p>
      </footer>
    </article>
    <button @click="logout">Logout</button>
  </main>
</template>

<script>
export default {
  computed: {
    feed() {
      return this.$store.state.feed;
    },
  },
  methods: {
    logout() {
      this.$store.commit('logout');
    },
    timestampToDate(timestamp) {
      let d = new Date(timestamp);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      if (month < 10) month = '0' + month;
      let day = d.getDay();
      if (month < 10) day = '0' + day;
      return day + '/' + month + '/' + year;
    },
  },
};
</script>
