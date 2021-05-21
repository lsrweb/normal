<template>
	<div class="dashboard-container">
1
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Dashboard',
	data () {
		return {
			currentRole: 'adminDashboard'
		}
	},
	computed: {
		...mapGetters ([
			'roles'
		])
	},
	created () {
		if (!this.roles.includes ('admin')) {
			this.currentRole = 'editorDashboard'
		}
	}
}
</script>
