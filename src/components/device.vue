<template>
    <div id="device" v-show="scanflag" :style="{background: 'url(' + indexBg + ') no-repeat', backgroundSize: 'cover'}">
      <div class="deviceBgbox">
        <!--<canvas style="width: 100%; height: 100%;" id="deviceBg"></canvas>-->
      </div>
      <div class="wrap">
        <div class="noticebox">
          <div class="circle1" v-if="devices.length == 0"></div>
          <div class="circle2" v-if="devices.length == 0"></div>
          <div class="searching" v-if="devices.length == 0"><img :src="searchpic"></div>
          <div class="botBtn">
            <div class="next" @click="close"><img :src="backpic"></div>
            <div class="refresh" @click="refresh"><img :src="refreshpic"></div>
          </div>
          <div class="devicebox">
            <ul class="deviceul">
              <li class="devicelist" v-for="(item, index) in devices" :key="index" @click="connect(item)">
                <div class="deviceIcon"><img :src="deviceIcon"></div>
                <div class="devicename">{{ "aieggy_" + item.slice(-3) }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import deviceIcon from "../../static/img/device.png";
import backpic from "../../static/img/next.png";
import refreshpic from "../../static/img/refresh.png";
import searchpic from "../../static/img/search.png";
import indexBg from "../../static/img/index/indexBg.png";

export default {
  name: "device",
  data() {
    return {
      indexBg,
      deviceIcon,
      backpic,
      refreshpic,
      searchpic
    };
  },
  methods: {
    init: function () {
      // var ele = document.getElementById("deviceBg");
      // var ctx = ele.getContext("2d");
      // var scwidth = document.documentElement.clientWidth;
      // var scheight = document.documentElement.clientHeight;
      // console.log(scwidth, scheight)
      // ele.style.cssText = "width:" + scwidth + "px;" + "height:" + scheight + "px";
      // if (window.devicePixelRatio) {
      //   ele.width = scwidth * window.devicePixelRatio;
      //   ele.height = scheight * window.devicePixelRatio;
      //   ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      // }
      // var pointXarr = [], pointYarr = [];
      // var rowNum = Math.round(scwidth / 50), colNum = Math.round(scheight / 50);
      // for (var i = 1; i < rowNum; i++) {
      //   for (var j = 1; j < colNum; j++) {
      //     ctx.fillStyle = "#f8b62d";
      //     ctx.beginPath();
      //     ctx.arc(Math.round(scwidth / rowNum) * i, Math.round(scheight / colNum) * j, 8, 0, 2 * Math.PI);
      //     ctx.fill();
      //   }
      // }
    },
    close: function() {
      var _this = this;
      _this.$store.dispatch("aieggy/invokeChangeblescanflag", false);
    },
    refresh: function() {
      var _this = this;
      _this.$store.dispatch("aieggy/invokeChangeRefresh");
    },
    connect: function(id) {
      var _this = this;
      ble.connect(id, function() {
        _this.$store.dispatch("aieggy/invokeChangeblescanflag", false);
        window.plugins.toast.showLongCenter("connect success");
        window.localStorage.setItem("Ble_device_id", id);
      },
      function(reason) {
      
      });
    }
  },
  created: function() {},
  mounted: function() {
 
  },
  computed: {
    ...mapGetters("aieggy", {
      devices: "getDevice"
    }),
    ...mapGetters("aieggy", {
      scanflag: "getBlescanflag"
    })
  },
  watch: {
    scanflag: {
      handler(val) {
        var _this = this;
        if (val) this.init()
      }
    }
  }
};
</script>

<style scoped>
#device {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  /* background: #ffcb30; */
  overflow: hidden;
  z-index: 110;
}

.deviceBgbox {
  position: absolute;
  width: 100%;
  height: 100%;
}

.noticebox {
  position: relative;
  width: 6rem;
  height: 3rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.2rem;
  overflow: hidden;
}

.wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circle1, .circle2 {
   position: absolute;
   width: 0.5rem;
   height: 0.5rem;
   border-radius: 50%;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   -webkit-transform: translate(-50%, -50%);
}

.circle1 {
    background: rgba(255, 255, 255, 0.3);
    animation: linear circle1move 1s infinite;
    -webkit-animation: linear circle1move 1s infinite;
}

.circle2 {
    background: rgba(255, 255, 255, 0.4);
    animation: linear circle2move 1s infinite;
    -webkit-animation: linear circle2move 1s infinite;
}

@keyframes circle1move {
    from { width: 0.5rem; height: 0.5rem; }
    to { width: 1.3rem; height: 1.3rem }
}

@keyframes circle2move {
    from { width: 0.5rem; height: 0.5rem; }
    to { width: 1rem; height: 1rem }
}

@-webkit-keyframes circle1move {
    from { width: 0.5rem; height: 0.5rem; }
    to { width: 1.3rem; height: 1.3rem }
}

@-webkit-keyframes circle2move {
    from { width: 0.5rem; height: 0.5rem; }
    to { width: 1rem; height: 1rem }
}

.devicebox {
  position: absolute;
  top: 0;
  width: 100%;
  height: 80%;
  overflow: auto;
}

.devicebox .deviceul {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-x: scroll;
}

.deviceul .devicelist {
  position: relative;
  flex-shrink: 0;
  width: 1.2rem;
  height: 80%;
  margin: 0 0.15rem;
  border-radius: 0.1rem;
  box-sizing: border-box;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.5);
  font-size: 0;
}

.deviceul .devicelist .deviceIcon {
  position: absolute;
  width: 100%;
  height: 2.2rem;
  top: 0;
  left: 0;
}

.deviceIcon img {
  position: absolute;
  width: 80%;
  top: 10%;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}

.deviceul .devicelist .devicename {
  position: absolute;
  bottom: -0.2rem;
  width: 200%;
  line-height: 0.8rem;
  text-align: center;
  -webkit-transform-origin: left;
  transform-origin: left;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  font-size: 0.3rem;
  background: #1293b2;
}


.searching {
  position: relative;
  display: block;
  top: 50%;
  left: 50%;
  width: 0.5rem;
  height: 0.5rem;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.searching img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.botBtn {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  bottom: 0;
  left: 0;
}

.next, .refresh {
  position: relative;
  width: 0.4rem;
  height: 0.4rem;
  margin: 0 0.1rem;
}

.next img, .refresh img {
  position: absolute;
  width: 100%;
}
</style> 

