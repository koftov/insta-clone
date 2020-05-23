<template>
  <div class="login-page">
    <header>
      <h3>INSTA<span>CLONE</span></h3>
      <h4>Login</h4>
    </header>
    <main class="form-group">
      <input
        type="text"
        v-model="email"
        placeholder="Email"
        :class="emailError ? 'err' : ''"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        :class="passError ? 'err' : ''"
      />
      <button class="login-btn" @click="login">Login</button>
      <div class="error_msg" v-if="hasErrors">
        {{ error }}
      </div>
    </main>
    <footer>
      <p>
        Don't have an account?
        <router-link class="link" to="/register">Sign up</router-link>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      hasErrors: false,
      emailError: false,
      passError: false,
      error: '',
    };
  },
  methods: {
    login() {
      let api_url = this.$store.state.api_url;
      if (this.email === '' || this.password === '')
        return alert('Please fill in all fields');

      this.$http
        .post(`${api_url}/user/login`, {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res.data.auth) {
            this.$store.commit('login', res.data.token);
          } else {
            console.log(res.data);
            if (res.data.emailError) {
              this.emailError = true;
            }
            if (res.data.passError) {
              this.passError = true;
            }
            this.hasErrors = true;
            this.error = res.data.msg;
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style lang="scss" scoped></style>
