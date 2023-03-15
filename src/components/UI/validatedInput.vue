<template>
	<div class="container">
		<input
			@focus="focus"
			@blur="blur"
			ref="input"
			:class="{ focus: isActive, input__error: options.isError }"
			:type="showPass || options.type === 'text' ? 'text' : 'password'"
			:tabindex="options.tabindex"
			:style="{ paddingRight: options.type === 'password' ? '45px' : '' }"
			:value="$attrs.value"
			@input="change"
		/>
		<inline-svg @click="click" class="icon" :src="options.image" />
		<inline-svg
			v-if="options.type === 'password'"
			@click="setPassVisible"
			class="eye"
			:src="showPass ? eyeOffImage : eyeImage"
		/>
		<p @click="click" :class="isActive ? 'active' : ''" class="placeholder">{{ options.placeholder }}</p>
		<p class="error" v-if="options.isError">{{ options.errorMessage }}</p>
	</div>
</template>

<script>
import inlineSvg from 'vue-inline-svg'
import eyeImage from '@/assets/img/eye.svg'
import eyeOffImage from '@/assets/img/eye_off.svg'

export default {
	data() {
		return {
			showPass: false,
			isActive: false,
			eyeImage,
			eyeOffImage,
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
		setPassVisible() {
			this.$refs.input.focus()
			this.showPass = !this.showPass
			// if (this.isActive) {
			// 	this.$refs.input.focus()
			// }
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
	width: 400px;
	height: 60px;
	position: relative;
	display: flex;
}
.container > input {
	width: 400px;
	height: 60px;
	padding-left: 35px;
	padding-top: 15px;
	background: none;
	border: none;
	outline: none;
	color: var(--main-text);
	font-size: 26px;
	border-radius: 5px;
	border: 4px solid transparent;
	border-bottom: 4px solid var(--main-text);
	transition: var(--fast-transition);
}
.input__error {
	background: rgba(233, 72, 85, 0.4) !important;
	border: 4px solid var(--error) !important;
}
.focus {
	color: var(--dark-text) !important;
	background: var(--main-text) !important;
}
.placeholder {
	position: absolute;
	left: 50px;
	top: calc(50% - 13px);
	color: var(--main-text);
	font-size: 26px;
	border-radius: 5px;
	transition: 0.5s;
	user-select: none;
	cursor: text;
}
.active {
	top: -20px !important;
	left: 25px !important;
	padding: 3px 10px;
	font-size: 20px;
	border: 2px solid var(--main-text);
	background: var(--dark-text);
}
.eye {
	position: absolute;
	top: calc(50% - 18px);
	left: 357px;
	width: 36px;
	height: 36px;
	cursor: pointer;
	filter: invert(1);
	transition: var(--fast-transition);
	user-select: none;
}
.focus ~ .eye {
	filter: none;
}
.icon {
	position: absolute;
	top: 12px;
	left: 5px;
	width: 30px;
	height: 30px;
	filter: invert(1);
	user-select: none;
	transition: var(--fast-transition);
}
.focus ~ .icon {
	filter: none;
}
.error {
	position: absolute;
	top: 62px;
	font-size: 20px;
	color: var(--error);
}
</style>
