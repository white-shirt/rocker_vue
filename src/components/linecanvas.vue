<template>
  <div class="linebox" :style="{background: 'url(' + bg + ') no-repeat', backgroundSize: 'cover'}">
    <ul class="waveul">
      <li :class="['wavelist', choosedPoArr.length <= 2 ? 'wavestatus' + choosedPoArr.length : 'wavehidden']"></li>
      <li :class="['wavelist', choosedPoArr.length <= 2 ? 'wavestatus' + choosedPoArr.length : 'wavehidden']"></li>
      <li :class="['wavelist', choosedPoArr.length <= 2 ? 'wavestatus' + choosedPoArr.length : 'wavehidden']"></li>
    </ul>
    <div class="canvaswrap">
      <canvas id="linecanvas" @touchstart="touchstart"></canvas>
    </div>
    <div :class="[down ? 'btmboxdown' : 'btmboxup', 'btmbox']">
      <div class="colorbox">
        <color></color>
      </div>
      <ul class="botBtn">
        <li class="Btn repeal" :style="{ background: (disable ? '#D3D3D3': '#ff9d00' ) }"><button :disabled="disable" @click="repeal"><img :src="repealpic"></button></li>
        <li class="Btn clear"><button @click="clear"><img v-if="!disable" :src="clearpic"><img v-if="disable" :src="stoppic"></button></li>
        <li class="Btn send" :style="{ background: (disable ? '#D3D3D3': '#ff9d00' ) }"><button :disabled="disable" @click="startsend"><img :src="startpic"></button></li>
      </ul>
      <div :class="[ down ? 'downBtnRo' : '', 'downBtn' ]" @click="arrow"><img :src="downpic"></div>
    </div>
    <div v-if="choosedPoArr.length > 0" class="avatar" :style="{top: top + 'px', left: left + 'px', width: avatarW + 'px', height: avatarW + 'px'}">
      <img :src="avatar" style="width:100%;height:100%;" />
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import avatar from "../../static/img/line/egg2.png";
import color from "components/color.vue";
import bg from "../../static/img/line/bg.png";
import clearpic from "../../static/img/line/clear.png";
import stoppic from "../../static/img/line/stop.png";
import repealpic from "../../static/img/line/repeal.png";
import startpic from "../../static/img/line/start.png";
import downpic from "../../static/img/line/down.png";


