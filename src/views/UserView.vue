<template>
  <div>
    <h1>Bem vindo ao painel de adm</h1>
    <br />
    <div class="columns is-mobile is-centered">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ processRole(user.role) }}</td>
            <td>
              <button class="button is-success">Edit</button> .
              <button class="button is-danger" @click="callModal(user.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div :class="{ modal: true, 'is-active': showModal }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Deleting user</p>
            <button
              class="delete"
              aria-label="close"
              @click="hideModal()"
            ></button>
          </header>
          <section class="modal-card-body">
            Are you sure you want to delete this user?
          </section>
          <footer class="modal-card-foot">
            <button class="button is-danger">Delete</button>
            <button class="button" @click="hideModal()">Cancel</button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    var headerToken = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .get("http://localhost:8686/user", headerToken)
      .then((res) => {
        console.log(res);
        this.users = res.data;
        console.log(this.users);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      users: [],
      showModal: false,
    };
  },
  methods: {
    processRole(value) {
      if (value == 0) {
        return "Relugar user";
      }
      return "Admin";
    },
    hideModal() {
      this.showModal = false;
    },
    callModal(id) {
      console.log(id);
      this.showModal = true;
    },
  },
};
</script>

<style scoped>
</style>