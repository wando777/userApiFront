<template>
  <div>
    <div>
      <h2>Registro de usuário</h2>
      <hr />
      <div v-if="error != undefined">
        <div class="notification is-warning is-light">
          <p>{{ error }}</p>
        </div>
      </div>
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <label class="label">Name</label>
          <input
            type="text"
            placeholder="User name"
            class="input"
            v-model="name"
          />
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
          <button class="button is-info" @click="getRegister">Sign up</button>
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
      name: "",
      password: "",
      email: "",
      error: undefined,
    };
  },
  methods: {
    getRegister() {
      axios
        .post("http://localhost:8686/user", {
          name: this.name,
          password: this.password,
          email: this.email,
        })
        .then((res) => {
          console.log(res);
          this.$router.push({ name: 'home' });
        })
        .catch((err) => {
          this.error = err.response.data.err;
          //console.log(err.response);
        });
      //console.log(this.name);
    },
  },
};
</script>


<style>
</style>