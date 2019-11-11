<template>
  <div id="tomusic">
    <a class="tomusic" @click="nav('music.html')"></a>
  </div>
</template>

<script>

export default {
  name: "tomusic",
  data() {
    return {

    }
  },
  methods: {
    nav: function (url) {
      window.location.replace(url);
    }
  }
}
</script>

<style scoped>
#tomusic {
  position: relative;
  width: 100%;
  height: 100%;
}

.tomusic {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 100%;
  height: 100%;
  z-index: 2;
}
</style>
