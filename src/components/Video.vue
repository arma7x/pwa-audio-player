<template>
  <div class="text-center">
    <div id="player-panel" class="fixed-top" style="top:66px">
      <div class="row justify-content-center align-items-center">
        <video id="player" width="320px" height="180px" controls controlsList="nodownload" crossorigin="anonymous">
          <track id="caption" label="Subtitle" kind="subtitles" crossorigin="anonymous">
        </video>
      </div>
      <div>
        <b-form-group label="<code>Pick Mode</code>">
          <b-form-radio-group id="radio" v-model="accept" name="radioSubComponent">
            <b-form-radio value="video/*">Video Only</b-form-radio>
            <b-form-radio value="*">Mobile Friendly</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <input style="width:105px;" ref="selected_video" type="file" :accept="accept" @change="pickVideo"/>
        <input style="width:105px;" ref="selected_sub" type="file" :accept="accept" @change="pickSub"/>
      </div>
    </div>
  </div>
</template>

<script>
import VTTConverter from 'srt-webvtt';
import bus from '../bus';

export default {
  name: 'videoplayer',
  data() {
    return {
      accept: 'video/*',
      player: null,
      caption: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.player = document.getElementById('player');
      this.caption = document.getElementById('caption');
      this.player.controls = true;
      this.player.draggable = false;
    });
  },
  methods: {
    pickSub() {
      if (this.$refs.selected_sub.files.length > 0) {
        this.renderSub(this.$refs.selected_sub.files[0]);
      }
    },
    renderSub(file) {
      const vttConverter = new VTTConverter(file);
      vttConverter.getURL().then((url) => {
        this.caption.src = url;
        this.player.textTracks[0].mode = 'showing';
      }).catch((err) => {
        // eslint-disable-next-line
        console.error(err);
      });
    },
    pickVideo() {
      if (this.$refs.selected_video.files.length > 0) {
        if (this.$refs.selected_video.files[0].type.search('video/*') > -1) {
          this.playVideo(this.$refs.selected_video.files[0]);
          bus.$emit('bus', {
            notification: {
              type: 'info',
              message: `Play ${this.$refs.selected_video.files[0].name}`,
            },
            video: true,
          });
        }
      }
    },
    playVideo(file) {
      const freader = new FileReader();
      freader.onload = (e) => {
        this.player.src = e.target.result;
        this.player.play();
      };
      freader.readAsDataURL(file);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
