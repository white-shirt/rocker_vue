<template>
  <div class="navlist">
    <toindex></toindex>
  </div>
</template>

<script>
import toindex from "components/toindex.vue";

export default {
  name: "navbox",
  data() {
    return {
    }
  },
  components: { toindex }
}
</script>

<style scoped>
.navlist {
  width: auto;
  height: auto;
}
</style>

