<template>
	<div class="admin">
		<div class="invite" data-scroll="true">
			<p class="invite__title">
				{{
					invite.value
						? `Код-приглашение для ${name.value}
				в ${invite.group}-ю группу на роль ${invite.role}`
						: 'Создать код-приглашение.'
				}}
			</p>
			<validated-input
				v-if="invite.status === 'init'"
				v-model:value="name.value"
				@setFocus="reset('name')"
				:options="{
					type: 'text',
					tabindex: 1,
					placeholder: 'Имя',
					isError: name.error,
					errorMessage: name.errorMessage,
					image: name.image,
				}"
			/>
			<div v-if="invite.status === 'init'" class="invite__group">
				<select-bar
					v-model="invite.role"
					:options="{
						list: rolesList,
						defaultValue: 'ДД',
						placeholder: 'Роль: ',
						width: 200,
						columns: 1,
						dontShowColor: true,
					}"
				/>
				<group-picker v-model="invite.group" />
			</div>
			<div class="textarea__wrapper">
				<textarea
					@click="sendCode"
					:class="{ active: invite.status === 'success', button: invite.status === 'init' }"
					:value="setInviteValue()"
					readonly
				>
				</textarea>
				<inline-svg
					v-if="invite.status === 'success'"
					@click="copyInvite"
					class="invite__copy"
					:src="copyfile"
					title="Копировать"
				/>
				<p :class="{ invite__copy__text: true, invite__copy__text__active: isCopied }">Скопировано!</p>
			</div>
			<div class="invite__info">
				<p v-if="countdown" class="timer">
					Код действителен ещё <br />
					{{ getMin() }}мин. {{ getSec() }}сек. <br />
					поторопись!
				</p>
				<p v-if="countdown === 0" class="timer timer__expires">
					Код больше недействителен :( Но ты можешь создать новый
				</p>
				<p v-if="invite.value" @click="resetInvite" class="reset">Сбросить</p>
			</div>
		</div>
		<div class="userpanel" data-scroll="true">
			<div class="userpanel__list">
				<user-panel
					@changeUser="changeUser"
					v-for="user in $store.state.players?.data"
					:user="user"
					:wasChanged="getWasChanged(user.id)"
					:wasUpdated="getWasUpdated(user.id)"
					:updateError="getUpdateError(user.id)"
				/>
			</div>
			<div class="userpanel__button">
				<button-submit
					v-if="userUpdateData.length > 0"
					:options="{
						width: 400,
						defaultWidth: 200,
						tabindex: 2,
						handler: sendUpdate,
						prevent: true,
						fontSize: 32,
						height: 60,
						text: 'Сохранить!',
						loadingText: 'Идёт отправка',
						isLoading: updateLoading,
					}"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import validatedInput from '@/components/UI/validatedInput.vue'
import groupPicker from '@/components/UI/groupPicker.vue'
import buttonSubmit from '@/components/UI/buttonSubmit.vue'
import selectBar from '@/components/UI/select.vue'
import userPanel from '@/components/admin/user.vue'
import userImage from '@/assets/img/user.svg'
import { rolesList } from '@/assets/constants'
import { API } from '@/axios/API'
import inlineSvg from 'vue-inline-svg'
import copyfile from '@/assets/img/copyfile.svg'

