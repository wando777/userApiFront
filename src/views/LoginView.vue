<template>
  <div>
    <div>
      <h2>User login</h2>
      <hr />
      <div v-if="error != undefined">
        <div class="notification is-warning is-light">
          <p>{{ error }}</p>
        </div>
      </div>
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <label class="label">E-mail</label>
          <input
            type="email"
            placeholder="email@email.com"
            class="input"
            v-model="email"
          />
          <label class="label">Password</label>
          <input
            type="password"
            placeholder="*******"
            class="input"
            v-model="password"
          /><br /><br />
          <button class="button is-info" @click="login">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      password: "",
      email: "",
      error: undefined,
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:8686/login", {
          password: this.password,
          email: this.email,
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          this.$router.push({ name: "home" });
        })
        .catch((err) => {
          this.error = err.response.data.err;
          //console.log(err.response);
        });
    },
  },
};
</script>


<style>
</style>