<template>
  <div id="color">
    <ul class="colorul">
      <li :class="['colorlist', active == item.id ? 'active' : 'unactive']" v-for="item in color" :key="item.id" @touchstart="chooseColor(item.id)"></li>
    </ul> 
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex';
export default {
  name: "color",
  data() {
    return {
      color: [
        { "color": "rgb(243, 70, 68)", "id": "1" },
        { "color": "rgb(255, 157, 0)", "id": "2" },
        { "color": "rgb(255, 221, 0)", "id": "3" },
        { "color": "rgb(114, 205, 112)", "id": "4" },
        { "color": "rgb(0, 171, 181)", "id": "5" },
        { "color": "rgb(6, 68, 159)", "id": "6" },
        { "color": "rgb(145, 66, 187)", "id": "7" }
      ],
      active: null
    }
  },
  methods: {
    chooseColor: function (id) {
      var _this = this;
      _this.active = id;
      _this.$store.dispatch("aieggy/invokeSendOrder", [60, 3, id, 0, 62]);
    }
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

#color {
  width: 100%;
  height: 100%;
}
.colorul {
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.colorlist {
  position: relative;
  width: 0.59rem;
  height: 0.53rem;
}

.active {
  transform-origin: center;
  transform: scale(1.1);
  -webkit-transform-origin: center;
  -webkit-transform: scale(1.1)
}

.unactive {
  transform: scale(1);
  -webkit-transform: scale(1);
}

.colorlist:nth-child(1) {
  background: url("../../static/img/color/red.png") no-repeat center;
  background-size: 100%; 
}

.colorlist:nth-child(2) {
  background: url("../../static/img/color/orange.png") no-repeat center;
  background-size: 100%; 
}

.colorlist:nth-child(3) {
  background: url("../../static/img/color/yellow.png") no-repeat center;
  background-size: 100%; 
}

.colorlist:nth-child(4) {
  background: url("../../static/img/color/green.png") no-repeat center;
  background-size: 100%; 
}

.colorlist:nth-child(5) {
  background: url("../../static/img/color/cyan.png") no-repeat center;
  background-size: 100%; 
}

.colorlist:nth-child(6) {
  background: url("../../static/img/color/blue.png") no-repeat center;
  background-size: 100%; 
}

.colorlist:nth-child(7) {
  background: url("../../static/img/color/purple.png") no-repeat center;
  background-size: 100%; 
}

</style>
