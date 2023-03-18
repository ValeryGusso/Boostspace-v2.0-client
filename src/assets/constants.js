import homeImage from '@/assets/img/key.svg'
import ordersImage from '@/assets/img/table.svg'
import paymentImage from '@/assets/img/payment.svg'
import calculatorImage from '@/assets/img/calculator.svg'
import adminImage from '@/assets/img/admin.svg'
import settingsImage from '@/assets/img/settings.svg'
import loginImage from '@/assets/img/login.svg'
import regImage from '@/assets/img/registration.svg'
import welcomeImage from '@/assets/img/welcome.svg'

const defaultColor = 'var(--active-text)'

export const searchQuery = [
	{ title: 'всем полям', color: defaultColor },
	{ title: 'типу', color: defaultColor },
	{ title: 'составу', color: defaultColor },
	{ title: 'цене (дороже)', color: defaultColor },
	{ title: 'цене (дешевле)', color: defaultColor },
	{ title: 'доле (больше)', color: defaultColor },
	{ title: 'доле (меньше)', color: defaultColor },
	{ title: 'заметке', color: defaultColor },
]
export const orderQuery = [
	{ title: 'по умолчанию', color: defaultColor },
	{ title: 'сначала старые', color: defaultColor },
	{ title: 'сначала новые', color: defaultColor },
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
	{ title: 'Танк', color: defaultColor },
	{ title: 'Хил', color: '#3ead12' },
	{ title: 'ДД', color: '#edaf4a' },
]

export const keyListSelect = [
	{ title: 'AA', color: defaultColor },
	{ title: 'RPL', color: defaultColor },
	{ title: 'AV', color: defaultColor },
	{ title: 'NO', color: defaultColor },
	{ title: 'CoS', color: defaultColor },
	{ title: 'HoV', color: defaultColor },
	{ title: 'SBG', color: defaultColor },
	{ title: 'TJS', color: defaultColor },
	{ title: 'очистить', color: '#d84848' },
]

export const lvlListSelect = [
	{ title: '<15', color: defaultColor },
	{ title: '15', color: defaultColor },
	{ title: '16', color: defaultColor },
	{ title: '17', color: defaultColor },
	{ title: '18', color: defaultColor },
	{ title: '19', color: defaultColor },
	{ title: '20', color: defaultColor },
	{ title: '21', color: defaultColor },
	{ title: '22', color: defaultColor },
	{ title: '23', color: defaultColor },
	{ title: '24', color: defaultColor },
	{ title: '25', color: defaultColor },
	{ title: 'очистить', color: '#d84848' },
]

export const keysList = ['AA', 'RPL', 'AV', 'NO', 'CoS', 'HoV', 'SBG', 'TJS']

export const lvlList = ['< 15', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '> 25']

export const searchedColors = ['#77A1D3', '#F2994A', '#bdc3c7', '#16A085', '#f64f59', '#c471ed', '#EFEFBB', '#94716B']
