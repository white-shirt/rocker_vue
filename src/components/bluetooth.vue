<template>
  <button class="toBle" @click="scan">
    <img v-if="BleConnectStatus == true" :src="toBlepic">
    <img v-if="BleConnectStatus == false" :src="bledisconnect">
  </button>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex';
import toBlepic from "../../static/img/toBle.png";
import bledisconnect from "../../static/img/disconnect.png";

export default {
  name: "bluetooth",
  data() {
    return {
      toBlepic,
      bledisconnect,
      BleConnectStatus: false,
      timer: null
    }
  },
  methods: {
    init: function () {
      var _this = this;
      clearInterval(this.timer);
      this.timer = setInterval(function () {
        ble.isEnabled(function () {
          if (cordova.platformId.toLowerCase() == "ios") {
            ble.connectedPeripheralsWithServices(["ae00"], function (device) {
              ble.connect(window.localStorage.getItem("Ble_device_id"), function () {
                _this.BleConnectStatus = true;
              },function () {
                _this.BleConnectStatus = false;  
              })
            }, function () {
              _this.BleConnectStatus = false;
            })
          } else if (cordova.platformId.toLowerCase() == "android") {
            ble.isConnected(window.localStorage.getItem("Ble_device_id"), function () {
              _this.BleConnectStatus = true;
            }, function () {
              _this.BleConnectStatus = false;
            })
          }
        }, function () {
          _this.BleConnectStatus = false;
        })
      }, 1000)
    },
    scan: function () {
      var _this = this;
      var pathname = window.location.pathname.split('/');
      window.location.replace("ble.html?" + pathname[pathname.length - 1]);
    }
  },
  created: function () {
    var _this = this;
  },
  beforeDestroy: function () {
    clearInterval(this.timer);
  },
  mounted: function () {
    this.init();
  },
  computed: {
  },
  watch: {
  }
}
</script>

<style scoped>
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .toBle {
    display: inline-block;
    width: 0.39rem;
    height: 0.39rem;
  }
</style>
