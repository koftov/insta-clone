<template>
  <div class="register-page">
    <header>
      <h3>INSTA<span>CLONE</span></h3>
      <h4>Register</h4>
    </header>
    <main class="form-group">
      <input type="text" v-model="forename" placeholder="Forename" />
      <input type="text" v-model="surname" placeholder="Surname" />
      <input
        type="text"
        v-model="email"
        placeholder="Email"
        :class="hasErrors ? 'err' : ''"
      />
      <input type="password" v-model="password" placeholder="Password" />
      <button class="login-btn" @click="register">Register</button>
      <div class="error_msg" v-if="hasErrors">
        {{ error }}
      </div>
    </main>
    <footer>
      <p>
        Alredy Registered?
        <router-link class="link" to="/login">Sign in</router-link>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      forename: '',
      surname: '',
      email: '',
      password: '',
      hasErrors: false,
      error: '',
    };
  },
  methods: {
    register() {
      let api_url = this.$store.state.api_url;
      if (
        this.email === '' ||
        this.password === '' ||
        this.forename === '' ||
        this.surname === ''
      )
        return alert('Please fill in all fields');

      this.$http
        .post(`${api_url}/user/register`, {
          forename: this.forename,
          surname: this.surname,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res.data.auth) {
            localStorage.setItem('jwt', res.data.token);
            this.$router.push('/');
          } else {
            this.error = res.data.msg;
            this.hasErrors = true;
          }
        })
        .catch((err) => {
          this.error = err;
          this.hasErrors = true;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.register-page {
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
