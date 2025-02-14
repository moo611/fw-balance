<template>

  <div ref="chartRef" style="width: 1000px; height: 400px;"></div>

</template>

<script setup lang="js">
import axios from '../../axios';
import { onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts'

const props = defineProps(['balanceCode'])
const state = reactive({
  data: []
})


// 绑定图表容器的 ref
const chartRef = ref(null)
let chartInstance = null // 用来保存 ECharts 实例

// 初始化图表实例
const initChart = () => {

  chartInstance = echarts.init(chartRef.value)

  const categories = state.data.map(item => item.bus)
  const seriesData = state.data.map(item => item.duration);
  console.log('keys', categories)
  console.log('seriesData', seriesData)

  // 配置 ECharts
  const option = {

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 使用阴影指示器
      }
    },

    xAxis: {
      type: 'category',
      data: categories, // 横轴显示所有试验车次

    },
    yAxis: {
      type: 'value',
      name: '时长'
    },
    series: [
      {
        barWidth: "20%", //调整柱状图宽度
        type: 'bar',
        name: '试验时长',
        data: seriesData
      },
    ]
  };

  // 更新图表

  chartInstance.setOption(option);




}



const getData = () => {


  axios.get('balanceInfo/count/' + props.balanceCode).then(res => {
    state.data = res
    initChart()
  })


}


// 在组件挂载时初始化图表
onMounted(() => {

  getData() // 示例：默认请求整个年份的数据
})
</script>

<style lang="css" scoped></style>