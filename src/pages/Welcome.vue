<template>
	<div class="welcome">
		<img class="welcome__img left" draggable="false" src="@/assets/img/steward1.png" alt="steward" />
		<p class="welcome__text logo">
			Boostspace
			<span @click="login" class="login">Вход</span>
			<span @click="reg" class="reg">Регистрация</span>
		</p>
		<img class="welcome__img right" draggable="false" src="@/assets/img/steward1.png" alt="steward" />
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		login() {
			this.$router.push('/login')
		},
		reg() {
			this.$router.push('/registration')
		},
	},
}
</script>

<style scoped>
.welcome {
	height: 90vh;
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: 30px;
	user-select: none;
}
.welcome__img {
	transition: 0.5s;
	user-select: none;
}
.left {
	transform: rotateY(180deg);
}
.welcome__text {
	position: relative;
	top: 100px;
	left: 0;
	color: var(--main-text);
	font-size: 42px;
	transition: 0.5s;
	user-select: none;
}
.reg,
.login {
	position: absolute;
	transform: scale(0);
	transition: var(--fast-transition);
	cursor: pointer;
}
.welcome:hover .welcome__text {
	top: 0px;
}
.welcome:hover .login {
	top: 50px;
	left: 60px;
	transform: scale(0.5);
}
.welcome:hover .reg {
	top: -50px;
	left: -20px;
	transform: scale(0.5);
}
.welcome:hover .logo {
	transform: scale(3);
}
.welcome:hover .left {
	transform: scale(1.05) rotate(-15deg) rotateY(180deg) translate(200px, -50px);
}
.welcome:hover .right {
	transform: scale(1.05) rotate(15deg) translate(200px, -50px);
}
.login:hover,
.reg:hover {
	color: var(--active-text);
	text-decoration: 3px solid underline;
}
</style>
