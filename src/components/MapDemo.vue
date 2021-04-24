<template>
  <div>
    <div id="container" class="amap-wrapper"></div>
    <div class="top">路线规划</div>
    <div class="panel">
      <div style="margin: 10px 10px">南京 -> 北京 路线规划详情</div>
      <div style="margin: 10px 10px">距离:{{distance}}米</div>
      <div style="margin: 10px 10px">时间:{{time}}分钟</div>
    </div>
  </div>
</template>


<script>
import AMap from "AMap";
var map;
var route;
window.onLoad = function () {};
var startMarker = new AMap.Marker({
  icon: require("@/assets/icon_start.png"),
  position: new AMap.LngLat(118.796623, 32.059352),
  offset: new AMap.Pixel(-24, -48),
});
var endMarker = new AMap.Marker({
  icon: require("@/assets/icon_end.png"),
  position:new AMap.LngLat( 116.40742, 39.90417),
  offset: new AMap.Pixel(-24, -48),
});

export default {
  name: "MapDemo",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      zoom: 5,
      plugins: ["AMap.Driving"],
      time:0,
      distance:0
    };
  },
  methods:{
    setRouteInfo:function(time,distance){
      this.time = parseInt(time/60);
      this.distance = distance;
    }
  },
  mounted() {
    map = new AMap.Map("container", {
      zoom: 5, //设置地图显示的缩放级别
      center: [118.796623, 35.059352], //设置地图中心点坐标
    });
    //map.add(startMarker);
    //map.add(endMarker);
    var ref = this
    map.on("complete", function () {
      // 地图图块加载完成后触发
      AMap.plugin("AMap.Driving", function () {
        var driving = new AMap.Driving({
          // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
          policy: AMap.DrivingPolicy.LEAST_TIME,
          map:map
        });

        var startLngLat = [118.796623, 32.059352];
        var endLngLat = [116.40742, 39.90417];

        driving.search(startLngLat, endLngLat, function (status, result) {
          // 未出错时，result即是对应的路线规划方案
          route = result.routes[0]
          ref.setRouteInfo(route.time,route.distance)
          console.log("search", result.routes[0]);
        });
      });
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.top {
  padding: 10px 10px;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: white;
}
.panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 20%;
  background-color: white;
}

.amap-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
