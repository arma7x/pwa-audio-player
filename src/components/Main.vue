<template>
  <div class="row justify-content-sm-center align-items-center" style="height:90vh;">
    <div class="text-center">
      <h1>{{ msg }}</h1>
      <a href="/audio">Audio Player</a>
      <a href="/playlist">Video Player</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main',
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
