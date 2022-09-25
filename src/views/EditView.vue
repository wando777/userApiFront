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
          /><br /><br />
          <button class="button is-info" @click="updateUser">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import headers from "./header";
export default {
  created() {
    axios
      .get("http://localhost:8686/user/" + this.$route.params.id, headers)
      .then((res) => {
        console.log(res);
        this.name = res.data.name;
        this.email = res.data.email;
        this.id = res.data.id;
        this.role = res.data.role;
      })
      .catch((err) => {
        console.log(err.response);
        this.$router.push({ name: "users" });
      });
  },
  data() {
    return {
      id: -1,
      name: "",
      email: "",
      error: undefined,
    };
  },
  methods: {
    updateUser() {
      axios
        .put(
          "http://localhost:8686/user",
          {
            name: this.name,
            email: this.email,
            id: this.id,
            role: this.role,
          },
          headers
        )
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "home" });
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