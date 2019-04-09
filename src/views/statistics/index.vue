<template>
  <div class="statistics">
    <div class="menu_title">统计报表</div>
    <div>
      <div class="top-bar">API调用情况</div>
      <el-row>
        <el-col :span="6" class="left">
          <!-- <h5>自定义颜色</h5> -->
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            text-color="#000"
            active-text-color="#ffd04b"
            @select="handleSelect"
          >
            <el-menu-item index="1">
              <div slot="title">
                <div class="tit">总调用量</div>
                <div> <span class="num">2568</span> <span class="tb">同比</span> <span class="green">+12.7%</span></div>
              </div>
            </el-menu-item>
            <el-menu-item index="2">
              <div slot="title">
                <div class="tit">数据上传</div>
                <div> <span class="num">2568</span> <span class="tb">同比</span> <span class="green">+12.7%</span></div>
              </div>
            </el-menu-item>
            <el-menu-item index="3">
              <div slot="title">
                <div class="tit">数据查询</div>
                <div> <span class="num">2568</span> <span class="tb">同比</span> <span class="orange">-12.7%</span></div>
              </div>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="18" class="right">
          <div class="chart-t">近一周API总调用情况</div>
          <div class="date-btns">
            <ul>
              <li>今天</li>
              <li>昨天</li>
              <li class="active">近一周</li>
              <li>近一月</li>
              <li>近一年</li>
            </ul>
          </div>
          <div id="myChart"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
    import echarts from 'echarts';
    export default{
        data(){
            return {
                apiData: [295,666,444,858,654,236,645]
            }
        },
        components:{
        },
        mounted(){
            this.drawChart();
        },
        methods:{
            drawChart(){
                let myChart = echarts.init(document.getElementById('myChart'));
                let option = {
                    tooltip : {
                        trigger: 'axis',
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['10-23周日','10-24周一','10-25周二','10-26周三','10-27周四','10-28周五','10-29周六'],
                            axisTick: {show: false},
                            axisLine: {color:'rgba(224, 228, 234, 1)'},
                            boundaryGap: false,  //图表从零刻度开始
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLine: {show:false},
                            axisTick: {show:false},
                            //网格样式
                            splitLine: {
                                show: true,
                                lineStyle:{
                                    color: ['rgba(224, 228, 234, 1)'],
                                    width: 1,
                                    type: 'dashed'
                                }
                            }
                        }
                    ],
                    lineStyle:{
                        color:'#0087ED'
                    },
                    itemStyle:{
                        color:'#0087ED'
                    },
                    series : [
                        {
                            name:'API调用量',
                            type:'line',
                            smooth: true,
                            areaStyle:{
                                color:{
                                    type:'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(0, 111, 237, 0.12)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgba(255, 255, 255, 0)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            },
                            data: this.apiData
                        }
                    ]
                };
                myChart.setOption(option);

                //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
                window.addEventListener('resize',function() {myChart.resize()});
            },
            handleSelect(key,keyPath){
                console.log(key, keyPath)
                if(key == 1){
                    this.apiData = [295,666,444,858,654,236,645]
                }else if(key == 2){
                    this.apiData = [645,546,846,225,547,356,56]
                }else if(key == 3){
                    this.apiData = [234,123,546,123,783,308,490]
                }
                this.drawChart();
            }
        }
    }
</script>
<style lang="less" scoped>
@import '../../assets/css/statistics.less';
</style>