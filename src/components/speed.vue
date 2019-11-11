<template>
  <div id="speedBox">
    <div class="speedNum">{{ angle }}<span> mm/s</span></div>
    <div class="press" @touchstart="touchstart" @touchend="touchend">
      <span>ON PRESS</span>
    </div>
    <div class="powerWrap">
      <power></power>
    </div>
    <canvas id="speedcvs"></canvas>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex';
import power from 'components/power.vue';

export default {
  name: "speedBox",
  data() {
    return {
      cvsEle: "",
      cvsCtx: "",
      cvsWidth: "",
      X: "",
      Y: "",
      pressColor: "#fff",
      addTimer: "",
      subTimer: ""
    };
  },
  components: { power },
  methods: {
    init: function() {
      var _this = this;
      _this.cvsEle.css({
        width: _this.cvsWidth + "px",
        height: _this.cvsWidth + "px"
      });
      if (window.devicePixelRatio) {
        _this.cvsEle.attr("width", _this.cvsWidth * window.devicePixelRatio + "px");
        _this.cvsEle.attr("height", _this.cvsWidth * window.devicePixelRatio + "px");
      };
      _this.X = _this.cvsWidth * window.devicePixelRatio / 2;
      _this.Y = _this.cvsWidth * window.devicePixelRatio / 2;
      _this.drawBg();
    },
    drawBg: function () {
      var _this = this;
      var ctx = _this.cvsCtx;
      ctx.save();
      ctx.translate(_this.X, _this.Y);
      ctx.lineWidth = 10;
      ctx.strokeStyle = _this.pressColor;
      ctx.beginPath();
      ctx.arc(0, 0, _this.cvsWidth * window.devicePixelRatio / 2 - 10, 0, 2 * Math.PI);
      ctx.stroke();
      for (var i = 180; i <= 360; i++) {
        if (i % 5 == 0) {
          var rad = i * 2 * Math.PI / 360;
          var lineTo_x = Math.cos(rad);
          var lineTo_y = Math.sin(rad);
          ctx.lineWidth = 7;
          ctx.lineCap = "round";
          ctx.strokeStyle = "hsl(" + (360 - i) + ", 100%, 50%)";
          ctx.beginPath();
          ctx.moveTo(lineTo_x * _this.X / 1.5, lineTo_y * _this.Y / 1.5);
          ctx.lineTo(_this.X * lineTo_x / 1.1, _this.Y * lineTo_y / 1.1);
          ctx.stroke();
        }
      };
      ctx.restore();
      _this.drawPointer(_this.angle);
      _this.drawmask();
    },
    drawPointer: function (angle) {
      var _this = this;
      var ctx = _this.cvsCtx;
      ctx.save();
      ctx.translate(_this.X, _this.Y);
      ctx.rotate(angle * Math.PI / 180);
      ctx.fillStyle = "#f5f5f5";
      ctx.beginPath();
      ctx.moveTo(50, -10);
      ctx.lineTo(50, 10);
      ctx.lineTo(-200, 0);
      ctx.lineTo(50, -10);
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    },
    drawmask: function () {
      var _this = this;
      var ctx = _this.cvsCtx;
      ctx.save();
      ctx.translate(_this.X, _this.Y);
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.beginPath();
      ctx.arc(0, 0, _this.cvsWidth * window.devicePixelRatio / 2 - 20, 0, Math.PI);
      ctx.fill();
      ctx.restore();
    },
    touchstart: function () {
      var _this = this;
      _this.pressColor = "rgb(0, 229, 255)";
      clearInterval(_this.subTimer);
      clearInterval(_this.addTimer);
      _this.addTimer = setInterval(function () {
        if (_this.angle < 180) _this.$store.dispatch("aieggy/invokeSpeed", 4);
        else _this.$store.dispatch("aieggy/invokeSpeed", 0);
      }, 100);
    },
    touchend: function () {
      var _this = this;
      _this.pressColor = "#fff";
      clearInterval(_this.subTimer);
      clearInterval(_this.addTimer);
      _this.subTimer = setInterval(function () {
        if (_this.angle <= 40) _this.$store.dispatch("aieggy/invokeSpeed", 0);
        else _this.$store.dispatch("aieggy/invokeSpeed", -4);
      }, 100);
    }
  },
  mounted() {
    var _this = this;
    _this.cvsEle = $("#speedcvs");
    _this.cvsCtx = _this.cvsEle[0].getContext("2d");
    _this.cvsWidth = $("#speedBox").width();
    _this.init();
  },
  computed: {
    ...mapGetters("aieggy", {
      angle: "getspeed"
    })
  },
  watch: {
    angle: function () {
      var _this = this;
      _this.cvsCtx.clearRect(0, 0, _this.cvsWidth * window.devicePixelRatio, _this.cvsWidth * window.devicePixelRatio);
      _this.drawBg();
    }
  }
};
</script>

<style scoped>
#speedBox {
  width: 100%;
  height: 100%;
}

#speedcvs {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}

.speedNum {
  position: absolute;
  width: auto;
  height: auto;
  top: 30%;
  left: 50%;
  font-size: 0.2rem;
  color: rgb(238, 238, 130);
  transform: translateX(-50%);
  z-index: 1;
}

.speedNum span {
  font-size: 0.13rem;
}

.press {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 0.16rem;
  color: #f0f0f0;
  z-index: 3;
  border-radius: 100%;
}

.powerWrap {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 96%;
  height: 49%;
  transform: translateX(-50%);
  z-index: 2;
  border-bottom-right-radius:50% 100%;
  border-bottom-left-radius:50% 100%;
  overflow: hidden;
}

.press span {
  display: inline-block;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

