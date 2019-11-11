<template>
  <div id="power">
    <canvas id="powercanvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "power",
  data() {
    return {
      canvasEle: "",
      ctx: "",
      canvasW: "",
      canvasH: ""
    };
  },
  methods: {
    draw: function() {
      var _this = this;
      var canvas = _this.canvasEle,
        ctx = _this.ctx,
        width = _this.canvasW,
        height = _this.canvasH;

      var A = 10,
        W = 1 / 30,
        Q = 0,
        H = height / 4;

      var A2 = 15,
        W2 = 1 / 40,
        Q2 = 0,
        H2 = height / 5;

      var speed = -0.06;
      var speed2 = -0.04;

      var lingrad = ctx.createLinearGradient(0, 0, width, 0);
      lingrad.addColorStop(0, "rgba(0,186,128,0.6)");
      lingrad.addColorStop(1, "rgba(111,224,195,1)");

      var lingrad2 = ctx.createLinearGradient(0, 0, width, 0);
      lingrad2.addColorStop(0, "rgba(111,224,195,1)");
      lingrad2.addColorStop(1, "rgba(0,186,128,0.5)");
      function drawSin() {
        window.requestAnimationFrame(drawSin);
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.fillStyle = lingrad;
        ctx.lineWidth = 1;
        ctx.moveTo(0, height / 2);

        Q += speed;

        for (let x = 0; x <= width; x++) {
          var s = 0.1 * Math.sin(x / 150) + 1;
          var y = A * Math.sin(W * x + Q) + H;
          y = y * s;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.fill();
        //ctx.stroke();
        ctx.closePath();

        ctx.globalCompositeOperation = "destination-over";

        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;
        ctx.fillStyle = lingrad2;

        Q2 += speed2;
        for (let x = 0; x < width; x++) {
          var y = A2 * Math.sin(x * W2 + Q2) + H2;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);

        //ctx.stroke();
        ctx.fill();
        ctx.closePath();
      }
      drawSin();
    }
  },
  mounted: function() {
    var _this = this;
    _this.canvasEle = $("#powercanvas");
    _this.ctx = $("#powercanvas")[0].getContext("2d");
    _this.canvasW = $("#power").width();
    _this.canvasH = $("#power").height();
    _this.canvasEle.css({
      width: _this.canvasW,
      height: _this.canvasH
    });
    if (window.devicePixelRatio) {
      _this.canvasEle.attr("width", _this.canvasW * window.devicePixelRatio);
      _this.canvasEle.attr("height", _this.canvasH * window.devicePixelRatio);
      _this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    _this.draw();
  }
};
</script>

<style scoped>
#power {
  width: 100%;
  height: 100%; 
}

</style>
