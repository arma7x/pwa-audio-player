<template>
  <div id="app">
    <b-navbar class="shadow" type="light" variant="secondary" :sticky="true" style="z-index:99999999">
      <b-navbar-brand>
        <span>
          <a class="font-weight-bold" v-on:click="$router.currentRoute.name != main ? goBack() : null" style="color:#ffffff;text-decoration: none;">
            <img v-show="$router.currentRoute.name != main" :src='icon' width="20px" height="20px" style="margin: -5px 10px 0 0;"/> 
            {{ $router.currentRoute.name }}
          </a>
        </span>
      </b-navbar-brand>
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
</style>
