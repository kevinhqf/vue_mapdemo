import Vue from 'vue'
import Router from 'vue-router'
import VueAMap from 'vue-amap'
import MapDemo from '@/components/MapDemo'

Vue.use(VueAMap)
Vue.use(Router)

VueAMap.initAMapApiLoader({
  // 高德的key
  key: '3031a81ac3a04c011db7e79c08d68905',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Driving'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MapDemo',
      component: MapDemo
    }
  ]
})
