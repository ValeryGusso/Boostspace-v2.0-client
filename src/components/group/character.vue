<template>
	<div class="character">
		<p
			data-type="character"
			class="character_class disabled"
			:style="{
				color: isSearched ? 'var(--dark-text)' : setClassColor(type),
				background: isSearched ? setColor : 'none',
			}"
		>
			{{ showClass }}
		</p>
		<keypicker
			v-if="id === $store.state.auth.user.id && type !== '---'"
			@updateData="updateData"
			@changeVisible="togle"
			v-model:show="show.key"
			:id="id"
			:characterType="characterType"
			:options="{ type: 'key', defaultValue: showName, isSearched: isSearched, color: setColor }"
		/>
		<p
			v-else
			:style="{
				background: isSearched ? setColor : 'none',
				color: isSearched ? 'var(--dark-text)' : 'var(--main-text)',
			}"
		>
			{{ showName }}
		</p>
		<keypicker
			v-if="id === $store.state.auth.user.id && type !== '---'"
			@updateData="updateData"
			@changeVisible="togle"
			v-model:show="show.level"
			:id="id"
			:characterType="characterType"
			:options="{ type: 'lvl', defaultValue: showLvl, isSearched: isSearched, color: setColor }"
		/>
		<p
			v-else
			:style="{
				background: isSearched ? setColor : 'none',
				color: isSearched ? 'var(--dark-text)' : 'var(--main-text)',
			}"
		>
			{{ showLvl }}
		</p>
	</div>
</template>

<script>
import { classColors, searchedColors, keyListSelect, lvlListSelect } from '@/assets/constants'
import selectBar from '@/components/UI/select.vue'
import keypicker from './keypicker.vue'

export default {
	data() {
		return {
			keyListSelect,
			lvlListSelect,
			show: { key: false, level: false },
		}
	},
	components: {
		selectBar,
		keypicker,
	},
	methods: {
		setClassColor(className) {
			if (this.searched.includes(this.keyName)) {
				return searchedColors[this.searched.indexOf(this.keyName)]
			}
			if (className === '---') {
				return 'var(--main-text)'
			}
			for (let i = 0; i < classColors.length; i++) {
				if (classColors[i].title.toLowerCase() === className.toLowerCase()) {
					return classColors[i].color
				}
			}
		},
		togle(e) {
			switch (e.type) {
				case 'key':
					if (this.show.level) {
						this.show.level = false
					}
					break
				case 'lvl':
					if (this.show.key) {
						this.show.key = false
					}
					break
			}
		},
		updateData() {
			this.$emit('updateData')
		},
	},
	props: {
		searched: { type: Array },
		characterType: { type: String },
		id: { type: Number },
		type: { type: String },
		keyName: { type: String },
		lvl: { type: String },
	},
	computed: {
		showClass() {
			if (this.searched.length < 1) {
				return this.type
			}
			if (this.isSearched) {
				return this.type
			}
			return '---'
		},
		showName() {
			if (this.searched.length < 1) {
				return this.keyName
			}
			if (this.isSearched) {
				return this.keyName
			}
			return '---'
		},
		showLvl() {
			if (this.searched.length < 1) {
				return this.lvl
			}
			if (this.isSearched) {
				return this.lvl
			}
			return '---'
		},
		setColor() {
			if (this.searched.length < 1) {
				return 'none'
			}
			if (this.isSearched) {
				return searchedColors[this.searched.indexOf(this.keyName)]
			}
			return 'none'
		},
		isSearched() {
			if (this.searched.length < 1) {
				return false /* Было 'none' */
			}
			return this.searched.includes(this.keyName)
		},
	},
}
</script>

<style scoped>
.character {
	display: grid;
	grid-template-columns: 120px 90px 90px;
}
.character > p,
.character > div {
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: 1px solid var(--main-text);
	border-right: 1px solid var(--main-text);
	font-size: 20px;
}
.character > p:last-child,
.character > div:last-child {
	border-right: none;
}
.character > p:first-child {
	border-left: 1px solid var(--main-text);
}
.character_class {
	/* filter: drop-shadow(1px 1px 4px white); */
	color: var(--main-text);
}
.disabled {
	pointer-events: none;
}
</style>
