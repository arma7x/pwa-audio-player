<template>
  <div class="text-center">
    <div id="player-panel" class="fixed-top" style="top:66px">
      <div>
        <h6 v-if="songlist.length > 0 && songlist[currentsequence] != undefined" class="microsoft marquee">
          <span>{{ songlist[currentsong].name }}</span>
        </h6>
        <h6 v-else class="microsoft marquee">
          <span>Please click 'Choose Files'</span>
        </h6>
      </div>
      <div class="row justify-content-center align-items-center">
        <div class="overlap-play-button">
          <img class="media-button" :src="require('../assets/music.png')"/>
        </div>
        <audio style="border-radius:0;left:-15px;width:320px;position:relative;" id="player" controls controlsList="nodownload"/>
      </div>
      <div>
        <div class="btn-group" style="border:0px;width:320px;" role="group">
          <button class="btn btn-sm btn-light" style="border:0px;width: 75px;background-color:#F1F3F4;border-bottom-left-radius:25px;border-top-left-radius:25px;" @click="toggleShuffle">
            <img class="media-button" v-bind:class="{ 'shuffle': !shuffle }" :src="require('../assets/shuffle.png')"/>
          </button>
          <button class="btn btn-sm btn-light" style="border:0px;width:75px;background-color:#F1F3F4;" @click="prevFile">
            <img class="media-button" :src="require('../assets/icons8-skip-to-start-96.png')"/>
          </button>
          <button class="btn btn-sm btn-light" style="border:0px;width:75px;background-color:#F1F3F4;" @click="togglePlay">
            <img class="media-button" :src="paused == true ? require('../assets/play.png') : require('../assets/pause.png')"/>
          </button>
          <button class="btn btn-sm btn-light" style="border:0px;width:75px;background-color:#F1F3F4;" @click="nextFile">
            <img class="media-button" :src="require('../assets/icons8-end-96.png')"/>
          </button>
          <button class="btn btn-sm btn-light" style="border:0px;width:75px;background-color:#F1F3F4;border-bottom-right-radius:25px;border-top-right-radius:25px;" @click="toggleRepeat">
            <img class="media-button" :src="repeat == 0 ? require('../assets/no-repeat.png')
          : (repeat == 1 
          ? require('../assets/repeat-all.png')
          : require('../assets/repeat-one.png'))"/>
          </button>
        </div>
      </div>
      <div>
        <b-form-group label="<code>Pick Mode</code>">
          <b-form-radio-group id="radio" v-model="accept" name="radioSubComponent">
            <b-form-radio value="audio/*">Audio Only</b-form-radio>
            <b-form-radio value="*">Mobile Friendly</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <div id="upload_button">
          <label>
            <input id="pick" style="width:113px;" ref="selected_files" type="file" :accept="accept" @change="processFiles" multiple/>
            <span class="btn btn-sm btn-secondary">Select Songs</span>
          </label>
        </div>
      </div>
    </div>
    <div id="playlist-panel" class="mt-2 col-sm-4 offset-sm-4 align-items-center fixed-top" style="margin:auto;width:320px;overflow-y:scroll;height:53%;top:280px;">
      <b-list-group>
        <b-list-group-item class="text-left" style="border:0;border-radius:0;" v-bind:class="{ 'playing shadow-header': (song.index == currentsong), 'notplay': (song.index != currentsong) }" v-for="song in songlist" :key="song.index" @click="jumpFile(song.index)">
          {{ song.name }}
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import bus from '../bus';

