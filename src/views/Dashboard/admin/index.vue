<template>
	<div class="dashboard-editor-container">
		<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
			<line-chart :chart-data="lineChartData" />
		</el-row>
		<el-row :gutter="32">
			<el-col :lg="8" :sm="24" :xs="24">
				<div class="chart-wrapper">
					<raddar-chart />
				</div>
			</el-col>
			<el-col :lg="8" :sm="24" :xs="24">
				<div class="chart-wrapper">
					<pie-chart />
				</div>
			</el-col>
			<el-col :lg="8" :sm="24" :xs="24">
				<div class="chart-wrapper">
					<bar-chart />
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import LineChart from './components/LineChart'
	import RaddarChart from './components/RaddarChart'
	import PieChart from './components/PieChart'
	import BarChart from './components/BarChart'
	import {
		mapGetters
	} from 'vuex'
	import {
		Message
	} from 'element-ui'

	const lineChartData = {
		newVisitis: {
			expectedData: [100, 120, 161, 134, 105, 160, 165],
			actualData: [120, 82, 91, 154, 162, 140, 145]
		},
		messages: {
			expectedData: [200, 192, 120, 144, 160, 130, 140],
			actualData: [180, 160, 151, 106, 145, 150, 130]
		},
		purchases: {
			expectedData: [80, 100, 121, 104, 105, 90, 100],
			actualData: [120, 90, 100, 138, 142, 130, 130]
		},
		shoppings: {
			expectedData: [130, 140, 141, 142, 145, 150, 160],
			actualData: [120, 82, 91, 154, 162, 140, 130]
		}
	}

	export default {
		name: 'DashboardAdmin',
		components: {
			LineChart,
			RaddarChart,
			PieChart,
			BarChart,
		},
		data() {
			return {
				lineChartData: lineChartData.newVisitis,
				fastRouter: [],
				env: process.env.VUE_APP_BASE_API
			}
		},
		created() {
			Message.success({
				message: `欢迎回来: ${this.name}`
			})
		},
		methods: {
			handleSetLineChartData(type) {
				this.lineChartData = lineChartData[type]
			}
		},
		computed: {
			...mapGetters([
				'name',
				'avatar',
				'roles'
			])
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

		.roles {
			color: #000;
			width: 100px;
			margin: 0 auto;
		}
	}

	@media (max-width: 1024px) {
		.chart-wrapper {
			padding: 8px;
		}
	}

</style>
