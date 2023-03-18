<template>
	<div>
		<div v-if="!wasUpdated && !updateError" :class="{ user: true, changed: wasChanged }">
			<validated-input
				v-model:value="name.value"
				@setFocus="reset('name')"
				:options="{
					type: 'text',
					placeholder: user.nickname,
					tabindex: 1,
					isError: name.error,
					errorMessage: name.errorMessage,
					image: name.image,
				}"
			/>
			<group-picker v-model="group" />
			<!-- <div>
			Активный:
			<checkbox v-model="isActive" />
		</div> -->
			<button
				@click="setActive"
				class="button"
				:style="{ background: isActive ? 'var(--bg-blue)' : 'var(--bg-yellow)', '--x': '20px' }"
			>
				{{ isActive ? 'Активен' : 'Запас' }}
			</button>
			<button
				v-if="!user.isAdmin"
				@click="setBan"
				class="button"
				:style="{ background: isBanned ? 'var(--bg-green)' : 'var(--bg-red)', '--x': '-20px' }"
			>
				{{ isBanned ? 'Разбанить' : 'Забанить!' }}
			</button>
			<div v-else class="admin__banner" title="Невозможно забанить другого администратора!">Админ</div>
		</div>
		<div v-if="wasUpdated" class="user success">
			<img class="success__image" src="@/assets/img/success_animation.gif" alt="success" />
			<p class="success__text">Данные успешно обновлены!</p>
			<img class="success__image" src="@/assets/img/success_animation.gif" alt="success" />
		</div>
		<div v-if="updateError" class="user error">
			<img class="error_image" src="@/assets/img/error_animate.gif" alt="error" />
			<p class="error__text">Не удалось обновить информацию о пользователе, попробуй ещё раз</p>
			<img class="error_image" src="@/assets/img/error_animate.gif" alt="error" />
		</div>
	</div>
</template>

<script>
import validatedInput from '../UI/validatedInput.vue'
import groupPicker from '../UI/groupPicker.vue'
import checkbox from '../UI/checkbox.vue'
import userImage from '@/assets/img/user.svg'

export default {
	data() {
		return {
			name: {
				value: '',
				error: false,
				errorMessage: '',
				image: userImage,
			},
			group: this.user.group,
			isActive: !this.user.inactive,
			isBanned: this.user.isBanned,
		}
	},
	methods: {
		reset(type) {
			this[type].error = false
			this[type].errorMessage = ''
		},
		setActive() {
			this.isActive = !this.isActive
		},
		setBan() {
			this.isBanned = !this.isBanned
		},
		change() {
			const payload = {
				id: this.user.id,
				nickname: this.name.value,
				group: this.group,
				inactive: !this.isActive,
				isBanned: this.isBanned,
			}
			this.$emit('changeUser', payload)
		},
	},
	watch: {
		['name.value']() {
			this.change()
		},
		group() {
			this.change()
		},
		isActive() {
			this.change()
		},
		isBanned() {
			this.change()
		},
	},
	props: {
		user: { type: Object },
		wasUpdated: { type: Boolean },
		wasChanged: { type: Boolean },
		updateError: { type: Boolean },
	},
	components: {
		validatedInput,
		groupPicker,
		checkbox,
	},
}
</script>

<style scoped>
.user {
	width: 100%;
	padding: 15px 0;
	min-height: 100px;
	/* height: 550px !important; */
	display: flex;
	align-items: center;
	justify-content: space-around;
	border-bottom: 1px dashed var(--main-text);
}
.changed {
	background: rgba(61, 238, 61, 0.15);
}
.button {
	width: 150px;
	padding: 15px 0;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	font-size: 26px;
	outline: none;
	user-select: none;
	border: none;
	transition: var(--fast-transition);
	border-radius: 5px;
}
.button:hover {
	filter: drop-shadow(5px 5px 10px rgba(255, 255, 255, 0.5));
	transform: translateX(var(--x));
}
.admin__banner {
	width: 150px;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--bg-green);
	font-size: 26px;
	border-radius: 5px;
	cursor: default;
	user-select: none;
}
.success {
	justify-content: center;
	column-gap: 20px;
}
.success__text {
	font-size: 42px;
	color: var(--main-text);
}
.success__image {
	height: 75px;
}
.error {
	justify-content: center;
	column-gap: 20px;
}
.error__text {
	width: 50%;
	text-align: center;
	font-size: 32px;
	font-style: italic;
	color: var(--red-text);
}
.error_image {
	height: 150px;
}
</style>
