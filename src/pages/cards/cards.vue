<template>
    <div id="app" :style="{background: 'url(' + cardbg + ') no-repeat', backgroundSize: 'cover'}">
      <div class="languageBox">
        <language></language>
      </div>
      <bluetooth class="bluetooth"></bluetooth>
      <div class="cardnav">
        <div class="list">
          <div class="wrap">
            <torocker></torocker>
            <div class="amtbox">
              <div class="rkbg">
                <img :src="bg">
              </div>
              <div class="linebg">
                <img :src="linebg">
              </div>
              <div :class="['egg1', timeoutMove ? 'timeoutEgg1move' : '']">
                <img :src="eggpic">
              </div>
              <div class="figcircle"></div>
              <div class="figure1">
                <img :src="figure1pic">
              </div>
              <div :class="['figure2', timeoutMove ? 'timeoutFigure2move' : '']">
                <img :src="figure2pic">
              </div>
            </div>
            <div class="titlebox Rkt">
              <span>{{languageConfig[curLanguage]["card_title_Drive"]}}</span>
            </div>
          </div>
        </div>
        <div class="list">
          <div class="wrap">
            <tomusic></tomusic>
            <div class="amtbox">
              <div class="piano">
                <img :src="piano">
              </div>
              <ul class="notebox">
                <li :class="['notel', 'note1', timeoutMove ? 'timeoutnotemove' : '']">
                  <img class="note1" :src="note1">
                </li>
                <li :class="['notel', 'note2', timeoutMove ? 'timeoutnotemove1' : '']">
                  <img class="note20" :src="note20">
                </li>
                <li :class="['notel', 'note3', timeoutMove ? 'timeoutnotemove2' : '']">
                  <img class="note3" :src="note3">
                </li>
              </ul>
              <div :class="['eggshadow', timeoutMove ? 'timeoutEggshadowmove' : '']">
                <img :src="eggshadow">
              </div>
              <div :class="['megg', timeoutMove ? 'timeoutMeggmove' : '']">
                <img :src="megg">
              </div>
            </div>
            <div class="titlebox Mt">
              <span>{{languageConfig[curLanguage]["card_title_Music"]}}</span>
            </div>
          </div>
        </div>
        <div class="list">
          <div class="wrap">
            <tolines></tolines>
            <div class="amtbox">
              <div class="litem lpic0">
                <img :src="pic0">
              </div>
              <div :class="['litem', 'egg2', timeoutMove ? 'timeoutegg2move' : '']">
                <img :src="egg2">
              </div>
              <ul class="lpicul">
                <li class="litem pic1"><img :src="pic1"></li>
                <li class="litem pic2"><img :src="pic2"></li>
                <li class="litem pic3"><img :src="pic3"></li>
              </ul>
            </div>
            <div class="titlebox Lt">
              <span>{{languageConfig[curLanguage]["card_title_Path"]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex';
import torocker from "components/torocker.vue";
import tomusic from "components/tomusic.vue";
import tolines from "components/tolines.vue";
import language from "components/language.vue";
import bluetooth from "components/bluetooth.vue";
import languageConfig from "../../assets/language.json";

import cardbg from "../../../static/img/cardbg.png";
import eggpic from "../../../static/img/index/egg.png";
import bg from "../../../static/img/index/bg.png";
import linebg from "../../../static/img/index/linebg.png";
import figure1pic from "../../../static/img/index/figure1.png";
import figure2pic from "../../../static/img/index/figure2.png";
import note1 from "../../../static/img/music/note1.png";
import note20 from "../../../static/img/music/note20.png";
import note3 from "../../../static/img/music/note3.png";
import megg from "../../../static/img/music/egg.png";
import eggshadow from "../../../static/img/music/eggshadow.png";
import piano from "../../../static/img/music/piano.png";
import egg2 from "../../../static/img/line/egg2.png";
import pic0 from "../../../static/img/line/pic0.png";
import pic1 from "../../../static/img/line/pic1.png";
import pic2 from "../../../static/img/line/pic2.png";
import pic3 from "../../../static/img/line/pic3.png";


export default {
  name: "app",
  data() {
    return {
      eggpic,
      bg,
      cardbg,
      linebg,
      figure1pic,
      figure2pic,
      note1,
      note20,
      note3,
      megg,
      piano,
      egg2,
      pic0,
      pic1,
      pic2,
      pic3,
      eggshadow,
      languageConfig,
      timeoutMove: false
    };
  },
  components: { torocker, tomusic, tolines, language, bluetooth },
  mounted: function() {
    var _this = this;
    setTimeout(function () {
      _this.timeoutMove = true;
    }, 100)
    
  },
  methods: {},
  computed: {
    ...mapGetters("aieggy", {
      curLanguage: "getLanguage"
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
}

.languageBox {
  position: absolute;
  width: 0.6rem;
  height: 0.6rem;
  top: 0.38rem;
  right: 1.3rem;
  z-index: 3;
}

.bluetooth {
  position: absolute;
  width: 0.6rem !important;
  height: 0.6rem !important;
  top: 0.38rem;
  right: 0.5rem;
  z-index: 3;
}

.cardnav {
  position: relative;
  width: auto;
  height: 5rem;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  /**font-size: 0;*/
  box-sizing: border-box;
}

.list {
  position: relative;
  display: inline-block;
  width: 4.13rem;
  height: 5rem;
  margin-left: 0.56rem;
  border-radius: 0.22rem;
  box-sizing: border-box;
  box-shadow: #111 0px 0px 10px;
  overflow: hidden;
  z-index: 2;
}

.list:nth-child(1) {
  background: #ffe633;
  border: 0.07rem solid #ffb715;
  box-sizing: border-box;
}

.list:nth-child(2) {
  background: #dbf447;
  border: 0.07rem solid #7ed600;
  box-sizing: border-box;
}

.list:nth-child(3) {
  background: #0be8ff;
  border: 0.07rem solid #13aee5;
  margin-right: 0.56rem;
  box-sizing: border-box;
}

.nav {
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.cardnav::-webkit-scrollbar {
  display: none;
}

.amtbox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.86rem;
}

.titlebox {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  background: #fff;
}

.titlebox span {
  display: inline-block;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 0.40rem;
  font-weight: bolder;
  text-align: center;
  line-height: 1rem;
}

.Rkt {
  color: #ff8724;
}

.Mt {
  color: #679947;
}

.Lt {
  color: #088faf;
}

img {
  display: block;
  width: 100%;
  height: auto;
}

.rkbg {
  position: absolute;
  width: 80%;
  top: 0.4rem;
  left: 0.4rem;
}

.egg1 {
  position: absolute;
  width: 1.78rem;
  top: 2.13rem;
  left: 50%;
  transform-origin: center;
  -webkit-transform-origin: center;
  transform: translate(-35%, 0);
  -webkit-transform: translate(-35%, 0);
}

.timeoutEgg1move {
  animation: linear egg1move 4s infinite;
  -webkit-animation: linear egg1move 4s infinite;
}

.egg1 img {
  position: absolute;
  top: 0;
  left: 0;
}

@keyframes egg1move {
  0% { width: 1.78rem; top: 2.13rem;}
  50% { width: 0.75rem; top: 0.55rem;}
  100% { width: 1.78rem; top: 2.13rem;}
}

@-webkit-keyframes egg1move {
  0% { width: 1.78rem; top: 2.13rem;}
  50% { width: 0.75rem; top: 0.55rem;}
  100% { width: 1.78rem; top: 2.13rem;}
}

.linebg {
  position: absolute;
  width: 2.67rem;
  bottom: 0rem;
  right: 0.4rem;
}

.figure1 {
  position: absolute;
  width: 1.42rem;
  bottom: 0rem;
  right: -0.1rem;
}


.figcircle {
  position: absolute;
  width: 1.34rem;
  height: 1.34rem;
  top: 2rem;
  left: 0.2rem;
  border-radius: 50%;
  border: 1px rgb(223, 223, 223) solid;
  background: rgba(255, 255, 255, 0.5);
}

.figure2 {
  position: absolute;
  width: 1.78rem;
  top: 2.42rem;
  left: -0.5rem;
}

.timeoutFigure2move {
  animation: linear figure2move 4s infinite;
  -webkit-animation: linear figure2move 4s infinite;
}

@keyframes figure2move {
  0% { top: 2.42rem }
  50% { top: 1.7rem }
  52% { top: 2.42rem }
  100% { top: 3rem }
}

@-webkit-keyframes figure2move {
  0% { top: 2.42rem }
  50% { top: 1.7rem }
  52% { top: 2.42rem }
  100% { top: 3rem }
}

.piano {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
}

.megg {
  position: absolute;
  width: 1.34rem;
  bottom: 0.5rem;
  left: 0.3rem;
}

.timeoutMeggmove {
  animation: linear meggmove 7s infinite;
  -webkit-animation: linear meggmove 7s infinite;
}


@keyframes meggmove {
  0% { bottom: 0.5rem; left: 0.3rem; }
  12.5% { bottom: 0.9rem; left: 0.8rem; }
  25% { bottom: 0.5rem; left: 1.4rem; }
  37.5% { bottom: 0.9rem; left: 1.9rem; }
  50% { bottom: 0.5rem; left: 2.4rem; }
  62.5% { bottom: 0.9rem; left: 2rem; }
  75% { bottom: 0.5rem; left: 1.4rem; }
  87.5% { bottom: 0.9rem; left: 0.8rem; }
  100% { bottom: 0.5rem; left: 0.3rem; }
}

@-webkit-keyframes meggmove {
  0% { bottom: 0.5rem; left: 0.3rem; }
  12.5% { bottom: 0.9rem; left: 0.8rem; }
  25% { bottom: 0.5rem; left: 1.4rem; }
  37.5% { bottom: 0.9rem; left: 1.9rem; }
  50% { bottom: 0.5rem; left: 2.4rem; }
  62.5% { bottom: 0.9rem; left: 2rem; }
  75% { bottom: 0.5rem; left: 1.4rem; }
  87.5% { bottom: 0.9rem; left: 0.8rem; }
  100% { bottom: 0.5rem; left: 0.3rem; }
}

.eggshadow {
  position: absolute;
  width: 2rem;
  bottom: 0.2rem;
  left: -0.15rem;
  transform: scale(1);
  transform-origin: center;
  -webkit-transform: scale(1);
  -webkit-transform-origin: center;
}

.timeoutEggshadowmove {
  animation: linear shadowmove 7s infinite;
  -webkit-animation: linear shadowmove 7s infinite;
}

@keyframes shadowmove {
  0% { bottom: 0.22rem; left: -0.15rem; transform: scale(1); -webkit-transform: scale(1); }
  12.5% { bottom: 0.22rem; left: 0.6rem; transform: scale(0.8); -webkit-transform: scale(0.8); }
  25% { bottom: 0.22rem; left: 1.2rem; transform: scale(1); -webkit-transform: scale(1); }
  37.5% { bottom: 0.22rem; left: 1.7rem; transform: scale(0.8); -webkit-transform: scale(0.8); }
  50% { bottom: 0.22rem; left: 2.2rem; transform: scale(1); -webkit-transform: scale(1); }
  62.5% { bottom: 0.22rem; left: 1.8rem; transform: scale(0.8); -webkit-transform: scale(0.8); }
  75% { bottom: 0.22rem; left: 1.2rem; transform: scale(1); -webkit-transform: scale(1); }
  87.5% { bottom: 0.22rem; left: 0.6rem; transform: scale(0.8); -webkit-transform: scale(0.8); }
  100% { bottom: 0.22rem; left: -0.15rem; transform: scale(1); -webkit-transform: scale(1); }
}

@-webkit-keyframes shadowmove {
  0% { bottom: 0.22rem; left: -0.15rem; transform: scale(1); -webkit-transform: scale(1); }
  12.5% { bottom: 0.22rem; left: 0.6rem; transform: scale(0.8); -webkit-transform: scale(0.8); }
  25% { bottom: 0.22rem; left: 1.2rem; transform: scale(1); -webkit-transform: scale(1); }
  37.5% { bottom: 0.22rem; left: 1.7rem; transform: scale(0.8); -webkit-transform: scale(0.8); }
  50% { bottom: 0.22rem; left: 2.2rem; transform: scale(1); -webkit-transform: scale(1); }
  62.5% { bottom: 0.22rem; left: 1.8rem; transform: scale(0.8); -webkit-transform: scale(0.8); }
  75% { bottom: 0.22rem; left: 1.2rem; transform: scale(1); -webkit-transform: scale(1); }
  87.5% { bottom: 0.22rem; left: 0.6rem; transform: scale(0.8); -webkit-transform: scale(0.8); }
  100% { bottom: 0.22rem; left: -0.15rem; transform: scale(1); -webkit-transform: scale(1); }
}

.notebox {
  position: relative;
  width: 100%;
  height: auto;
}

.notel {
  position: absolute;
}

.note1 {
  top: 0.5rem;
  left: 0.35rem;
  width: 0.6rem;
}

.timeoutnotemove {
  animation: linear notemove 2.5s infinite;
  -webkit-animation: linear notemove 2.5s infinite;
}

.note2 {
  top: 0.3rem;
  left: 0.7rem;
  width: 0.7rem;
}

.timeoutnotemove1 {
  animation: linear notemove1 3s infinite;
  -webkit-animation: linear notemove1 3s infinite;
}

.note3 {
  top: 0.3rem;
  right: 0.2rem;
  width: 0.3rem;
}

.timeoutnotemove2 {
  animation: linear notemove1 2s infinite;
  -webkit-animation: linear notemove1 2s infinite;
}


@keyframes notemove {
  0% { top: 0.5rem }
  30% { top: 0.3rem }
  50% { top: 0.5rem }
  80% { top: 0.3rem }
  100% { top: 0.5rem }
}

@-webkit-keyframes notemove {
  0% { top: 0.5rem }
  30% { top: 0.3rem }
  50% { top: 0.5rem }
  80% { top: 0.3rem }
  100% { top: 0.5rem }
}

@keyframes notemove1 {
  0% { top: 0.3rem }
  30% { top: 0.2rem }
  50% { top: 0.3rem }
  80% { top: 0.4rem }
  100% { top: 0.3rem }
}

@-webkit-keyframes notemove1 {
  0% { top: 0.3rem }
  30% { top: 0.2rem }
  50% { top: 0.3rem }
  80% { top: 0.4rem }
  100% { top: 0.3rem }
}

.litem {
  position: absolute;
}

.lpic0 {
  width: 2rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}

.egg2 {
  width: 0.8rem;
  top: 2.3rem;
  left: 0.7rem;
}

.timeoutegg2move {
  animation: linear egg2move 7s infinite;
  -webkit-animation: linear egg2move 7s infinite;
}

@keyframes egg2move {
  0% { top: 2.3rem; left: 0.7rem }
  33% { top: 2.3rem; left: 2.5rem }
  60% { top: 0.8rem; left: 1.7rem }
  100% { top: 2.3rem; left: 0.7rem }
}

@-webkit-keyframes egg2move {
  0% { top: 2.3rem; left: 0.7rem }
  33% { top: 2.3rem; left: 2.5rem }
  60% { top: 0.8rem; left: 1.7rem }
  100% { top: 2.3rem; left: 0.7rem }
}

.lpicul {
  width: 100%;
  height: 100%;
  position: relative;
}

.pic1 {
  width: 0.6rem;
  top: 0.25rem;
  left: 0.25rem;
}

.pic2 {
  width: 1.5rem;
  bottom: 0rem;
  left: 0.05rem;
}

.pic3 {
  width: 0.8rem;
  right: 0.1rem;
  bottom: 0.1rem;
}


</style>
