<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner"/>
    <panel-group @handleSetLineChartData="handleSetLineChartData"/>
    <el-row :gutter="8">
      <el-col :lg="{span: 6}" :md="{span: 12}" :sm="{span: 12}" :xl="{span: 6}" :xs="{span: 24}" style="margin-bottom:30px;">
        <todo-list/>
      </el-col>
      <el-col :lg="{span: 6}" :md="{span: 12}" :sm="{span: 12}" :xl="{span: 6}" :xs="{span: 24}" style="margin-bottom:30px;">
        <box-card/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

const lineChartData = {
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    TodoList,
    BoxCard
  },
  data() {
    return {
      // lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
