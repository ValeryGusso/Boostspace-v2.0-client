<template>
	<div class="settings__container">
		<div class="personal" data-scroll="true">
			<p class="title">Личная информация.</p>
			<div>
				<div>
					<validated-input
						v-model:value="name.value"
						@setFocus="reset('name')"
						:options="{
							type: 'text',
							tabindex: 1,
							placeholder: 'Имя',
							isError: name.error,
							errorMessage: name.errorMessage,
							image: name.image,
							autocomplete: 'name',
						}"
					/>
					<validated-textarea
						v-model:value="avatar.value"
						@setFocus="reset('avatar')"
						:options="{
							tabindex: 4,
							placeholder: 'Аватар',
							isError: avatar.error,
							errorMessage: avatar.errorMessage,
							image: avatar.image,
							direction: 'center',
						}"
					/>
				</div>
				<div>
					<validated-input
						v-model:value="password.value"
						@setFocus="reset('password')"
						:options="{
							type: 'password',
							tabindex: 2,
							placeholder: 'Пароль',
							isError: password.error,
							errorMessage: password.errorMessage,
							image: password.image,
						}"
					/>
					<validated-input
						v-model:value="confirm.value"
						@setFocus="reset('confirm')"
						:options="{
							type: 'password',
							tabindex: 3,
							placeholder: 'Подтверди пароль',
							isError: confirm.error,
							errorMessage: confirm.errorMessage,
							image: confirm.image,
						}"
					/>
				</div>
			</div>
			<div class="button">
				<button-submit
					:options="{
						width: 40 * vw,
						defaultWidth: 20 * vw,
						tabindex: 4,
						handler: submit,
						prevent: true,
						fontSize: 32,
						text: 'Сохранить!',
						loadingText: 'Идёт отправка',
						isLoading: this.loading,
					}"
				/>
			</div>
		</div>
		<div class="game" data-scroll="true">
			<p class="title">Общая информация.</p>
			<div>
				<select-bar
					v-model="main"
					:options="{
						list: classColors,
						placeholder: 'Main: ',
						defaultValue: getDefValue('main'),
						width: 350,
						columns: 3,
					}"
				/>
				<select-bar
					v-model="first"
					:options="{
						list: classColors,
						placeholder: '1st twink: ',
						defaultValue: getDefValue('first'),
						width: 350,
						columns: 3,
					}"
				/>
			</div>
			<div>
				<select-bar
					v-model="second"
					:options="{
						list: classColors,
						placeholder: '2ns twink: ',
						defaultValue: getDefValue('second'),
						width: 350,
						columns: 3,
					}"
				/>
				<select-bar
					v-model="third"
					:options="{
						list: classColors,
						placeholder: '3rd twink: ',
						defaultValue: getDefValue('third'),
						width: 350,
						columns: 3,
					}"
				/>
			</div>
			<div>
				<select-bar
					v-model="role"
					:options="{
						list: rolesList,
						placeholder: 'Роль: ',
						defaultValue: $store.state.auth.user.role,
						width: 200,
						columns: 1,
						dontShowColor: true,
					}"
				/>
				<group-picker v-model="group" />
			</div>
		</div>
	</div>
</template>

<script>
import userImage from '@/assets/img/user.svg'
import lockImage from '@/assets/img/lock.svg'
import validatedInput from '@/components/UI/validatedInput.vue'
import validatedTextarea from '@/components/UI/validatedTextarea.vue'
import buttonSubmit from '@/components/UI/buttonSubmit.vue'
import selectBar from '@/components/UI/select.vue'
import groupPicker from '@/components/UI/groupPicker.vue'
import inlineSvg from 'vue-inline-svg'
import triangle from '@/assets/img/triangle.svg'
import avatar from '@/assets/img/avatar.svg'
import { classColors, rolesList } from '@/assets/constants'
import { API } from '@/axios/API'

