<template>
  <div class="home">
    <img alt="home logo" src="../assets/crud.png">
    <HelloWorld msg="Welcome to my first Vue.js App in order to call my rest APIs using knex & express"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
