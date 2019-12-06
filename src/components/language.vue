<template>
  <div id="language">
    <div class="setIcon" @click="toggleMenu">
      <img :src="setIcon" />
    </div>
    <div class="langBox" v-if="drapdown">
      <span ref="English" :class="['langItem', currentLanguage == 'English' ? 'active' : '']" data-id="English" @click="changeLanguage">English</span>
      <span ref="Russian" :class="['langItem', currentLanguage == 'Russian' ? 'active' : '']" data-id="Russian" @click="changeLanguage">Pусский</span>
      <span ref="CN" :class="['langItem', currentLanguage == 'CN' ? 'active' : '']" data-id="CN" @click="changeLanguage">中文</span>
    </div>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex';

import setIcon from "../../static/img/language_set.png";

export default {
  name: "language",
  data() {
    return {
      setIcon,
      drapdown: false,
      currentLanguage: "English"
    }
  },
  methods: {
    toggleMenu() {
      this.drapdown = !this.drapdown;
    },
    changeLanguage(e) {
      console.log(e.target.dataset.id);
      this.currentLanguage = e.target.dataset.id;
      window.localStorage.setItem("language", this.currentLanguage);
      this.$store.dispatch("aieggy/invokeLanguage", this.currentLanguage);
    }
  },
  mounted() {
    if (window.localStorage.getItem("language")) this.currentLanguage = window.localStorage.getItem("language");
    else this.currentLanguage = "English";
  }
}
</script>

<style scoped>
#language {
  font-size: 0;
  width: 100%;
  height: 100%;
}

.setIcon {
  width: 100%;
  height: 100%;
}

.setIcon img {
  display: block;
  width: 100%;
  height: 100%;
} 

.langBox {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 0.16rem;
  top: 1rem;
  right: 50%;
  transform: translateX(50%);
}

.langBox::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border: 0.14rem solid;
  border-bottom-color: rgb(76, 232, 222);
  border-top-color: rgba(76, 232, 222, 0);
  border-left-color: rgba(76, 232, 222, 0);
  border-right-color: rgba(76, 232, 222, 0);
  top: -0.28rem;
}

.langItem {
  position: relative;
  display: inline-block;
  font-size: 0.28rem;
  font-weight: bolder;
  color: #fff;
  width: 1.8rem;
  padding: 0.24rem 0.30rem;
  text-align: left;
  background: rgb(76, 232, 222);
  word-break: break-all;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  box-sizing: border-box;
}

.langItem:first-child {
  border-top-left-radius: 0.16rem;
  border-top-right-radius: 0.16rem;
  border-top-width: 0;
}

.langItem:last-child {
  border-bottom-left-radius: 0.16rem;
  border-bottom-right-radius: 0.16rem;
  border-bottom-width: 0px;
}

.active {
  background: rgb(6, 196, 183);
}

.active::before {
  content: "";
  display: inline-block;
  position: absolute;
  width: 0.1rem;
  height: 0.1rem;
  top: 50%;
  transform: translate(-0.16rem, -50%);
  border-radius: 50%;
  background: #fff;
}

</style>


