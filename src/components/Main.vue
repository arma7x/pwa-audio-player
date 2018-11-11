<template>
  <div class="row justify-content-sm-center align-items-center" style="height:89vh;">
    <div class="text-center">
      <h1>{{ msg }}</h1>
      <router-link to="/audio">Audio Player</router-link>
      <router-link to="/video">Video Player</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      msg: 'Welcome to PWA Media Player',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
