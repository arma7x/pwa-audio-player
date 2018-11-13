import Vue from 'vue';
import Router from 'vue-router';
// import Main from '@/components/Main';
import AudioPlayer from '@/components/Audio';
import NotFound404 from '@/components/NotFound404';

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //  path: '/',
    //  name: 'PWA Audio Player',
    //  component: Main,
    // },
    {
      path: '/',
      name: 'Audio Player',
      component: AudioPlayer,
    },
    // {
    //  path: '/video',
    //  name: 'Video Player',
    //  component: VideoPlayer,
    // },
    {
      path: '*',
      name: '404 - Not Found',
      component: NotFound404,
    },
  ],
  mode: 'history',
});
