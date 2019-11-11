<template>
  <div id="idxBle" :style="{background: 'url(' + cardbg + ') no-repeat', backgroundSize: 'cover'}">
    <div class="searchbox">
      <div :class="['figurebox', timeoutMove ? 'timeoutfigureboxmove' : '']">
        <img class="figurebg" :src="figurebg">
        <img class="bleBtn" @click="search" :src="bleBtn">
      </div>
      <div class="eggbg"><img :src="eggbg"></div>
    </div>
  </div>
</template>

<script>
import bleBtn from "../../../static/img/index/search.png";
import eggbg from "../../../static/img/index/egg_bg.png";
import figurebg from "../../../static/img/index/figure_bg.png";
import cardbg from "../../../static/img/cardbg.png";

export default {
  name: "idxBle",
  data() {
    return {
      bleBtn,
      eggbg,
      figurebg,
      cardbg,
      devices: [],
      timeoutMove: false
    }
  },
  components: { },
  methods: {
    init: function () {
      var _this = this;
      setTimeout(function () {
        _this.timeoutMove = true;
      }, 100)
    },
    search: function () {
      window.location.replace('ble.html');
    },
  },
  mounted: function () {
    this.init();
  },
  watch: {
  }
}
</script>

<style scoped>
  #idxBle {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgb(4, 40, 77);
  }

  .searchbox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .eggbg {
    position: absolute;
    width: 1.8rem;
    height: auto;
    right: 0.9rem;
    bottom: 0.5rem;
  }

  .eggbg img {
    width: 100%;
  }

  .figurebox {
    position: relative;
    left: 1.5rem;
    top: -4rem;
    width: 2rem;
    height: auto;
  }

  .timeoutfigureboxmove {
    animation: linear figureMove 2s forwards;
    -webkit-animation: linear figureMove 2s forwards;
  }

  @keyframes figureMove {
    0% { top: -4rem; }
    40% { top: -2rem }
    70% { top: -4rem; }
    100% { top: -0.2rem; }
  }

  @-webkit-keyframes figureMove {
    0% { top: -4rem; }
    40% { top: -2rem }
    70% { top: -4rem; }
    100% { top: -0.2rem; }
  }

  .figurebg {
    width: 2rem;
    height: auto;
  }

  .bleBtn {
    position: absolute;
    top: 2.1rem;
    left: 0.58rem;
    width: 1.05rem;
    height: auto;
  }

</style>
