<template>
  <div id="rockercanvas">
     <div class="rockerBg">
       <ul class="arrowul">
         <li><img :src="arrowpic"></li>
         <li><img :src="arrowpic"></li>
         <li><img :src="arrowpic"></li>
         <li><img :src="arrowpic"></li>
       </ul>
     </div>
     <div class="rockerPoint" :style="{ left: cenX + 'px', top: cenY + 'px', transform: 'rotate(' + angle + 'deg)' }" @touchmove="touchmove" @touchend="touchend">
       <div class="circle2">
         <img :src="bg" />
       </div>
     </div>
  </div>
</template>

<script>

import {mapState,mapGetters,mapActions} from 'vuex';
import bg from '../../static/img/rocker/bg.png';
import arrowpic from "../../static/img/rocker/arrow.png";

export default {
  name: "rockercanvas",
  data() {
    return {
      bg,
      arrowpic,
      rockerBg: "",
      width: "",
      X: "",
      Y: "",
      r: "",
      cenX: "",
      cenY: "",
      pointX: "",
      pointY: "",
      left: "",
      top: "",
      angle: 0,
      flag: false,
      moveTimer: null
    };
  },
  components: {  },
  methods: {
    initPoint: function () {
      var _this = this;
      _this.cenX = _this.width / 2 - $('.rockerPoint').width() / 2;
      _this.cenY = _this.width / 2 - $('.rockerPoint').height() / 2;
      _this.left = _this.cenX;
      _this.top = _this.cenY;
      _this.flag = false;
      _this.angle = 0;
    },
    touchmove: function (e) {
      var _this = this;
      var moveX = e.targetTouches[0].pageX - _this.pointX;
      var moveY = -(e.targetTouches[0].pageY - _this.pointY);
      var camber = Math.atan2(moveX, moveY);
      var moveAngle = parseInt(camber * 180 / Math.PI);
      moveAngle <= 0 ? (moveAngle += 360) : moveAngle = moveAngle;
      _this.angle = moveAngle;
      _this.flag = true;
      var dis = Math.sqrt(Math.pow(moveX, 2) + Math.pow(moveY, 2));
      if (dis > _this.width / 2) {
        _this.cenX = moveX * _this.width / 2 / dis + _this.left;
        _this.cenY = -moveY * _this.width / 2 / dis + _this.top;
      } else {
        _this.cenX = moveX + _this.left;
        _this.cenY = -moveY + _this.top;
      }
      _this.$emit("onRockerMove", true);
    },
    touchend: function () {
      var _this = this;
      _this.initPoint();
    },
    cptSpeed: function () {
      var _this = this;
      var leftratio;
      var rightratio;
      var speed = parseInt(_this.speed * 100 / 180);
      var speedObj = { "left": "", "right": "" };
      if ((_this.angle > 90 && _this.angle <= 180) || (_this.angle > 180 && _this.angle <= 270)) speed = -speed;
      if ( _this.angle >= 0 && _this.angle <= 90) {
        speedObj.left = speed;
        speedObj.right = parseInt(speed * (90 - _this.angle) / 90);
      }
      if (_this.angle > 90 && _this.angle <= 180) {
        speedObj.left = speed;
        speedObj.right = parseInt(speed * (_this.angle - 90) / 90);
      }
      if (_this.angle > 180 && _this.angle <= 270) {
        speedObj.left = parseInt(speed * (270 - _this.angle) / 90);
        speedObj.right = speed;
      }
      if (_this.angle > 270 && _this.angle <= 360) {
        speedObj.left = parseInt(speed * (_this.angle - 270) / 90);
        speedObj.right = speed;
      }
      for (var key in speedObj) {
        if (speedObj[key] <= -0 && speedObj[key] >= -10) speedObj[key] = -10;
        if (speedObj[key] >= 0 && speedObj[key] < 10) speedObj[key] = 10;
      }
      return speedObj;
    }
  },
  created() {},
  mounted() {
    var _this = this;
    var rockerBg = $(".rockerBg");
    _this.rockerBg = rockerBg;
    _this.width = $("#rockercanvas").width();
    _this.pointX = _this.width / 2 + $("#rockercanvas").offset().left;
    _this.pointY = _this.width / 2 + $("#rockercanvas").offset().top;
    _this.initPoint();
  },
  computed: {
    ...mapGetters('aieggy', {
      device_id: "getConnectedid"
    }),
    ...mapGetters('aieggy', {
      speed: "getspeed"
    })
  },
  watch: {
    flag: {
      handler(val) {
        var _this = this;
        if (val == true) {
          clearInterval(_this.moveTimer);
          _this.moveTimer = setInterval(function () {
            var speed = _this.cptSpeed();
            _this.$store.dispatch("aieggy/invokeSendOrder", [60, 1, speed.left, speed.right, 62]);
          }, 100);
        } else {
          clearInterval(_this.moveTimer);
          _this.$store.dispatch("aieggy/invokeSendOrder", [60, 1, 0, 0, 62]);
        }
      }
    }
  }
};
</script>

<style scoped>
#rockercanvas {
  width: 2.27rem;
  height: 2.27rem;
}

.rockerBg {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 0.06rem #00d0e8 solid;
  box-sizing: border-box;
  top: 0;
  left: 0;
}

.rockerPoint {
  position: absolute;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  background: #888888;
  font-size: 0;
}

.circle2 {
  position: absolute;
  width: 0.85rem;
  height: 0.85rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  border-radius: 50%;
  background: #dbdcdc;
}

.rockerPoint img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  width: 0.4rem;
  height: auto;
}

.arrowul {
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 0;
}

.arrowul li {
  position: absolute;
  width: 0.12rem;
  transform-origin: center;
  -webkit-transform-origin: center;
}

.arrowul li img {
  display: inline-block;
  width: 100%;
}

.arrowul li:nth-child(1) {
  top: 0.05rem;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
}

.arrowul li:nth-child(2) {
  top: 50%;
  left: 2rem;
  transform: translateY(-50%) rotate(90deg);
  -webkit-transform: translateY(-50%) rotate(90deg);
}

.arrowul li:nth-child(3) {
  bottom: 0.05rem;
  left: 50%;
  transform: translateX(-50%) rotate(180deg);
  -webkit-transform: translateX(-50%) rotate(180deg);
}

.arrowul li:nth-child(4) {
  top: 50%;
  left: 0.05rem;
  transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
}

</style>
