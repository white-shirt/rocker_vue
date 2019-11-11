<template>
  <div id="tolines">
    <a class="tolines" @click="nav('lines.html')"></a>
  </div>
</template>

<script>

export default {
  name: "tolines",
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
#tolines {
  position: relative;
  width: 100%;
  height: 100%;
}

.tolines {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 100%;
  height: 100%;
  z-index: 2;
}
</style>