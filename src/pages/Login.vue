<template>
	<div class="container">
		<form action="submit">
			<p class="form__title">Sign in</p>
			<validated-input
				v-model:value="login.value"
				@setFocus="reset('login')"
				:options="{
					type: 'text',
					placeholder: 'Login',
					tabindex: 1,
					isError: login.error,
					errorMessage: login.errorMessage,
					image: login.image,
					autocomplete: 'email',
				}"
			/>
			<validated-input
				v-model:value="password.value"
				@setFocus="reset('password')"
				:options="{
					type: 'password',
					placeholder: 'Password',
					tabindex: 2,
					isError: password.error,
					errorMessage: password.errorMessage,
					image: password.image,
				}"
			/>
			<button-submit
				:options="{
					width: 400,
					defaultWidth: 250,
					tabindex: 3,
					handler: submit,
					prevent: true,
					fontSize: 32,
					text: 'Войти',
					loadingText: 'Идёт отправка',
					isLoading: this.loading,
				}"
			/>
			<div class="form__footer">
				<p>
					Ещё нет аккаунта? Так чего же ты ждешь, срочно <router-link to="/registration">зарегистрируйся!</router-link>
				</p>
				<!-- <p>Забыл пароль? Восстановить можно <router-link to="/welcome">тут.</router-link></p> -->
				<p>Забыл пароль? Восстановить можно <span @click="scroll">тут.</span></p>
			</div>
		</form>
	</div>
</template>

<script>
import userImage from '@/assets/img/user.svg'
import lockImage from '@/assets/img/lock.svg'
import ValidatedInput from '@/components/UI/validatedInput.vue'
import buttonSubmit from '@/components/UI/buttonSubmit.vue'
import { API } from '@/axios/API'
const vw = Math.ceil(window.innerWidth / 100)

export default {
	data() {
		return {
			vw,
			// showActivate: false,
			loading: false,
			login: {
				value: '',
				error: false,
				errorMessage: '',
				image: userImage,
			},
			password: {
				value: '',
				error: false,
				errorMessage: '',
				image: lockImage,
			},
		}
	},
	components: {
		ValidatedInput,
		buttonSubmit,
	},
	methods: {
		reset(type) {
			this[type].error = false
			this[type].errorMessage = ''
		},
		scroll() {
			window.scrollTo({ top: window.innerHeight * 0.15, left: 0, behavior: 'smooth' })
		},
		submit() {
			// Prevalidation
			let isError = false

			if (!this.login.value) {
				this.login.error = true
				this.login.errorMessage = 'Необходимо указать логин!'
				isError = true
			}
			if (!this.password.value) {
				this.password.error = true
				this.password.errorMessage = 'Необходимо указать пароль!'
				isError = true
			}

			if (isError) {
				return
			}

			this.loading = true
			API.post('/auth/login', { login: this.login.value, password: this.password.value })
				.then(res => {
					if (res.status === 200) {
						localStorage.setItem('accessToken', res.data.access)
						this.$store.commit('auth/setUser', res.data.player)
						this.$router.push('/home')
					} else {
						this.$store.commit('auth/setUser', null)
						this.login.error = true
						this.login.errorMessage = 'Неверные логин или пароль!'
						this.password.error = true
						this.password.errorMessage = 'Неверные логин или пароль!'
					}
				})
				.finally(() => {
					this.loading = false
				})
		},
	},
}
</script>

<style scoped>
.container:only-of-type {
	display: flex;
	justify-content: center;
}
.container > form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	row-gap: 50px;
	padding: 50px 150px;
	padding-top: 50px;
	border-radius: 15px;
	background: var(--bg-opacity-second);
	box-shadow: 15px 15px 15px rgba(255, 255, 255, 0.1), -15px -15px 15px rgba(255, 255, 255, 0.1),
		-15px 15px 15px rgba(255, 255, 255, 0.1), 15px -15px 15px rgba(255, 255, 255, 0.1);
}
.form__title {
	font-size: 56px;
	font-style: bold;
	color: var(--main-text);
	user-select: none;
}
.btn__submit {
	width: 250px;
	padding-top: 15px;
	padding-bottom: 5px;
	font-size: 32px;
	color: var(--main-text);
	background: none;
	border: none;
	border-bottom: 4px solid var(--main-text);
	cursor: pointer;
	transition: var(--fast-transition);
}
.btn__submit:hover {
	width: 400px;
	border-radius: 5px;
	background: var(--main-text);
	color: var(--dark-text);
}
.form__footer {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	row-gap: 20px;
}
.form__footer > p {
	font-size: 20px;
	color: var(--main-text);
	cursor: default;
}
.form__footer > p > a,
.form__footer > p > span {
	text-decoration: underline 2px solid var(--main-text);
	color: var(--main-text);
	cursor: pointer;
	transition: var(--fast-transition);
}
.form__footer > p > a:hover,
.form__footer > p > span:hover {
	color: var(--active-text);
	text-decoration: underline 4px solid var(--active-text);
}
</style>
