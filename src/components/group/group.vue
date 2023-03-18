<template>
	<div class="group">
		<div class="group__number">
			<p>{{ group }}</p>
		</div>
		<div class="group__data table">
			<div v-for="user in getGroup(group)" class="group__row" :key="user.id">
				<div class="group__names">
					<p>
						{{ user.nickname }}
					</p>
				</div>
				<div v-for="character in user.charList" class="group__character" :key="character.type">
					<character-module
						@updateData="updateData"
						:searched="searched"
						:id="user.id"
						:characterType="character.type"
						:type="character.class || '---'"
						:keyName="character.key || '---'"
						:lvl="
							character.lvl ? (typeof character.lvl === 'number' ? character.lvl.toString() : character.lvl) : '---'
						"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import characterModule from './character.vue'
import { classColors } from '@/assets/constants'

export default {
	data() {
		return {
			classColors,
		}
	},
	methods: {
		getGroup(number) {
			const data = this.$store.state.players.data.filter(el => el.group == number)
			return data
		},
		updateData() {
			this.$emit('updateData')
		},
	},
	props: {
		group: { type: String },
		searched: { type: Array },
	},
	components: {
		characterModule,
	},
}
</script>

<style scoped>
.group {
	display: flex;
	text-align: center;
}
.group__row {
	display: flex;
}
/* .group__row:nth-child(2n) {
	background: linear-gradient(45deg, var(--bg-second), var(--bg-dark));
}
.group__row:nth-child(2n + 1) {
	background: linear-gradient(45deg, var(--bg-dark), var(--bg-second));
} */
.group__names {
	display: flex;
	flex-direction: column;
}
.group__names > p {
	height: 100%;
	width: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: 1px solid var(--main-text);
	font-size: 22px;
	color: var(--main-text);
}
.group__number {
	padding: 0 20px;
	display: flex;
	align-items: center;
	font-size: 52px;
	border-right: 1px solid var(--main-text);
	border-bottom: 1px solid var(--main-text);
	color: var(--main-text);
	/* background: linear-gradient(0deg, var(--bg-dark), var(--bg-second)); */
	background: var(--bg-opacity-first);
}
.group__character {
	display: flex;
	flex-direction: column;
}
</style>
