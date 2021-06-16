<template>
	<div>
		<div class="btn-group" style="width: 95%;margin: 20px auto">
			<div class="filter" style="margin-top: 20px;display: flex">
				<el-button icon="el-icon-plus" plain size="mini" type="primary" @click="[dialogFormVisibleAdd = true]">添加
				</el-button>
				<div style="width: 860px;margin-left: 30px">
					<el-input v-model="key.title" placeholder="搜索标题" size="mini" style="width: 300px;margin-right: 20px" @keyup.enter.native="searchTitle">
						<el-button slot="append" icon="el-icon-search" size="mini" style="background: #309CFF;color: #FFFFFF;border-radius: 0 !important;" @click="searchTitle"/>
					</el-input>
				</div>
			</div>
		</div>
		<!-- 表格主体 -->
		<el-table v-loading="tableLoad" :data="tableData" border style="width: 95%;margin:20px auto">
			<el-table-column :show-overflow-tooltip="true" align="center" label="id" prop="id" sortable width="120px"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" align="center" label="标题" prop="title" width="620px"></el-table-column>
			<el-table-column :show-overflow-tooltip="true" align="center" label="作者" prop="author" sortable width="180px">
				<template slot-scope="scope">
					<el-tag type="success">{{ scope.row.author == undefined ? '暂无作者' : '无' }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column :show-overflow-tooltip="true" align="center" label="创建时间" prop="display_time" sortable width="180px">
				<el-tag type="success">{{ new Date().toLocaleDateString() }}</el-tag>
			</el-table-column>
			<el-table-column align="center" label="操作">
				<template slot-scope="scope">
					<el-button icon="el-icon-edit" plain size="mini" type="primary" @click="[diagEdit = true,formc = scope.row]">
						编辑
					</el-button>
					<el-popconfirm cancel-button-text="取消删除" cancel-button-type="info" confirm-button-text="确认删除" confirm-button-type="danger" icon="el-icon-info" icon-color="red" style="margin-left:10px;" title="确认删除?" @confirm="btnDelete(scope.row.id)">
						<el-button slot="reference" icon="el-icon-delete" plain size="mini" type="danger">
							删除
						</el-button>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>

		<!-- 编辑弹框 -->
		<el-dialog :visible.sync="diagEdit" title="编辑信息" width="50%">
			<el-form ref="form" v-loading="loadAddForm" :model="formc" label-width="80px">
				<el-form-item label="标题">
					<el-input v-model="formc.title" placeholder="请输入标题"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="diagEdit = false">取 消</el-button>
				<el-button type="primary" @click="confirmEdit">确 定</el-button>
			</span>
		</el-dialog>
		<!--添加		-->
		<el-dialog :visible.sync="dialogFormVisibleAdd" title="添加信息" width="50%">
			<el-form ref="form" v-loading="loadAddForm" :model="form" label-width="80px">
				<el-form-item label="标题">
					<el-input v-model="form.title" placeholder="请输入标题"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
				<el-button type="primary" @click="confirmAdd(form)">确 定</el-button>
			</span>
		</el-dialog>


		<el-pagination :current-page='key.page' :page-size="key.sizes" :page-sizes="[5,10,15,20]" :total="total" background layout="total, sizes, prev, pager, next, jumper" style="width: 95%;margin: 0 auto" @size-change="sizeChange" @current-change="currentChange"></el-pagination>
	</div>
</template>

<script>
import * as table from '@/api/table'
import {
	Message
} from 'element-ui'

export default {
	name:'Table',
	watch:{
		"key.title":{
			handler(a){
				if(a == ''){
					this.fetchData()
				}
			}
		}
	},
	data(){
		return {
			tableData:[],
			diagEdit:false,
			dialogFormVisibleAdd:false,
			form:{
				title:null
			},
			formc:[],

			total:1,
			tableLoad:true,
			loadAddForm:false,
			layout:'total,sizes, prev, pager, next, jumper',

			key:{
				title:null,
				page:1,
				sizes:10
			}
		}
	},
	methods:{
		sizeChange(e){
			this.key.sizes = e
			this.fetchData()
		},
		currentChange(e){
			this.key.page = e
			this.fetchData()
		},
		// 确认编辑
		async confirmEdit(){
			await table.update(this.formc).then(() => {
				Message.success({
					message:'修改成功'
				})
				this.fetchData()
				this.diagEdit = false
			})
		},
		// 删除
		btnDelete(id){
			this.tableLoad = true
			this.confirmDelete(id)
		},
		async confirmDelete(id){
			await table.deleteCow(id).then(() => {
				Message.info({
					message:'删除成功'
				})
				this.fetchData()
			})
		},

		// 添加
		async confirmAdd(form){
			this.loadAddForm = true
			await table.add(form).then(() => {
				Message.success({
					message:'添加成功'
				})
				this.dialogFormVisibleAdd = false
				this.loadAddForm = false
				this.fetchData()
			})
		},

		// 获取信息
		async fetchData(){
			this.tableLoad = true
			await table.fetchList(this.key).then((response) => {
				this.tableData = response.data.list
				this.total = response.data.allTotal
				setTimeout(() => {
					this.tableLoad = false
				}, 500)
			}).catch(() => {
				Message.error({
					message:'获取信息失败'
				})
			})
		},
		// 搜索标题
		async searchTitle(){
			this.tableLoad = true
			await table.fetchList(this.key).then((response) => {
				this.tableData = response.data.list
				this.total = response.data.total
				setTimeout(() => {
					this.tableLoad = false
				}, 500)
			}).catch(() => {
				Message.error({
					message:'获取信息失败'
				})
			})
		},
		// 编辑
		editInfo(){
			this.diagEdit = true
		}
	},
	created(){
		this.fetchData()
	}
}

</script>

<style>

</style>
