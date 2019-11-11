<template>
  <button class="tohelp">
    <img :src="tohelppic">
  </button>
</template>

<script>
import tohelppic from "../../static/img/help.png";

export default {
  name: "tohelp",
  data() {
    return {
      tohelppic
    }
  },
  components: {  }
}
</script>

<style scoped>
img {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.tohelp {
  display: inline-block;
  width: 0.39rem;
  height: 0.39rem;
}
</style>