export default {
  name: "linecanvas",
  data() {
    return {
      bg,
      avatar: avatar,
      avatarW: "",
      top: 0,
      left: 0,
      disable: false,
      angleObj: [],
      clearpic,
      repealpic,
      startpic,
      downpic,
      stoppic,
      down: false,
      timer: null,
      timerout: null,
      stepIndex: 0,
      canvasEle: "",
      ctx: "",
      canvasW: "",
      canvasH: "",
      pointXArr: [],
      pointYArr: [],
      choosedPoArr: [],
      directionStatus: null
    }
  },
  components: { color },
  methods: {
    drawPoint: function () {
      var _this = this;
      var width = _this.canvasW;
      var height = _this.canvasH;
      for (var i = 1; i < Math.round(width / 25); i++) {
        _this.pointXArr[i] = new Array();
        _this.pointYArr[i] = new Array();
        for (var j = 1; j < Math.round(height / 25); j++) {
          _this.pointXArr[i][j] = Math.round(width / Math.round(width / 25)) * i;
          _this.pointYArr[i][j] = Math.round(height / Math.round(height / 25)) * j;
        }
      };
      _this.ctx.save();
      for (var i = 1; i < Math.round(width / 25); i++) {
        for (var j = 1; j < Math.round(height / 25); j++) {
        _this.ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        _this.ctx.beginPath();
        _this.ctx.arc(_this.pointXArr[i][j], _this.pointYArr[i][j], 4, 0, 2 * Math.PI);
        _this.ctx.fill();
        };
      };
      _this.ctx.restore();
    },
    touchstart: function (e) {
      var _this = this;
      if (!_this.disable && _this.choosedPoArr.length < 50) {
        var touchX = e.targetTouches[0].pageX;
        var touchY = e.targetTouches[0].pageY;
        var xIndex = Math.round(touchX / (_this.canvasW / Math.round(_this.canvasW / 25)));
        var yIndex = Math.round(touchY / (_this.canvasH / Math.round(_this.canvasH / 25)));
        xIndex === 0 ? xIndex = 1 : xIndex = xIndex;
        yIndex === 0 ? yIndex = 1 : yIndex = yIndex;
        xIndex === _this.pointXArr[1].length ? xIndex = _this.pointXArr[1].length - 1 : xIndex = xIndex;
        yIndex === _this.pointYArr[1].length ? yIndex = _this.pointYArr[1].length - 1 : yIndex = yIndex;
        if (_this.choosedPoArr.length >= 1) {
          var lastPointX = _this.choosedPoArr[_this.choosedPoArr.length - 1].x;
          var lastPointY = _this.choosedPoArr[_this.choosedPoArr.length - 1].y;
          if (lastPointX !== _this.pointXArr[xIndex][1] || lastPointY !== _this.pointYArr[1][yIndex]) {
            _this.choosedPoArr.push({ "x": _this.pointXArr[xIndex][1], "y": _this.pointYArr[1][yIndex] });
          }
        } else if (_this.choosedPoArr.length === 0) {
          _this.choosedPoArr.push({ "x": _this.pointXArr[xIndex][1], "y": _this.pointYArr[1][yIndex] });
        }
        _this.top = _this.choosedPoArr[0].y - _this.avatarW / 2;
        _this.left = _this.choosedPoArr[0].x - _this.avatarW / 2;
        _this.draw();
      } else if (_this.choosedPoArr.length >= 50) {
        window.plugins.toast.showLongCenter("Click point has reached the limit");
      }
    },
    draw: function () {
      var _this = this;
      _this.ctx.save();
      _this.ctx.clearRect(0, 0, _this.canvasW, _this.canvasH);
      _this.drawPoint();
      for (var i = 0; i < _this.choosedPoArr.length; i++) {
        _this.ctx.fillStyle = "rgb(255, 229, 0)";
        _this.ctx.beginPath();
        _this.ctx.arc(_this.choosedPoArr[i].x, _this.choosedPoArr[i].y, 4, 0, 2 * Math.PI);
        _this.ctx.fill();
        if (i >= 1) {
          _this.ctx.lineWidth = 1;
          _this.ctx.strokeStyle = "rgb(255, 229, 0)";
          _this.ctx.beginPath();
          _this.ctx.moveTo(_this.choosedPoArr[i - 1].x, _this.choosedPoArr[i - 1].y);
          _this.ctx.lineTo(_this.choosedPoArr[i].x, _this.choosedPoArr[i].y);
          _this.ctx.stroke();
        }
      }
    },
    repeal: function () {
      var _this = this;
      if (_this.choosedPoArr.length > 0) {
        _this.choosedPoArr.pop();
        _this.draw();
      }
    },
    clear: function () {
      var _this = this;
      window.cancelAnimationFrame(_this.timer);
      clearTimeout(_this.timerout);
      _this.directionStatus = "stop";
      _this.disable = false;
      _this.stepIndex = 0;
      _this.choosedPoArr = [];
      _this.angleObj = [];
      _this.draw();
    },
    angle: function (x1,y1,x2,y2,x3,y3) {
      var _this = this;
      var angle;
      function getRotateAngle() {
        var va_x = x3 - x2;
        var va_y = y3 - y2;
        var vb_x = x1 - x2;
        var vb_y = y1 - y2;
        var productValue = (va_x * vb_x) + (va_y * vb_y);
        var va_val = Math.sqrt(va_x * va_x + va_y * va_y);
        var vb_val = Math.sqrt(vb_x * vb_x + vb_y * vb_y);
        var cosValue = productValue / (va_val * vb_val);
        if (cosValue < -1 && cosValue > -2) {
          cosValue = -1;
        } else if (cosValue > 1 && cosValue < 2) {
          cosValue = 1;
        }
        return Math.round(Math.acos(cosValue) * 180 / Math.PI);
      }
      function direction() {
        var flag = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1);
        angle = 180 - getRotateAngle();
        if (flag >= 0)  _this.angleObj.push({ time: angle * 750 / 90, dir: 1 })
        else _this.angleObj.push({ time: angle * 750 / 90, dir: 0 })
      }
      direction();
    },
    avatarMove: function () {
      var _this = this;
      var choosedPoArr = _this.choosedPoArr;
      var disX = Math.pow(choosedPoArr[_this.stepIndex].x - choosedPoArr[_this.stepIndex + 1].x, 2);
      var disY = Math.pow(choosedPoArr[_this.stepIndex].y - choosedPoArr[_this.stepIndex + 1].y, 2);
      var step = Math.ceil(Math.sqrt(disX + disY) / 30);
      if (_this.stepIndex < choosedPoArr.length - 1) {
        _this.timer = window.requestAnimationFrame(_this.avatarMove);
        _this.directionStatus = "front";
        _this.left += (choosedPoArr[_this.stepIndex + 1].x - choosedPoArr[_this.stepIndex].x) / step / 30;
        _this.top += (choosedPoArr[_this.stepIndex + 1].y - choosedPoArr[_this.stepIndex].y) / step / 30;
        var cur_disX = Math.abs(_this.left + _this.avatarW / 2 - choosedPoArr[_this.stepIndex + 1].x );
        var cur_disY = Math.abs(_this.top + _this.avatarW / 2 - choosedPoArr[_this.stepIndex + 1].y );
        if (cur_disX <= 4 && cur_disY <= 4) {
          _this.stepIndex += 1;
          window.cancelAnimationFrame(_this.timer);
          if (_this.stepIndex == choosedPoArr.length - 1) {
            _this.clear();
          } else {
            if (_this.angleObj[_this.stepIndex - 1].dir == 0) _this.directionStatus = "rotate0"
            else _this.directionStatus = "rotate1"
            _this.timerout = setTimeout(function () {
              window.requestAnimationFrame(_this.avatarMove);
            }, _this.angleObj[_this.stepIndex - 1].time)
          }
        }
      }
    },
    startsend: function () {
      var _this = this;
      var choosedPoArr = _this.choosedPoArr;
      if (choosedPoArr.length > 1) {
        _this.disable = true;
        for (var i = 0; i < choosedPoArr.length - 1; i++) {
          if (i < choosedPoArr.length - 2) {
            _this.angle(choosedPoArr[i].x, choosedPoArr[i].y, choosedPoArr[i + 1].x, choosedPoArr[i + 1].y, choosedPoArr[i + 2].x, choosedPoArr[i + 2].y);
          }
        }
        _this.avatarMove();
      }
    },
    arrow: function () {
      var _this = this;
      _this.down = !_this.down;
    }
  },
  mounted: function () {
    var _this = this;
    _this.canvasEle = $("#linecanvas");
    _this.ctx = $("#linecanvas")[0].getContext("2d");
    _this.canvasW = $(".canvaswrap").width();
    _this.canvasH = $(".canvaswrap").height();
    _this.avatarW = 0.4 * document.documentElement.clientWidth / 750 * 100;
    _this.canvasEle.css({
      width: _this.canvasW,
      height: _this.canvasH
    })
    if (window.devicePixelRatio) {
      _this.canvasEle.attr("width", _this.canvasW * window.devicePixelRatio);
      _this.canvasEle.attr("height", _this.canvasH * window.devicePixelRatio);
      _this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    _this.drawPoint();
  },
  watch: {
    directionStatus: {
      handler(val) {
        var _this = this;
        var left,right;
        switch (val) {
          case "front":
            left = 50;
            right = 50;
            break;
          case "stop":
            left = 0;
            right = 0;
            break;
          case "rotate0":
            left = -40;
            right = 40;
            break;
          case "rotate1":
            left = 40;
            right = -40;
            break;
        }
        try {
          _this.$store.dispatch("aieggy/invokeSendOrder", [60, 1, left, right, 62]);
        }
        catch (err) {
          console.log(err)
        }
      },
      deep: false
    },
    disable: {
      handler(val) {
        this.$emit("ondisable", val);
      }
    }
  }
}
</script>

