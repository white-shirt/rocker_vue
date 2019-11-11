<template>
  <div id="lines">
    <div class="linecanvas">
      <linecanvas v-on:ondisable="isdisable"></linecanvas>
    </div>
    <toindex :disable="disable" class="toidxbox"></toindex>
    <toble :disable="disable" class="toblebox"></toble>
    <!-- <tohelp :disable="disable" class="tohelpbox"></tohelp> -->
    <power1 class="power1"></power1>
    <!-- <device></device> -->
    <maskbox></maskbox>
  </div>
</template>


<script>
import toindex from "components/toindex.vue";
import toble from "components/bluetooth.vue";
import tohelp from "components/help.vue";
import power1 from "components/power1.vue";
import linecanvas from "components/linecanvas.vue";
// import device from "components/device.vue";
import maskbox from "components/maskbox.vue";
export default {
  name: "lines",
  data() { 
    return {
      disable: false
    }
  },
  components: { toindex, toble, tohelp, power1, linecanvas, maskbox },
  methods: {
    isdisable: function (val) {
      this.disable = val  
    }
  },
  mounted() {
  },
}
</script>

<style scoped>
#lines {
  width: 100%;
  height: 100%;
  -webkit-text-size-adjust: none;
  background: rgb(4, 40, 77);
  overflow: hidden;
}

.linecanvas {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
