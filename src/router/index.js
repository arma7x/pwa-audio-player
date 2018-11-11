import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import AudioPlayer from '@/components/Audio';
import VideoPlayer from '@/components/Video';
import NotFound404 from '@/components/NotFound404';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PWA Media Player',
      component: Main,
    },
    {
      path: '/audio',
      name: 'Audio Player',
      component: AudioPlayer,
    },
    {
      path: '/video',
      name: 'Video Player',
      component: VideoPlayer,
    },
    {
      path: '*',
      name: '404 - Not Found',
      component: NotFound404,
    },
  ],
  mode: 'history',
});