export default {
	data() {
		return {
			copyfile,
			rolesList,
			name: {
				value: '',
				error: false,
				errorMessage: '',
				image: userImage,
			},
			invite: {
				value: '',
				group: 0,
				role: 'ДД',
				status: 'init',
			},
			timer: null,
			countdown: null,
			isCopied: false,
			userUpdateData: [],
			updateLoading: false,
		}
	},
	methods: {
		setInviteValue() {
			switch (this.invite.status) {
				case 'init':
					return 'Создать приглашение!'
				case 'pending':
					return 'Идёт создание, ожидай'
				case 'success':
					return this.invite.value
				case 'error':
					return 'Упс! Ошибочка вышла, попробуй ещё раз!'
			}
		},
		async sendCode() {
			if (this.name.value.length < 3) {
				this.name.error = true
				this.name.errorMessage = 'Не менее 3х символов!'
				return
			}

			if (this.invite.status === 'init') {
				this.invite.status = 'pending'
				const { data } = await API.post('/users/invite', {
					name: this.name.value,
					role: this.role,
					group: this.group,
				}).catch(err => {
					this.$store.commit('error/setError', err)
				})

				if (data.success) {
					this.invite.value = data.invite
					this.invite.status = 'success'
					this.countdown = 300
					this.timer = setInterval(() => {
						this.countdown--
						if (this.countdown === 0) {
							clearInterval(this.timer)
						}
					}, 1000)
				} else {
					this.invite.status = 'error'
				}
			}
		},
		resetInvite() {
			clearInterval(this.timer)
			this.countdown = null
			this.invite.status = 'init'
			this.invite.value = ''
			this.invite.group = 0
			this.invite.role = ''
			this.name.value = ''
		},
		getMin() {
			return Math.floor(this.countdown / 60)
		},
		getSec() {
			return Math.floor(this.countdown % 60)
		},
		copyInvite() {
			window.navigator.clipboard.writeText(this.invite.value)
			this.isCopied = true
			setTimeout(() => {
				this.isCopied = false
			}, 3000)
		},
		reset(type) {
			this[type].error = false
			this[type].errorMessage = ''
		},
		changeUser(payload) {
			const index = this.userUpdateData.findIndex(el => el.id === payload.id)

			if (index >= 0) {
				this.userUpdateData[index] = { ...this.userUpdateData[index], ...payload }
			} else {
				const originalUser = this.$store.state.players.data.find(user => user.id === payload.id)
				const user = {
					id: payload.id,
					originalNickname: originalUser.nickname,
					nickname: payload.nickname,
					originalGroup: originalUser.group,
					group: payload.group,
					originalInactive: originalUser.inactive,
					inactive: payload.inactive,
					originalIsBanned: originalUser.isBanned,
					isBanned: payload.isBanned,
					updateError: false,
					wasUpdated: false,
					wasChanged() {
						return !(
							this.originalGroup === this.group &&
							this.originalInactive === this.inactive &&
							this.originalIsBanned === this.isBanned &&
							this.nickname.length === 0
						)
					},
				}
				this.userUpdateData.push(user)
			}
		},
		async sendUpdate() {
			let someOneWasBanned = false
			const promises = []
			this.updateLoading = true
			this.userUpdateData.forEach(user => {
				const payload = {
					id: user.id,
				}
				if (user.nickname.length >= 3) {
					payload.nickname = user.nickname
				}
				if (user.originalGroup !== user.group) {
					payload.group = user.group
				}
				if (user.originalInactive !== user.inactive) {
					payload.inactive = user.inactive
				}
				if (user.originalIsBanned !== user.isBanned) {
					payload.isBanned = user.isBanned
					someOneWasBanned = true
				}

				promises.push(API.post('/users/admin', payload))
			})
			const responses = await Promise.allSettled(promises)

			responses.forEach(res => {
				const currentUser = this.userUpdateData.find(user => user.id === res.value.data.id)
				switch (res.status) {
					case 'fulfilled':
						if (res.value.data.success) {
							if (currentUser) {
								currentUser.wasUpdated = true
							}
						} else {
							if (currentUser) {
								currentUser.updateError = true
							}
						}
						break
					case 'rejected':
						// if (currentUser) {
						// 	currentUser.updateError = true
						// }
						break
				}
			})

			if (someOneWasBanned) {
				this.$store.state.websocket.socket.send('ban')
			}

			this.updateLoading = false

			setTimeout(() => {
				this.userUpdateData = this.userUpdateData.filter(user => !user.updateError && !user.wasUpdated)
				this.$store.dispatch('players/getPlayers')
			}, 5000)
		},
		getWasChanged(id) {
			const currentUser = this.userUpdateData.find(user => user.id === id)
			if (currentUser) {
				return currentUser.wasChanged()
			}
			return false
		},
		getUpdateError(id) {
			const currentUser = this.userUpdateData.find(user => user.id === id)
			if (currentUser) {
				return currentUser.updateError
			}
			return false
		},
		getWasUpdated(id) {
			const currentUser = this.userUpdateData.find(user => user.id === id)
			if (currentUser) {
				return currentUser.wasUpdated
			}
			return false
		},
	},
	mounted() {
		this.$store.dispatch('players/getPlayers')
	},
	components: {
		validatedInput,
		groupPicker,
		selectBar,
		buttonSubmit,
		userPanel,
		inlineSvg,
	},
}
</script>

<style scoped>
.admin {
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.invite {
	position: relative;
	height: 100%;
	width: 35vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 5vh;
	row-gap: 35px;
}
.invite__title {
	max-width: 500px;
	font-size: 32px;
	text-align: center;
	color: var(--main-text);
}
.invite__group {
	width: 100%;
	display: flex;
	justify-content: space-around;
}
.textarea__wrapper {
	position: relative;
}
.invite textarea {
	width: 400px;
	height: 50px;
	border-radius: 20px;
	text-align: center;
	box-shadow: 10px 10px 5px var(--dark-text);
	padding: 10px;
	font-size: 20px;
	outline: none;
	resize: none;
	transition: var(--fast-transition);
	cursor: pointer;
}
.invite textarea::selection {
	color: var(--main-text);
	background-color: var(--dark-text);
}
.invite__copy {
	position: absolute;
	width: 50px;
	height: 50px;
	top: 240px;
	left: 340px;
	cursor: pointer;
	filter: opacity(0.25);
	transition: var(--fast-transition);
	z-index: 10;
}
.invite__copy:hover {
	filter: opacity(1);
}
.invite__copy__text {
	position: absolute;
	top: 255px;
	left: 170px;
	font-size: 24px;
	color: var(--dark-text);
	filter: opacity(0);
	transition: var(--fast-transition);
	user-select: none;
}
.invite__copy__text__active {
	filter: opacity(1);
}
.active {
	height: 300px !important;
	cursor: text !important;
}
.button {
	font-size: 24px !important;
	background: rgba(237, 237, 237, 0.5);
	user-select: none !important;
}
.button:hover {
	background: var(--main-text);
}
.invite__info {
	min-height: 20vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 25px 0;
	row-gap: 35px;
}
.timer {
	width: 400px;
	text-align: center;
	color: var(--main-text);
	font-size: 24px;
}
.timer__expires {
	color: var(--error);
}
.reset {
	width: 400px;
	text-align: center;
	font-size: 52px;
	font-weight: bold;
	color: var(--main-text);
	text-decoration: underline 3px solid var(--main-text);
	cursor: pointer;
	transition: var(--fast-transition);
}
.reset:hover {
	color: var(--red-text);
	text-decoration: underline 5px solid var(--red-text);
}
.userpanel {
	width: 65vw;
	height: 99vh;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
}
.userpanel__list {
	width: 100%;
	height: 99vh;
	display: flex;
	flex-direction: column;
	border-left: 2px dashed var(--main-text);
	overflow-y: auto;
}
.userpanel__button {
	position: absolute;
	top: 90vh;
	left: -35vw;
	width: 100%;
	height: 7vh;
	display: flex;
	align-items: end;
	justify-content: center;
}
</style>
