<template>
<div id="app" :style="{background: 'url(' + bg + ') no-repeat', backgroundSize: 'cover'}">
    <div class="leftpart">
        <div class="rockerCircle">
            <cancircle v-on:onRockerMove="slide"></cancircle>
        </div>
    </div>
    <div class="rightpart">
        <div class="circle1">
            <div class="circle2">
                <ul class="circle3">
                  <li :class="['speedpic', speed == 40 ? 'active' : 'unactive']"><img :src="speed1pic"></li>
                  <li :class="['speedpic', speed == 80 ? 'active' : 'unactive']"><img :src="speed2pic"></li>
                  <li :class="['speedpic', speed == 120 ? 'active' : 'unactive']"><img :src="speed3pic"></li>
                  <li :class="['speedpic', speed == 170 ? 'active' : 'unactive']"><img :src="speed4pic"></li>
                </ul>
                <ul class="circle3">
                    <li class="tapli" @touchstart="tap(40)"></li>
                    <li class="tapli" @touchstart="tap(80)"></li>
                    <li class="tapli" @touchstart="tap(120)"></li>
                    <li class="tapli" @touchstart="tap(170)"></li>
                </ul>
            </div>
            <img class="sdpic" :src="sdpic">
        </div>
    </div>
    <div :class="['btmcolor', down ? 'btmboxdown' : 'btmboxup']">
        <color></color>
        <div :class="['down', down ? 'downRo' : '']" @click="tapdown">
            <img :src="downpic">
        </div>
    </div>
    <toindex class="toidxbox"></toindex>
    <toble class="toblebox"></toble>
    <!-- <tohelp class="tohelpbox"></tohelp> -->
    <power1 class="power1"></power1>
    <maskbox></maskbox>
</div>
</template>

<script>
import bg from "../../../static/img/rocker/background.png";
import sdpic from "../../../static/img/rocker/sd.png";
import downpic from "../../../static/img/line/down.png";
import $ from "jquery";
import {
    mapState,
    mapGetters,
    mapActions
} from "vuex";
import toindex from "components/toindex.vue";
import toble from "components/bluetooth.vue";
import tohelp from "components/help.vue";
import power1 from "components/power1.vue";
import cancircle from "components/cancircle.vue";
import maskbox from "components/maskbox.vue";
import color from "components/color.vue";
import speed1pic from "../../../static/img/rocker/speed1.png"
import speed2pic from "../../../static/img/rocker/speed2.png"
import speed3pic from "../../../static/img/rocker/speed3.png"
import speed4pic from "../../../static/img/rocker/speed4.png"

export default {
    name: "app",
    data() {
        return {
            bg: bg,
            sdpic,
            downpic,
            speed1pic,
            speed2pic,
            speed3pic,
            speed4pic,
            speed: 40,
            down: false
        };
    },
    components: {
        toindex,
        toble,
        tohelp,
        power1,
        cancircle,
        maskbox,
        color
    },
    methods: {
        tap: function (speed) {
            this.speed = speed;
            this.$store.dispatch("aieggy/invokeSpeed", speed);
        },
        tapdown: function () {
            this.down = !this.down;
        },
        slide: function (flag) {
            flag ? this.down = true : this.down = false;
        }
    },
    created() {},
    mounted: function () {

    },
    computed: {
        ...mapGetters("device", {
            deviceData: "getDeviceData"
        })
    }
};
</script>

<style scoped>
#app {
    font-family: "Microsoft Yahei", Helvetica, Arial, sans-serif;
    width: 100%;
    height: 100%;
    -webkit-text-size-adjust: none;
    position: relative;
    overflow: hidden;
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -khtml-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}

.deviceInfo {
    position: absolute;
    width: 100%;
    top: 0;
}

.leftpart {
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0;
    left: 0;
}

.rockerCircle {
    position: absolute;
    bottom: 0.5rem;
    left: 0.45rem;
}

.rightpart {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
}

.circle1 {
    position: absolute;
    width: 2.27rem;
    height: 2.27rem;
    border-radius: 50%;
    border: 0.06rem #256168 solid;
    box-sizing: border-box;
    bottom: 0.5rem;
    right: 0.45rem;
    overflow: hidden;
    background: #031e3b;
}

.circle2,
.circle3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    width: 1.88rem;
    height: 1.88rem;
    border-radius: 50%;
    overflow: hidden;
}

.speedpic {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.active {
    display: inline-block;
}

.unactive {
    display: none;
}

.speedpic img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.tapli {
    position: absolute;
    transform-origin: center;
    -webkit-transform-origin: center;
    width: 50%;
    height: 50%;
}

.tapli:nth-child(1) {
    transform: skewX(30deg) translateX(-0.28rem);
    -webkit-transform: skewX(30deg) translateX(-0.28rem);
}

.tapli:nth-child(2) {
    transform: rotate(60deg) skewX(30deg) translate(0.3rem, -0.7rem);
    -webkit-transform: rotate(60deg) skewX(30deg) translate(0.3rem, -0.7rem);
}

.tapli:nth-child(3) {
    transform: translate(1.3rem, 0.2rem) rotate(130deg) skewX(30deg);
    -webkit-transform: translate(1.3rem, 0.2rem) rotate(130deg) skewX(30deg);
}

.tapli:nth-child(4) {
    transform: translate(1.1rem, 1.15rem) rotate(190deg) skewX(30deg);
    -webkit-transform: translate(1.1rem, 1.15rem) rotate(190deg) skewX(30deg);
}

.st1 {
    display: inline-block;
    position: absolute;

}

.sdpic {
    position: absolute;
    bottom: 0.28rem;
    left: 0.46rem;
    width: 0.64rem;
    height: auto;
}

/* .speedslide {
position: absolute;
width: 35vw;
height: 35vw;
top: 50%;
left: 50%;
transform: translate(-60%, -40%);
} */

.btmcolor {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    padding: 0 0.12rem;
    box-sizing: border-box;
    width: 5.14rem;
    height: 0.7rem;
    border-bottom-left-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
    background: #125675;
}

.down {
    position: absolute;
    bottom: -0.4rem;
    left: 50%;
    transform-origin: center;
    transform: translateX(-50%);
    -webkit-transform-origin: center;
    -webkit-transform: translateX(-50%);
    width: 0.4rem;
    height: 0.3rem;
    border-radius: 0.05rem;
    background: #125675;
}

.down img {
    position: absolute;
    width: 70%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(180deg);
    -webkit-transform: translate(-50%, -50%) rotate(180deg);
}

.btmboxdown {
    position: absolute;
    top: -0.7rem;
}

.btmboxup {
    top: 0rem;
}

.downRo {
    transform: translateX(-50%) rotate(180deg);
    -webkit-transform: translateX(-50%) rotate(180deg);
}
</style>
