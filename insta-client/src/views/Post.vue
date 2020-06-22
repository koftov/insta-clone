<template>
  <main class="view post">
    <section class="stream">
      <video
        ref="video"
        id="video"
        width="100%"
        height="300"
        autoplay
        :class="!captured ? 'show' : 'hide'"
      ></video>
      <div class="post-btns">
        <button class="capture-btn" @click="capture" v-if="!captured">
          Capture
        </button>
        <button class="cancel-btn" @click="cancel" v-if="captured">
          Cancel
        </button>
        <button class="upload-btn" @click="upload" v-if="captured">
          Upload
        </button>
      </div>
    </section>
    <section :class="captured ? 'show' : 'hide'">
      <canvas ref="canvas" id="canvas" width="100%" height="300"></canvas>
      <label for="desc">Description: </label>
      <input type="text" v-model="desc" />
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      video: {},
      canvas: {},
      constraints: {},
      cap: '',
      desc: '',
      captured: false,
    };
  },
  methods: {
    capture() {
      this.canvas
        .getContext('2d')
        .drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
      this.cap = this.canvas.toDataURL('image/png');
      this.captured = true;
    },
    cancel() {
      this.captured = false;
    },
    upload() {
      let api_url = this.$store.state.api_url;

      this.$http
        .post(api_url + 'post/newpost', {
          auth_token: localStorage.getItem('jwt'),
          image: this.cap,
          desc: this.desc,
        })
        .then((res) => {
          console.log(res);
        });
    },
  },
  mounted() {
    this.video = this.$refs.video;
    this.video.width = window.innerWidth;
    this.video.height = window.innerHeight - 80;
    this.constraints = { width: window.innerWidth, height: window.innerWidth };

    if (this.$refs.canvas) {
      this.canvas = this.$refs.canvas;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerWidth;
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: this.constraints,
        })
        .then((stream) => {
          this.video.srcObject = stream;
          this.video.play();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style lang="css">
.show {
  display: block;
}

.hide {
  display: none;
}
.post-btns {
  position: absolute;
  left: 50%;
  bottom: 65px;
  transform: translateX(-50%);
}
.image {
  width: 100%;
  height: auto;
}
</style>
