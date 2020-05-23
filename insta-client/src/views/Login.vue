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
            localStorage.setItem('jwt', res.data.token);
            this.$router.push('/');
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
<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-flow: column;
  height: 100vh;
  box-sizing: border-box;

  header {
    padding: 15px 25px;
    h3 {
      color: #171717;
      font-size: 28px;
      text-align: center;
      font-weight: 900;
      margin: 0;
      span {
        font-weight: 300;
      }
    }

    h4 {
      color: #888;
      font-size: 24px;
      text-align: center;
      font-weight: 300;
      padding: 0;
      margin: 0;
    }
  }

  footer {
    width: calc(100% - 50px);
    height: 20px;
    background-color: #eee;
    box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.2);
    padding: 15px 25px;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      color: #888;
      font-size: 16px;
      line-height: 40px;
      margin: 0px;
      padding: 0x;
      text-align: center;
    }

    .link {
      color: #e35205;
      text-decoration: none;
      font-weight: 700;
    }
  }
}
</style>
