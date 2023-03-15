<template>
	<div @click="click" class="checkbox">
		<p :class="{ active: $attrs.modelValue }">{{ $attrs.modelValue ? '✓' : '✘' }}</p>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		click() {
			this.$emit('update:modelValue', !this.$attrs.modelValue)
		},
	},
}
</script>

<style scoped>
.checkbox {
	width: 50px;
	height: 50px;
	display: flex;
	/* align-items: center; */
	justify-content: center;
	font-size: 32px;
	border: 3px solid var(--main-text);
	border-radius: 10px;
	cursor: pointer;
	user-select: none;
	transition: var(--fast-transition);
	background: var(--dark-text);
}
.checkbox:hover {
	border: 3px solid var(--active-text);
}
.checkbox > p {
	color: var(--red-text);
	font-weight: bold;
}
.active {
	color: var(--green-text) !important;
}
</style>
