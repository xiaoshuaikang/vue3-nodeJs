<template>
  <div class="container">
    <div class="container-left"></div>
    <div id="container-center-map" class="container-center"></div>
    <div class="container-right"></div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from './stores/counter'
import { onMounted } from 'vue'
import * as echarts from 'echarts'
import './assets/china'
import { geoCoordMap } from '@/assets/geoMap'

const store = useCounterStore()

onMounted(async () => {
  await store.getList()
  console.log(store.list)
  store.list.data.map((idx) => {
    // console.log(idx, 'idx')
  })

  const chartMap = echarts.init(document.querySelector('#container-center-map') as HTMLElement)
  const data = [
    {
      name: '内蒙古',
      itemStyle: {
        areaColor: '#56b1da'
      },
      value: [110.3467, 41.4899]
    }
  ]

  chartMap.setOption({
    geo: {
      map: 'china',
      aspectScale: 0.8,
      layoutCenter: ['50%', '50%'],
      layoutSize: '120%',
      itemStyle: {
        areaColor: {
          type: 'linear-gradient',
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#152E6E' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#0673AD' // 50% 处的颜色
            }
          ],
          global: true // 缺省为 false
        },
        shadowColor: '#0f5d9d',
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5
      },
      emphasis: {
        areaColor: '#0f5d9d'
      },

      regions: [
        {
          name: '南海诸岛',
          itemStyle: {
            areaColor: 'rgba(0, 10, 52, 1)',
            borderColor: 'rgba(0, 10, 52, 1)',
            opacity: 0,
            label: {
              show: false,
              color: '#009cc9'
            }
          },
          label: {
            show: false,
            color: '#FFFFFF',
            fontSize: 12
          }
        }
      ]
    },
    series: [
      {
        type: 'map',
        selectedMode: 'multiple',
        map: 'china',
        aspectScale: 0.8,
        layoutCenter: ['50%', '50%'], //地图位置
        layoutSize: '120%',
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2
        },
        label: {
          show: true,
          color: '#FFFFFF',
          fontSize: 12
        },
        itemStyle: {
          areaColor: '#0c3653',
          borderColor: '#1cccff',
          borderWidth: 1.8
        },
        emphasis: {
          areaColor: '#56b1da',
          label: {
            show: true,
            color: '#fff'
          }
        },
        data: data
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin',
        symbolSize: [145, 100],
        label: {
          show: true
        },
        itemStyle: {
          color: '#37d83f' //标志颜色
        },
        data: data
      }
    ]
  })
})
</script>

<style scoped lang="less">
.container {
  height: 100%;
  display: flex;
  background-image: url('@/assets/background.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  &-left {
    width: 400px;
  }
  &-center {
    flex: 1;
  }
  &-right {
    width: 400px;
  }
}
</style>