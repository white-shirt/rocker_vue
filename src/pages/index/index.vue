<template>
  <div id="idxBle" :style="{background: 'url(' + cardbg + ') no-repeat', backgroundSize: 'cover'}">
    <div class="searchbox">
      <div class="languageBox">
        <language></language>
      </div>
      <div :class="['figurebox', timeoutMove ? 'timeoutfigureboxmove' : '']">
        <img class="figurebg" :src="figurebg">
        <img class="bleBtn" @click="search" :src="bleBtn">
      </div>
      <div class="eggbg"><img :src="eggbg"></div>
    </div>
  </div>
</template>

<script>
import language from "components/language.vue";

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
  components: { language },
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

.languageBox {
  position: absolute;
  width: 0.6rem;
  height: 0.6rem;
  top: 0.38rem;
  right: 0.7rem;
}

.eggbg {
  position: absolute;
  width: 2.8rem;
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
  width: 3rem;
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
  width: 3rem;
  height: auto;
}

.bleBtn {
  position: absolute;
  top: 3.2rem;
  left: 0.85rem;
  width: 1.6rem;
  height: auto;
}

</style>
