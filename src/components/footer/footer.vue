<template>
	<div class="container">
		<div class="logo" @click="scroll">
			<img class="left" src="@/assets/img/steward1.png" alt="steward" draggable="false" />
			<p class="logo__text">Boostspace</p>
			<img class="right" src="@/assets/img/steward1.png" alt="steward" draggable="false" />
		</div>
		<div class="text">
			<p>
				В случае обнаружения багов или непредвиденного поведения сайта, с предложениями по улучшению дизайна и
				добавлению нового функционала, а так же по всем интерсующим вопросам обращаться в дискорд или телеграм.
			</p>
			<br />
			<span>© {{ new Date().getFullYear() }} Boostspace</span>
		</div>
		<div class="contacts">
			<contact-block :options="{ image: discordImage, value: 'Gus#6164' }" />
			<contact-block :options="{ image: telegramImage, value: '@gusso' }" />
		</div>
	</div>
</template>

<script>
import contactBlock from './contact.vue'
import discordImage from '@/assets/img/discord.svg'
import telegramImage from '@/assets/img/telegram.svg'

export default {
	data() {
		return {
			discordImage,
			telegramImage,
		}
	},
	methods: {
		scroll() {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
		},
	},
	components: {
		contactBlock,
	},
}
</script>

<style scoped>
.container:only-of-type {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.logo {
	display: flex;
	align-items: center;
	padding-left: 50px;
	column-gap: 15px;
	width: 25%;
	height: 100%;
	cursor: pointer;
}
.logo > img {
	height: 75%;
	user-select: none;
	transition: var(--fast-transition);
}
.left {
	transform: rotateY(180deg);
}
.logo__text {
	font-size: 32px;
	color: var(--main-text);
	font-weight: bold;
	font-style: italic;
	padding-top: 3vh;
	transition: var(--fast-transition);
}
.logo:hover .logo__text {
	padding-bottom: 5vh;
	color: var(--active-text);
	user-select: none;
}
.logo:hover .left {
	transform: rotateY(180deg) rotateZ(25deg);
}
.logo:hover .right {
	transform: rotateZ(25deg);
}
.text {
	width: 55%;
	text-align: center;
	font-size: 16px;
	color: var(--main-text);
}
.text > span {
	font-size: 24px;
}
.contacts {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	row-gap: 10px;
	/* border: 1px solid red; */
}
</style>