const vw = Math.ceil(window.innerWidth / 100)
export default {
	data() {
		return {
			triangle,
			classColors,
			rolesList,
			vw,
			loading: false,
			name: {
				value: '',
				error: false,
				errorMessage: 'Не менее 3х символов!',
				image: userImage,
			},
			password: {
				value: '',
				error: false,
				errorMessage: 'Пароли должны совпадать!',
				image: lockImage,
			},
			confirm: {
				value: '',
				error: false,
				errorMessage: 'Пароли должны совпадать!',
				image: lockImage,
			},
			avatar: {
				value: '',
				error: false,
				errorMessage: 'Неверные код-приглашение!',
				image: avatar,
			},
			role: '',
			group: this.$store.state.auth.user.group,
			main: '',
			first: '',
			second: '',
			third: '',
		}
	},
	methods: {
		getDefValue(type) {
			let result = ''

			this.$store.state.auth.user?.charList.forEach(character => {
				if (character.type === type) {
					result = character.class
				}
			})

			return result
		},
		reset(type) {
			this[type].error = false
			this[type].errorMessage = ''
		},
		async submit() {
			// Prevalidation
			if (this.name.value && this.name.value.length < 3) {
				this.name.error = true
				this.name.errorMessage = 'Не менее 3х символов'
				return
			}

			if (
				(this.password.value && this.password.value.length < 5) ||
				(this.confirm.value && this.confirm.value.length < 5)
			) {
				this.password.error = true
				this.password.errorMessage = 'Не менее 5 символов!'
				this.confirm.error = true
				this.confirm.errorMessage = 'Не менее 5 символов!'
				return
			}

			if (this.password.value && this.password.value !== this.confirm.value) {
				this.password.error = true
				this.password.errorMessage = 'Пароли должны совпадать!'
				this.confirm.error = true
				this.confirm.errorMessage = 'Пароли должны совпадать!'
				return
			}

			const payload = { id: this.$store.state.auth.user.id, charList: {} }
			if (this.name.value) {
				payload.name = this.name.value
			}
			if (this.password.value.length >= 5 && this.password.value === this.confirm.value) {
				payload.password = this.password.value
			}
			if (this.role !== this.$store.state.auth.user.role) {
				payload.role = this.role
			}
			if (this.group !== this.$store.state.auth.user.group) {
				payload.group = this.group
			}

			const keys = ['main', 'first', 'second', 'third']
			keys.forEach(key => {
				if (this[key]) {
					payload.charList[key] = this[key]
				}
			})

			this.loading = true
			const res = await API.post('/users/player', payload)
			this.loading = false

			if (res.status === 200 && res.data.success) {
				this.$store.commit('auth/setUser', res.data.player)
			}
		},
	},
	components: {
		validatedInput,
		validatedTextarea,
		selectBar,
		inlineSvg,
		buttonSubmit,
		groupPicker,
	},
}
</script>

<style scoped>
.settings__container {
	position: relative;
	width: 100%;
	height: 90vh;
	display: grid;
	grid-template-columns: 50% 50%;
}
.title {
	display: inline;
	width: 100%;
	font-size: 46px;
	color: var(--main-text);
	text-align: center;
	cursor: default;
}
.personal {
	width: 100%;
	padding-top: 5vh;
	display: grid;
	align-items: start;
	justify-content: center;
	grid-template-rows: 10vh 1fr 10vh;
	border-right: 5px dashed var(--main-text);
}
.personal > div {
	display: flex;
	column-gap: 50px;
}
.personal > div > div {
	display: flex;
	flex-direction: column;
	row-gap: 10vh;
}
.button {
	width: 400px;
	display: flex;
	justify-self: center;
	justify-content: center;
}
.game {
	width: 100%;
	padding-top: 5vh;
	display: grid;
	align-items: start;
	justify-content: center;
	grid-template-rows: 10vh repeat(3, 15vh);
}
.game > div {
	display: flex;
	justify-content: space-around;
	align-items: center;
}
</style>
