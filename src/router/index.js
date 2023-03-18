import { createRouter, createWebHistory } from 'vue-router'
import dataPage from '../pages/DataPage.vue'
import homePage from '../pages/HomePage.vue'
import paymentPage from '../pages/PaymentPage.vue'
import calculatorPage from '../pages/CalculatorPage.vue'
import settingsPage from '../pages/SettingsPage.vue'
import adminPage from '../pages/AdminPage.vue'
import loginPage from '../pages/Login.vue'
import registrationPage from '../pages/Registration.vue'
import welcomePage from '@/pages/Welcome'

const routes = [
	{
		path: '/',
		name: 'home',
		components: {
			admin: homePage,
			auth: homePage,
			banned: homePage,
			unauth: welcomePage,
		},
	},
	{
		path: '/home',
		name: 'home',
		components: {
			admin: homePage,
			auth: homePage,
			banned: homePage,
		},
	},
	{
		path: '/settings',
		name: 'settings',
		components: {
			admin: settingsPage,
			auth: settingsPage,
			banned: settingsPage,
		},
	},
	{
		path: '/orders',
		name: 'orders',
		components: {
			admin: dataPage,
			auth: dataPage,
		},
	},
	{
		path: '/payment',
		name: 'payment',
		components: {
			admin: paymentPage,
			auth: paymentPage,
		},
	},
	{
		path: '/calculator',
		name: 'calculator',
		components: {
			admin: calculatorPage,
			auth: calculatorPage,
		},
	},
	{
		path: '/admin',
		name: 'admin',
		components: {
			admin: adminPage,
			auth: adminPage,
		},
	},
	{
		path: '/login',
		name: 'login',
		components: {
			unauth: loginPage,
		},
	},
	{
		path: '/registration',
		name: 'registration',
		components: {
			unauth: registrationPage,
		},
	},
	{
		path: '/welcome',
		name: 'welcome',
		components: {
			unauth: welcomePage,
		},
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
