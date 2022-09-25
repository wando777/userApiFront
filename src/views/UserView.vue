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
              <router-link :to="{name: 'UserEdit', params: {id: user.id}}"
                ><button class="button is-success">Edit</button></router-link
              >
              .
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
            <button class="button is-danger" @click="deleteUser()">
              Delete
            </button>
            <button class="button" @click="hideModal()">Cancel</button>
          </footer>
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
      .get("http://localhost:8686/user", headers)
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
      deleteUserId: -1,
    };
  },
  methods: {
    processRole(value) {
      if (value == 0) {
        return "Regular user";
      }
      return "Admin";
    },
    hideModal() {
      this.showModal = false;
    },
    callModal(id) {
      console.log(id);
      this.showModal = true;
      this.deleteUserId = id;
    },
    deleteUser() {
      axios
        .delete("http://localhost:8686/user/" + this.deleteUserId, headers)
        .then(
          console.log("User has been deleted"),
          (this.showModal = false),
          (this.users = this.users.filter(
            (user) => user.id != this.deleteUserId
          ))
        )
        .catch((err) => {
          console.log(err);
          this.showModal = false;
        });
    },
  },
};
</script>

<style scoped>
</style>