export default {
  name: 'audioplayer',
  data() {
    return {
      repeat: 0,
      accept: 'audio/*',
      paused: true,
      shuffle: false,
      currentsequence: -1,
      sequencelist: [],
      currentsong: -1,
      songlist: [],
      filelist: [],
      player: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      const appheight = document.getElementById('app').clientHeight;
      const playerpanelheight = document.getElementById('player-panel').clientHeight;
      // eslint-disable-next-line
      const playlistheight = parseInt(appheight) - (parseInt(playerpanelheight) + 66 + 30);
      document.getElementById('playlist-panel').style.height = `${playlistheight}px`;
      this.player = document.getElementById('player');
      this.player.controls = true;
      this.player.draggable = false;
      this.player.onplay = () => {
        this.paused = false;
      };
      this.player.onpause = () => {
        this.paused = true;
      };
      this.player.onended = () => {
        if (this.repeat === 2) {
          // repeat once
          this.player.play();
        } else {
          if (this.currentsequence < this.songlist.length) {
            // repeat off
            this.playFile(this.currentsequence + 1);
          }
          if ((this.songlist.length - this.currentsequence) === 1 && this.repeat === 1) {
            // repeat all
            this.currentsequence = -1;
            this.playFile(0);
          }
        }
      };
    });
  },
  methods: {
    processFiles() {
      if (this.$refs.selected_files.files.length > 0) {
        this.currentsequence = -1;
        this.sequencelist = [];
        this.currentsong = -1;
        this.songlist = [];
        this.filelist = [];
        let index = 0;
        // eslint-disable-next-line
        for (const fileIndex in this.$refs.selected_files.files) {
          if (isNaN(fileIndex) === false && this.$refs.selected_files.files[fileIndex].type.search('audio/*') > -1) {
            this.filelist = [...this.filelist, this.$refs.selected_files.files[fileIndex]];
            // eslint-disable-next-line
            this.songlist = [
              ...this.songlist,
              {
                name: this.$refs.selected_files.files[fileIndex].name,
                index,
              },
            ];
            this.sequencelist = [...this.sequencelist, index];
            // eslint-disable-next-line
            index++;
          }
        }
        bus.$emit('bus', {
          notification: {
            type: 'info',
            message: `Load ${this.sequencelist.length} songs`,
          },
          audio: true,
        });
        this.playFile(0);
        this.shuffling();
      }
    },
    toggleShuffle() {
      this.shuffle = !this.shuffle;
      if (this.shuffle) {
        bus.$emit('bus', { notification: {
          type: 'info',
          message: 'Shuffle On',
        } });
      } else {
        bus.$emit('bus', { notification: {
          type: 'info',
          message: 'Shuffle Off',
        } });
      }
      this.shuffling();
    },
    shuffling() {
      if (this.filelist.length > 0) {
        if (this.shuffle) {
          // eslint-disable-next-line
          for (let i = this.sequencelist.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.sequencelist[i], this.sequencelist[j]] =
            [this.sequencelist[j], this.sequencelist[i]];
          }
          const firstValue = this.sequencelist[0];
          const replaceOrder = this.sequencelist.indexOf(this.currentsong);
          const replaceValue = this.sequencelist[this.sequencelist.indexOf(this.currentsong)];
          this.sequencelist[0] = replaceValue;
          this.sequencelist[replaceOrder] = firstValue;
        } else {
          const firstValue = this.sequencelist[0];
          const replaceOrder = this.sequencelist.indexOf(0);
          const replaceValue = this.sequencelist[this.sequencelist.indexOf(0)];
          this.sequencelist[0] = replaceValue;
          this.sequencelist[replaceOrder] = firstValue;
          this.currentsequence = this.songlist[this.currentsong].index;
          this.sequencelist.sort((a, b) => a - b);
        }
      }
    },
    toggleRepeat() {
      if (this.repeat === 0) {
        this.repeat = 1;
        bus.$emit('bus', { notification: {
          type: 'info',
          message: 'Repeat All',
        } });
      } else if (this.repeat === 1) {
        this.repeat = 2;
        bus.$emit('bus', { notification: {
          type: 'info',
          message: 'Repeat Current Song',
        } });
      } else {
        this.repeat = 0;
        bus.$emit('bus', { notification: {
          type: 'info',
          message: 'Repeat Off',
        } });
      }
    },
    togglePlay() {
      if (this.filelist.length > 0) {
        if (this.player.paused === true) {
          this.player.play();
        } else {
          this.player.pause();
        }
      }
    },
    nextFile() {
      if (this.currentsequence !== -1) {
        this.playFile(this.currentsequence + 1);
      }
    },
    prevFile() {
      if (this.currentsequence !== -1) {
        this.playFile(this.currentsequence - 1);
      }
    },
    jumpFile(indexsong) {
      if (this.filelist.length > 0) {
        if (this.shuffle) {
          this.playFile(this.sequencelist.indexOf(indexsong));
        } else {
          this.playFile(indexsong);
        }
      }
      this.shuffling();
    },
    playFile(index) {
      if (this.sequencelist[index] !== undefined && this.currentsequence !== index) {
        // eslint-disable-next-line
        // console.dir(this.player);
        // eslint-disable-next-line
        // console.dir(index);
        // eslint-disable-next-line
        // console.dir(this.sequencelist[index]);
        // eslint-disable-next-line
        // console.dir(this.songlist[this.sequencelist[index]]);
        const freader = new FileReader();
        this.currentsequence = index;
        this.currentsong = this.songlist[this.sequencelist[index]].index;
        freader.onload = (e) => {
          this.player.src = e.target.result;
          this.player.play();
        };
        freader.readAsDataURL(this.filelist[this.songlist[this.sequencelist[index]].index]);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

#upload_button {
  display: inline-block;
}

#upload_button input[type=file] {
  display:none;
}

.overlap-play-button {
  z-index: 99999999;
  left: 30px;
  height: 30px;
  width: 30px;
  position: relative;
  background-color:#F1F3F4;
}

.playing {
  background-color: #EA67A3;
  color: #ffffff;
}

.notplay {
  background-color:#F1F3F4;
}

.media-button {
  width: 30px;
  height: 30px;
}

.shuffle {
  -webkit-filter: opacity(.2);
  filter: opacity(.2);
}

.marquee {
  width: 320px;
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
}

.marquee span {
  display: inline-block;
  padding-left: 100%;  /* show the marquee just outside the paragraph */
  animation: marquee 15s linear infinite;
}

/* Make it move */
@keyframes marquee {
  0%   { transform: translate(0, 0); }
  100% { transform: translate(-100%, 0); }
}
</style>
