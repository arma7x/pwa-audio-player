<template>
  <div id="app">
    <b-navbar class="shadow-header" style="height:56px;"type="light" variant="secondary" :sticky="true">
      <!-- <b-navbar-brand> -->
        <span class="col-sm-4 offset-sm-4">
          <a class="float-left font-weight-bold text-white" v-on:click="$router.currentRoute.name != main ? goBack() : null" style="text-decoration:none;font-size:1.25em;">
            <img v-show="$router.currentRoute.name != main" :src='icon' width="20px" height="20px" style="margin: 0px 10px 0 0;"/> 
            {{ $router.currentRoute.name }}
          </a>
          <a class="float-right font-weight-bold text-white" href="https://github.com/arma7x/pwa-audio-player" style="text-decoration:none;" target="_blank" rel="noopener">
            <svg style="width:30px;height:30px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 499.36" focusable="false">
              <title>GitHub</title>
              <path d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z" fill="currentColor" fill-rule="evenodd"></path>
            </svg>
          </a>
        </span>
      <!-- </b-navbar-brand> -->
    </b-navbar>
    <div class="container" style="min-height:89vh;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vue from 'vue';
import Toasted from 'vue-toasted';
import router from './router';
import bus from './bus';

Vue.use(Toasted);
// const bus = new Vue();

export default {
  name: 'app',
  data() {
    return {
      main: router.options.routes[0].name,
      audio: false,
      video: false,
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gsFBgw0XtoWAQAAAb9JREFUeNrt3cENgzAABEGO/ntOPvnQAHK04xK8I7CNJa4rPD6/UZ6DleM/JmIbANH4ZQQTv41g4rcRTPw2gonfRjDx2wgmfhvBxG8jmPhtBBO/jWDiewKIbw0gvl2A+M4BxG/F/2sA4ocBiB8GIH4YgPhhAOKHAYgfBiB+GID4YQDihwGIHwYgfhiA+GEA4ocBiB8GIH4YgPhhAOKHAYgfBiB+GID4YQDihwGIHwYgfhiA+GEA4ocBiB8GIH4YgPhhAOKHAYgfBiB+GID4YQDihwGIHwYgfhiA+GEA4ocBiB8GIH4YQP2femkA4ocBiB8GIH4YgPhhAOKHAYgfBiB+e9ymwCvAK8AiEALbQAgAgAAACACAAAAIAHgLgQshhwOAAAAIAIAAAAgAgAAACACAAAAIAIAAAAgAgAAACACAAAAIAIAAAAgAgAAACACAAAAIAIAAAAgAgAAACACAAAAIAIAAAAgAgAAACACAAAAIAIAAAAgAgAAACACAAAAIAIAAAAgAgAAACACAAAAIADgFgSdAGIE1QBiBXUAYgXOAMAIngWEEvgWEEfgaGEbgPkAYgRtBYQSuiEcR1P+N+AVpKwRSoxRD+AAAAABJRU5ErkJggg==',
    };
  },
  created() {
    bus.$on('bus', (state) => {
      if (state.notification !== undefined) {
        this.$toasted.show(`<span class="font-weight-normal">${state.notification.message}<span>`, {
          theme: 'primary',
          position: 'top-right',
          duration: 5000,
          className: `bg-${state.notification.type} text-white`,
        });
      }
      if (state.audio !== undefined) {
        this.audio = state.audio;
      }
      if (state.video !== undefined) {
        this.video = state.video;
      }
    });
  },
  methods: {
    goBack() {
      if (this.audio === true || this.video === true) {
        // eslint-disable-next-line
        if (confirm(`Are you sure to stop playing the ${this.audio ? 'song' : 'video'} ?`)) {
          this.audio = false;
          this.video = false;
          this.$router.back();
        }
      } else {
        this.$router.back();
      }
    },
  },
};
</script>

<style>

body {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.shadow-header {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  z-index: 99999999;
}
</style>
