<template>
  <button class="toIdxBtn" @click="nav('cards.html')">
    <img :src="toindexpic">
  </button>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import toindexpic from "../../static/img/toindex.png";

export default {
  name: "toindex",
  props: ["disable"],
  data() {
    return {
      toindexpic
    }
  },
  methods: {
    nav: function (url) {
      window.location.replace(url);
      this.$store.dispatch("aieggy/invokeSendOrder", [60, 1, 0, 0, 62]);
    }
  }
}
</script>

<style scoped>

img {
  display: block;
  width: 100%;
  height: 100%;
}

.toIdxBtn {
  display: inline-block;
  width: 0.39rem;
  height: 0.39rem;
}
</style>