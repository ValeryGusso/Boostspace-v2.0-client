let timer = null

export function debounce(fn, delay) {
	if (timer) {
		clearTimeout(timer)
		timer = null
	}
	if (typeof fn === 'function') {
		timer = setTimeout(() => {
			fn()
		}, delay)
	}
}
