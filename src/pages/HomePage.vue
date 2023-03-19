<template>
	<div class="container">
		<div class="keys" v-if="!$store.state.players.loading">
			<div class="title table__title">
				<p>Group / name</p>
				<p>Main</p>
				<p>1st</p>
				<p>2nd</p>
				<p>3rd</p>
			</div>
			<group-module
				v-for="group in $store.state.players.groupList"
				@updateData="updateData"
				:group="group.toString()"
				:searched="searched"
				:key="group"
			/>
		</div>
		<div v-else>Идёт загрузка</div>
		<key-finder @setSearched="setSearched" :searched="searched" />
	</div>
</template>

<script>
import GroupModule from '@/components/group/group.vue'
import keyFinder from '@/components/UI/keyFinder.vue'
import editMenu from '@/components/group/editMenu.vue'

export default {
	data() {
		return {
			searched: [],
		}
	},
	methods: {
		setSearched(item) {
			if (!this.searched.includes(item)) {
				this.searched.push(item)
			} else {
				this.searched = this.searched.filter(el => el !== item)
			}
		},
		updateData() {
			this.$emit('updateData')
		},
	},
	mounted() {
		this.$store.dispatch('players/getPlayers')
	},
	components: {
		GroupModule,
		keyFinder,
		editMenu,
	},
}
</script>

<style scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	column-gap: 50px;
	user-select: none;
}
.keys {
	display: flex;
	flex-direction: column;
}
.title {
	width: 100%;
	display: grid;
	grid-template-columns: 1fr repeat(4, 300px);
	align-items: center;
	justify-items: center;
	margin-bottom: 5px;
}
.title > p {
	width: 100%;
	padding: 15px 0;
	text-align: center;
	color: var(--main-text);
	font-size: 32px;
}
</style>
