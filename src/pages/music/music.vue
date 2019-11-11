<template>
  <div id="music" :style="{background: 'url(' + bg + ') no-repeat', backgroundSize: 'cover'}">
    <ul class="musicul">
      <li class="musiclist" v-for="item in listData" :key="item.id" :style="{ background: item.color }" @touchstart="touchstart(item.id, item.index)" @touchend="touchend"></li>
    </ul>
    <toindex class="toidxbox"></toindex>
    <toble class="toblebox"></toble>
    <!-- <tohelp class="tohelpbox"></tohelp> -->
    <power1 class="power1"></power1>
    <maskbox></maskbox>
  </div>
</template>

<script>
import $ from "jquery";
import {mapState,mapGetters,mapActions} from 'vuex';
import toindex from "components/toindex.vue";
import toble from "components/bluetooth.vue";
import tohelp from "components/help.vue";
import power1 from "components/power1.vue";
import maskbox from "components/maskbox.vue";
import bg from "../../../static/img/music/bg.png";

export default {
  name: "music",
  data() {
    return {
      bg,
      media: "",
      listData: [
        { "color": "#cd0400", "id": "Do", "index": 1 },
        { "color": "#f38f00", "id": "Re", "index": 2 },
        { "color": "#f1e000", "id": "Mi", "index": 3 },
        { "color": "#5dc800", "id": "Fa", "index": 4 },
        { "color": "#4ce8de", "id": "Sol", "index": 5 },
        { "color": "#126ae4", "id": "La", "index": 6 },
        { "color": "#903dd1", "id": "Si", "index": 7 },
        { "color": "#ffffff", "id": "ido", "index": 8 }
      ]
    }
  },
  components: { toindex, toble, tohelp, power1, maskbox },
  methods: {
    touchstart: function (id, index) {
      var _this = this;
      var e = event || window.event;
      e.target.style.transform = "rotateX(-3deg)";
      // _this.$store.dispatch("aieggy/invokeAudio", id);
      _this.$store.dispatch("aieggy/invokeSendOrder", [60, 2, index, 0, 62]);
    },
    touchend: function (e) {
      e.target.style.transform = "rotateX(0deg)";
    }
  },
  mounted: function () {
  },
  created: function () {

  },
  computed: {
    ...mapGetters('aieggy', {
      connected: "getConnected"
    }),
    ...mapGetters('aieggy', {
      device_id: "getConnectedid"
    })
  }
}
</script>

<style scoped>
#music {
  width: 100%;
  height: 100%;
  -webkit-text-size-adjust: none;
  background: rgb(53, 50, 50);
  font-family: "Source Han Sans CN", sans-serif;
}

.musicul {
  position: absolute;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: flex-start;
  bottom: 0.2rem;
  left: 0;
  width: 100%;
  height: 65%;
  padding: 0 0.2rem;
  box-sizing: border-box;
  perspective: 1000px;
  transform-origin: center top;
  -webkit-transform-origin: center top;
  overflow: hidden;
}

.musiclist {
  position: relative;
  flex: 1;
  margin: 0 7px;
  border-radius: 10px;
  transform-origin: center top;
  -webkit-transform-origin: center top;
  overflow: hidden;
}

.musiclist::before {
  content: "";
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 1px 1px 1px #555;
  background: rgb(41, 41, 41);
}

.musiclist::after {
  content: "";
  position: absolute;
  font-size: 0;
  bottom: 0.2rem;
  left: 50%;
  width: 0.2rem;
  height: 0.36rem;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
}

.musiclist:nth-child(1)::after {
  background: url("../../../static/img/music/1.png") no-repeat center;
  background-size: 100%;
}
.musiclist:nth-child(2)::after {
  background: url("../../../static/img/music/2.png") no-repeat center;
  background-size: 100%;
}
.musiclist:nth-child(3)::after {
  background: url("../../../static/img/music/3.png") no-repeat center;
  background-size: 100%;
}
.musiclist:nth-child(4)::after {
  background: url("../../../static/img/music/4.png") no-repeat center;
  background-size: 100%;
}
.musiclist:nth-child(5)::after {
  background: url("../../../static/img/music/5.png") no-repeat center;
  background-size: 100%;
}
.musiclist:nth-child(6)::after {
  background: url("../../../static/img/music/6.png") no-repeat center;
  background-size: 100%;
}
.musiclist:nth-child(7)::after {
  background: url("../../../static/img/music/7.png") no-repeat center;
  background-size: 100%;
}
.musiclist:nth-child(8)::after {
  background: url("../../../static/img/music/8.png") no-repeat center;
  background-size: 100%;
}
</style>
