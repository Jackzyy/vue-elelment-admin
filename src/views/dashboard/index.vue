<template>
  <div class="dashboard">
    <el-row :gutter="20" class="data-info">
      <el-col :span="6">
        <el-card>
          <div class="card-content">
            <div class="card-info">
              <count-to
                class="color-green"
                :startVal="startVal"
                :endVal="89213"
                :duration="2000"
              ></count-to>
              <span>Total Visitors</span>
            </div>
            <i class="el-icon-user color-green"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-content">
            <div class="card-info">
              <count-to
                class="color-blue"
                :startVal="startVal"
                :endVal="31241"
                :duration="2000"
              ></count-to>
              <span>Total Visitors</span>
            </div>
            <i class="el-icon-goods color-blue"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-content">
            <div class="card-info">
              <count-to
                class="color-red"
                :startVal="startVal"
                :endVal="31243"
                :duration="2000"
              ></count-to>
              <span>Total Visitors</span>
            </div>
            <i class="el-icon-camera color-red"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-content">
            <div class="card-info">
              <count-to
                class="color-green2"
                :startVal="startVal"
                :endVal="32424"
                :duration="2000"
              ></count-to>
              <span>Total Visitors</span>
            </div>
            <i class="el-icon-bell color-green2"></i>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <ECharts :options="lineOptions" height="400px"></ECharts>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="14">
        <el-card>
          <el-table :data="tableList" width="100%">
            <el-table-column prop="id" label="ID" sortable width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="price" label="价格" width="100">
            </el-table-column>
            <el-table-column prop="quantity" label="数量" width="100">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.status }} </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card>
          <ECharts :options="pieOptions"></ECharts>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <ECharts :options="barOptions" height="400px"></ECharts>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ECharts from './components/ECharts'
import CountTo from 'vue-count-to'
import { getTableList } from '@/api/dashboard'
export default {
  components: {
    ECharts,
    CountTo
  },

  data() {
    return {
      startVal: 0,
      tableList: [],
      pieOptions: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Vue', 'js', 'html', 'css', 'webpack', 'node']
        },
        series: [
          {
            name: 'technology stack',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 120],
            center: ['50%', '42%'],
            data: [
              { value: 40, name: 'Vue' },
              { value: 35, name: 'js' },
              { value: 20, name: 'html' },
              { value: 10, name: 'css' },
              { value: 8, name: 'webpack' },
              { value: 5, name: 'node' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      },
      lineOptions: {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      barOptions: {
        title: {
          text: '某地区蒸发量和降水量',
          subtext: '纯属虚构'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['蒸发量', '降水量']
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月'
            ]
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '蒸发量',
            type: 'bar',
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }]
            }
          },
          {
            name: '降水量',
            type: 'bar',
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ],
            markPoint: {
              data: [
                { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
                { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }]
            }
          }
        ]
      }
    }
  },

  async created() {
    this.tableList = (await getTableList()).data.tableList
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.dashboard {
  .color-green {
    color: #40c9c6 !important;
  }
  .color-blue {
    color: #36a3f7 !important;
  }
  .color-red {
    color: #f4516c !important;
  }
  .color-green2 {
    color: #34bfa3 !important;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .data-info {
    i {
      font-size: 50px;
    }
    .card-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .card-info {
      display: flex;
      flex-direction: column;
      span:nth-child(1) {
        font-size: 24px;
        font-weight: 800;
      }
      span:nth-child(2) {
        font-size: 14px;
        padding: 12px 0;
      }
    }
  }
}
</style>
