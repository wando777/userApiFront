import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/RegisterView'
import Login from '../views/LoginView'
import axios from 'axios'
import UserView from '../views/UserView'
import EditView from '../views/EditView'

function AdminAuth(to, from, next) {
  if (localStorage.getItem('token') != undefined) {
    var headerToken = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }
    //console.log(headerToken);
    axios.post("http://localhost:8686/validate", {}, headerToken).then(res => {
      console.log(res);
      //console.log("antenticou");
      next();
    }).catch(err => {
      console.log(err);
      next("/login");
    });
  } else {
    next("/login")
  }
}


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin/users',
    name: 'users',
    component: UserView,
    beforeEnter: AdminAuth
  },
  {
    path: '/admin/users/edit/:id',
    name: 'UserEdit',
    component: EditView,
    beforeEnter: AdminAuth
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
