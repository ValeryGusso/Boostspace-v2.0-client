<template>
	<div class="container">
		<form action="submit">
			<p class="form__title">{{ isActivate ? 'Activation' : 'Registration' }}</p>
			<div v-if="!isActivate" class="inputs">
				<div>
					<validated-input
						v-model:value="login.value"
						@setFocus="reset('login')"
						:options="{
							type: 'text',
							tabindex: 1,
							placeholder: 'Email',
							isError: login.error,
							errorMessage: login.errorMessage,
							image: login.image,
						}"
					/>
					<validated-input
						v-model:value="password.value"
						@setFocus="reset('password')"
						:options="{
							type: 'password',
							tabindex: 2,
							placeholder: 'Password',
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
							placeholder: 'Confirm',
							isError: confirm.error,
							errorMessage: confirm.errorMessage,
							image: confirm.image,
						}"
					/>
				</div>
				<div>
					<validated-textarea
						v-model:value="invite.value"
						@setFocus="reset('invite')"
						:options="{
							tabindex: 4,
							placeholder: 'Invite code',
							isError: invite.error,
							errorMessage: invite.errorMessage,
							image: invite.image,
						}"
					/>
				</div>
			</div>
			<div v-else class="activate">
				<validated-input
					v-model:value="code.value"
					:options="{
						type: 'text',
						tabindex: 3,
						placeholder: 'Activate code',
						isError: code.error,
						errorMessage: code.errorMessage,
						image: code.image,
					}"
				/>
			</div>
			<div class="form__footer">
				<button-submit
					:options="{
						width: 850,
						defaultWidth: 350,
						tabindex: 4,
						handler: submit,
						prevent: true,
						fontSize: 32,
						text: isActivate ? 'Подтвердить' : 'Зарегистрироваться!',
						loadingText: 'Идёт отправка',
						isLoading: this.loading,
					}"
				/>
				<div class="form__footer__text">
					<p>Уже есть аккаунт? Так чего же ты ждешь, срочно <router-link to="/login">авторизуйся!</router-link></p>
					<p>Для получения приглашения <router-link to="/welcome"> тыкни вот тут.</router-link></p>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import userImage from '@/assets/img/user.svg'
import lockImage from '@/assets/img/lock.svg'
import keyImage from '@/assets/img/key_1.svg'
import codeImage from '@/assets/img/numbers.svg'
import validatedInput from '@/components/UI/validatedInput.vue'
import validatedTextarea from '@/components/UI/validatedTextarea.vue'
import buttonSubmit from '@/components/UI/buttonSubmit.vue'
import { API } from '@/axios/API'

export default {
	data() {
		return {
			loading: false,
			isActivate: false,
			id: null,
			login: {
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
			invite: {
				value: '',
				error: false,
				errorMessage: 'Неверные код-приглашение!',
				image: keyImage,
			},
			code: {
				value: '',
				error: false,
				errorMessage: 'Неверный код активации!',
				image: codeImage,
			},
		}
	},
	components: {
		validatedInput,
		validatedTextarea,
		buttonSubmit,
	},
	methods: {
		reset(type) {
			this[type].error = false
			this[type].errorMessage = ''
		},
		async submit() {
			// Prevalidation
			if (!this.login.value) {
				this.login.error = true
				this.login.errorMessage = 'Необходимо указать почту!'
				return
			}

			if (this.password.value.length < 5 && this.confirm.value.length < 5) {
				this.password.error = true
				this.password.errorMessage = 'Минимальная длина пароля - 5 символов'
				this.confirm.error = true
				this.confirm.errorMessage = 'Минимальная длина пароля - 5 символов'
				return
			}

			if (this.password.value !== this.confirm.value) {
				this.password.error = true
				this.password.errorMessage = 'Пароли должны совпадать!'
				this.confirm.error = true
				this.confirm.errorMessage = 'Пароли должны совпадать!'
				return
			}

			if (!this.invite.value) {
				this.invite.error = true
				this.invite.errorMessage = 'Необходимо указать код-пришлашение!'
				return
			}

			// Submit
			this.loading = true

			if (!this.isActivate) {
				const payload = { email: this.login.value, password: this.password.value, invite: this.invite.value }
				const res = await API.post('/auth/reg', payload).finally(() => {
					this.loading = false
				})

				const status = res?.status || res?.response.status

				switch (status) {
					case 200:
						if (res?.data.success) {
							this.isActivate = true
							this.id = +res.data.id
						} else {
							this.login.error = true
							this.login.errorMessage = 'Укажите существующую почту!'
						}
						break
					case 403:
						this.login.error = true
						this.login.errorMessage = res.response.data.message
						break
					case 424:
						const { message } = res?.response.data

						switch (message) {
							case 'Код-приглашение недействителен.':
								this.invite.error = true
								this.invite.errorMessage = message
								break
							case 'Не указана почта.':
								this.login.error = true
								this.login.errorMessage = message
								break
							case 'Не указан пароль.':
								this.password.error = true
								this.password.errorMessage = message
								this.confirm.error = true
								this.confirm.errorMessage = message
								break
							case 'Не указан код-приглашение.':
								this.invite.error = true
								this.invite.errorMessage = message
								break
						}
						break
					case 500:
						this.login.error = true
						this.login.errorMessage = res.response.data.message
						this.password.error = true
						this.password.errorMessage = res.response.data.message
						this.confirm.error = true
						this.confirm.errorMessage = res.response.data.message
						break
				}
			} else {
				const payload = { id: this.id, code: this.code.value }

				const res = await API.post('/auth/activate', payload).finally(() => {
					this.loading = false
				})

				if (res?.status === 200) {
					localStorage.setItem('accessToken', res.data.access)
					this.$store.commit('auth/setUser', res.data.player)
					this.$router.push('/home')
				}
			}
		},
	},
}
</script>

<style scoped>
.container:only-of-type {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transform: translateY(5vh);
}
.container > form:only-of-type {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	row-gap: 50px;
	padding: 50px 150px;
	padding-top: 50px;
	border-radius: 15px;
	background: rgba(0, 0, 0, 0.35);
	box-shadow: 10px 10px 15px black, -10px -10px 15px black, -10px 10px 15px black, 10px -10px 15px black;
}
.form__title {
	font-size: 56px;
	font-style: bold;
	color: var(--main-text);
	user-select: none;
}
.inputs {
	width: 100%;
	display: flex;
	column-gap: 50px;
}
.inputs > div {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	row-gap: 75px;
}
.inputs > div:nth-child(2) {
	transform: translateY(-45px);
}
.activate {
	margin: 50px 0;
}
.form__footer {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	row-gap: 20px;
}
.form__footer__text {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	row-gap: 10px;
}
.form__footer__text > p {
	font-size: 20px;
	color: var(--main-text);
	cursor: default;
}
.form__footer__text > p > a {
	text-decoration: underline 2px solid var(--main-text);
	color: var(--main-text);
	cursor: pointer;
	transition: var(--fast-transition);
}
.form__footer__text > p > a:hover {
	color: var(--active-text);
	text-decoration: underline 4px solid var(--active-text);
}
</style>
