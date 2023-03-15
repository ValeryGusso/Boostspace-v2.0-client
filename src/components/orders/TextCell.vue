<template>
	<div @dblclick="togle" v-if="!isEdit">
		{{ value }}
	</div>
	<input ref="input" @blur="togle" v-else :type="type" :value="curValue" />
</template>

<script>
export default {
	data() {
		return {
			isEdit: false,
			curValue: this.value,
		}
	},
	props: {
		value: {
			type: [String, Number],
		},
		type: {
			type: String,
		},
	},
	methods: {
		togle() {
			if (!this.isEdit) {
				// this.$refs.input.focus()
			}
			this.isEdit = !this.isEdit
		},
	},
}
</script>

<style></style>
