<template>
	<div class="group">
		<p class="group__title"><span>Группа: </span>{{ group }}</p>
		<inline-svg
			@click="changeGroup('inc')"
			class="group__icon group__icon__up"
			:src="triangle"
			:class="{ group__icon__error: group === 9 }"
		/>
		<inline-svg
			@click="changeGroup('dec')"
			class="group__icon group__icon_down"
			:src="triangle"
			:class="{ group__icon__error: group === 0 }"
		/>
	</div>
</template>

<script>
import triangle from '@/assets/img/triangle.svg'
import inlineSvg from 'vue-inline-svg'
export default {
	data() {
		return {
			triangle,
			group: this.$attrs.modelValue,
		}
	},
	components: {
		inlineSvg,
	},
	methods: {
		changeGroup(type) {
			switch (type) {
				case 'inc':
					if (this.group < 9) {
						this.group++
						this.$emit('update:modelValue', this.group)
					}
					break
				case 'dec':
					if (this.group > 0) {
						this.group--
						this.$emit('update:modelValue', this.group)
					}
					break
				default:
					break
			}
		},
	},
}
</script>

<style scoped>
.group {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}
.group__title {
	font-size: 56px;
	color: var(--main-text);
	font-weight: bold;
	/* cursor: pointer; */
	user-select: none;
}
.group__title > span {
	font-size: 32px;
}
.group__icon {
	position: absolute;
	left: calc(50% + 85px);
	width: 28px;
	height: 28px;
	cursor: pointer;
	fill: var(--main-text);
	transition: var(--fast-transition);
}
.group__icon__up {
	top: 2px;
}
.group__icon_down {
	top: 34px;
	transform: rotateX(180deg);
}
.group__icon:hover {
	fill: var(--active-text);
}
.group__icon__error:hover {
	fill: var(--error);
}
</style>
