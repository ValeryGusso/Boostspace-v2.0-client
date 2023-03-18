<template>
	<div class="container">
		<textarea
			@focus="focus"
			@blur="blur"
			ref="input"
			:class="{ focus: isActive, input__error: options.isError }"
			:tabindex="options.tabindex"
			:value="$attrs.value"
			@input="change"
		></textarea>
		<p
			@click="click"
			:class="{ placeholder: true, active: isActive }"
			:style="{ '--ratio': options.direction === 'center' ? '-20px' : '-160px' }"
		>
			<inline-svg class="icon" :src="options.image" />{{ options.placeholder }}
		</p>
		<p class="error" v-if="options.isError">{{ options.errorMessage }}</p>
	</div>
</template>

<script>
import inlineSvg from 'vue-inline-svg'

export default {
	data() {
		return {
			isActive: false,
		}
	},
	methods: {
		blur() {
			if (!this.$attrs.value) {
				this.isActive = false
			}
		},
		focus() {
			this.isActive = true
			this.$emit('setFocus')
		},
		click() {
			if (!this.isActive) {
				this.$refs.input.focus()
			}
			this.isActive = true
		},
		change(e) {
			this.$emit('update:value', e.target.value)
		},
	},
	components: {
		inlineSvg,
	},
	props: {
		options: { type: Object },
	},
}
</script>

<style scoped>
.container {
	position: relative;
	width: 400px;
	/* height: 100%; */
	height: 60px;
	display: flex;
}
.container > textarea {
	width: 400px;
	height: 60px;
	padding-left: 5px;
	padding-top: 17px;
	padding-right: 5px;
	background: none;
	border: none;
	outline: none;
	color: var(--main-text);
	resize: none;
	font-size: 22px;
	border: 4px solid transparent;
	border-bottom: 4px solid var(--main-text);
	transition: var(--fast-transition);
}
.input__error {
	background: rgba(233, 72, 85, 0.4) !important;
	border: 4px solid var(--error) !important;
}
.focus {
	border-radius: 10px;
	height: 330px !important;
	color: var(--dark-text) !important;
	background: var(--main-text) !important;
}
.placeholder {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	column-gap: 10px;
	left: 50px;
	top: calc(50% - 13px);
	color: var(--main-text);
	font-size: 26px;
	border-radius: 5px;
	user-select: none;
	cursor: text;
	transition: var(--fast-transition);
}
.active {
	top: var(--ratio);
	left: 25px !important;
	padding: 3px 10px;
	font-size: 20px;
	border: 2px solid var(--main-text);
	background: var(--dark-text);
}
.icon {
	width: 30px;
	height: 30px;
	filter: invert(1);
	user-select: none;
	transition: var(--fast-transition);
}
.focus ~ p > .icon {
	transform: scale(0.85);
}
.error {
	position: absolute;
	top: 202px;
	font-size: 20px;
	color: var(--error);
}
</style>
