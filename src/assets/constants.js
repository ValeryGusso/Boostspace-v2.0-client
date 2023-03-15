import homeImage from '@/assets/img/key.svg'
import ordersImage from '@/assets/img/table.svg'
import paymentImage from '@/assets/img/payment.svg'
import calculatorImage from '@/assets/img/calculator.svg'
import adminImage from '@/assets/img/admin.svg'
import settingsImage from '@/assets/img/settings.svg'
import loginImage from '@/assets/img/login.svg'
import regImage from '@/assets/img/registration.svg'
import welcomeImage from '@/assets/img/welcome.svg'

export const searchQuery = [
	{ title: 'всем полям', color: '#6f8aec' },
	{ title: 'типу', color: '#6f8aec' },
	{ title: 'составу', color: '#6f8aec' },
	{ title: 'цене (дороже)', color: '#6f8aec' },
	{ title: 'цене (дешевле)', color: '#6f8aec' },
	{ title: 'доле (больше)', color: '#6f8aec' },
	{ title: 'доле (меньше)', color: '#6f8aec' },
	{ title: 'заметке', color: '#6f8aec' },
]
export const orderQuery = [
	{ title: 'по умолчанию', color: '#6f8aec' },
	{ title: 'сначала старые', color: '#6f8aec' },
	{ title: 'сначала новые', color: '#6f8aec' },
]

export const menuUnauthList = [
	{
		path: '/welcome',
		title: 'Главная',
		image: welcomeImage,
	},
	{
		path: '/login',
		title: 'Войти',
		image: loginImage,
	},
	{
		path: '/registration',
		title: 'Зарегистрироваться',
		image: regImage,
	},
]

export const menuAuthList = [
	{
		path: '/home',
		title: 'Главная',
		image: homeImage,
	},
	{
		path: '/orders',
		title: 'Заказы',
		image: ordersImage,
	},
	{
		path: '/calculator',
		title: 'Калькулятор',
		image: calculatorImage,
	},
	{
		path: '/payment',
		title: 'Выплаты',
		image: paymentImage,
	},
	{
		path: '/settings',
		title: 'Настройки',
		image: settingsImage,
	},
]

export const menuAdminList = [
	{
		path: '/home',
		title: 'Главная',
		image: homeImage,
	},
	{
		path: '/orders',
		title: 'Заказы',
		image: ordersImage,
	},
	{
		path: '/calculator',
		title: 'Калькулятор',
		image: calculatorImage,
	},
	{
		path: '/payment',
		title: 'Выплаты',
		image: paymentImage,
	},
	{
		path: '/settings',
		title: 'Настройки',
		image: settingsImage,
	},
	{
		path: '/admin',
		title: 'Админ',
		image: adminImage,
	},
]

export const menuBannedList = [
	{
		path: '/home',
		title: 'Главная',
		image: homeImage,
	},
	{
		path: '/settings',
		title: 'Настройки',
		image: settingsImage,
	},
]

export const classColors = [
	{ title: 'Mage', color: '#68ccef' },
	{ title: 'Priest', color: '#f0ebe0' },
	{ title: 'Lock', color: '#9382c9' },
	{ title: 'Rogue', color: '#fff468' },
	{ title: 'Monk', color: '#00ffba' },
	{ title: 'Druid', color: '#ff7c0a' },
	{ title: 'DH', color: '#a330c9' },
	{ title: 'Shaman', color: '#2359ff' },
	{ title: 'Hunter', color: '#aad372' },
	{ title: 'Dracthyr', color: '#33937f' },
	{ title: 'Warrior', color: '#c69b6d' },
	{ title: 'Paladin', color: '#f48cba' },
	{ title: 'DK', color: '#c41e3b' },
	{ title: 'remove', color: 'var(--red-text)' },
]

export const rolesList = [
	{ title: 'Танк', color: '#6f8aec' },
	{ title: 'Хил', color: '#3ead12' },
	{ title: 'ДД', color: '#edaf4a' },
]

export const keyListSelect = [
	{ title: 'AA', color: '#6f8aec' },
	{ title: 'RPL', color: '#6f8aec' },
	{ title: 'AV', color: '#6f8aec' },
	{ title: 'NO', color: '#6f8aec' },
	{ title: 'CoS', color: '#6f8aec' },
	{ title: 'HoV', color: '#6f8aec' },
	{ title: 'SBG', color: '#6f8aec' },
	{ title: 'TJS', color: '#6f8aec' },
	{ title: 'очистить', color: '#d84848' },
]

export const lvlListSelect = [
	{ title: '<15', color: '#6f8aec' },
	{ title: '15', color: '#6f8aec' },
	{ title: '16', color: '#6f8aec' },
	{ title: '17', color: '#6f8aec' },
	{ title: '18', color: '#6f8aec' },
	{ title: '19', color: '#6f8aec' },
	{ title: '20', color: '#6f8aec' },
	{ title: '21', color: '#6f8aec' },
	{ title: '22', color: '#6f8aec' },
	{ title: '23', color: '#6f8aec' },
	{ title: '24', color: '#6f8aec' },
	{ title: '25', color: '#6f8aec' },
	{ title: 'очистить', color: '#d84848' },
]

export const keysList = ['AA', 'RPL', 'AV', 'NO', 'CoS', 'HoV', 'SBG', 'TJS']

export const lvlList = ['< 15', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '> 25']

export const searchedColors = ['#77A1D3', '#F2994A', '#bdc3c7', '#16A085', '#f64f59', '#c471ed', '#EFEFBB', '#94716B']
