<template>
  <div id="torocker">
    <a class="torocker" @click="nav('rocker.html')"></a>
  </div>
</template>

<script>

export default {
  name: "torocker",
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
#torocker {
  position: relative;
  width: 100%;
  height: 100%;
}

.torocker {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 100%;
  height: 100%;
  z-index: 2;
}
</style>