<style scoped>
.linebox {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.canvaswrap {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.canvaswrap::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.7rem;
  background: rgb(4, 40, 77);
}

.avatar {
  position: absolute;
}

.avatar img {
  position: absolute;
  top: 0;
  left: 0;
}

.btmbox {
  position: absolute;
  display: flex;
  display: -webkit-flex;
  padding: 0.09rem 0rem;
  box-sizing: border-box;
  flex-direction: row;
  -webkit-flex-direction: row;
  bottom: 0rem;
  width: 100%;
  height: 0.71rem;
  background: #125675;
}

.btmboxdown {
  bottom: -0.9rem;
}

.btmboxup {
  bottom: 0rem;
}

.colorbox {
  width: 5.21rem;
  height: 100%;
  padding: 0rem 0.13rem 0 0.18rem;
  border-right: 1px solid #9fa0a0;
  box-sizing: border-box;
}

.botBtn {
  display: flex;
  display: -webkit-flex;
  flex: 1;
  padding: 0rem 0.13rem;
  box-sizing: border-box;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  width: auto;
  height: 100%;
}

.Btn {
  position: relative;
  width: 0.53rem;
  height: 0.53rem;
  border: 3px solid #fff;
  border-radius: 0.09rem; 
  box-sizing: border-box;
  overflow: hidden;
  background: #ff9d00;
}

.Btn img {
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  width: 0.28rem;
  height: auto;
  line-height: 100%;
}

.Btn:nth-child(3) img {
  width: 0.3rem;
  left: 55%;
  height: auto;
}

.Btn:nth-child(3) {
  width: 0.77rem;
  height: 0.77rem;
  bottom: 0.24rem;
  overflow: hidden;
}

.Btn button {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.downBtn {
  position: absolute;
  width: 0.4rem;
  height: 0.4rem;
  top: -0.5rem;
  left: 0.1rem;
  border-radius: 0.08rem;
  background: #125675;
  overflow: hidden;
}

.downBtn img {
  position: absolute;
  display: block;
  width: 0.25rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg);
  -webkit-transform: translate(-50%, -50%) rotate(0deg);
}

.downBtnRo {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  top: -0.65rem;
}

 .waveul {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    font-size: 0;
    overflow: hidden;
  }

  .wavelist {
    position: absolute;
    display: inline-block;
    width: 0.1rem;
    height: 0.1rem;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 0.02rem solid rgba(0, 208, 232, 1);
    box-sizing: border-box;
  }

  .wavestatus0 {
    top: 50%;
    left: 50%;
  }

  .wavestatus1 {
    top: 50%;
    left: 70%;
  }

  .wavestatus2 {
    top: 30%;
    left: 70%;
  }

  .wavehidden {
    display: none;
  }

  .wavelist:nth-child(1) {
    animation: wavemove1 1.5s infinite;
    -webkit-animation: wavemove1 1.5s infinite;
  }

  .wavelist:nth-child(2) {
    animation: wavemove2 1.5s infinite;
    -webkit-animation: wavemove2 1.5s infinite;
  }

  .wavelist:nth-child(3) {
    animation: wavemove3 1.5s infinite;
    -webkit-animation: wavemove3 1.5s infinite;
  }

  @keyframes wavemove1 {
    from { width: 0.1rem; height: 0.1rem; border: 0.02rem solid rgb(255, 255, 255) }
    to { width: 0.5rem; height: 0.5rem; border: 0.02rem solid rgba(255, 255, 255, 0.1) }
  }
  @-webkit-keyframes wavemove1 {
    from { width: 0.1rem; height: 0.1rem; border: 0.02rem solid rgb(255, 255, 255) }
    to { width: 0.5rem; height: 0.5rem; border: 0.02rem solid rgba(255, 255, 255, 0.1) }  
  }

  @keyframes wavemove2 {
    from { width: 0.1rem; height: 0.1rem; border: 0.02rem solid rgb(255, 255, 255) }
    to { width: 0.4rem; height: 0.4rem; border: 0.02rem solid rgba(255, 255, 255, 0.5) }
  }
  @-webkit-keyframes wavemove2 {
    from { width: 0.1rem; height: 0.1rem; border: 0.02rem solid rgb(255, 255, 255) }
    to { width: 0.4rem; height: 0.4rem; border: 0.02rem solid rgba(255, 255, 255, 0.5) }
  }

  @keyframes wavemove3 {
    from { width: 0.1rem; height: 0.1rem; border: 0.02rem solid rgb(255, 255, 255) }
    to { width: 0.3rem; height: 0.3rem; border: 0.02rem solid rgba(255, 255, 255, 0.8) }
  }
  @-webkit-keyframes wavemove3 {
    from { width: 0.1rem; height: 0.1rem; border: 0.02rem solid rgb(255, 255, 255) }
    to { width: 0.3rem; height: 0.3rem; border: 0.02rem solid rgba(255, 255, 255, 0.8) }
  }

</style>
