export function getPart(price, group, tax) {
	const amount = group.split(/[\.,]\s*/g).length
	const priceFloat = parseFloat(price)

	if (tax) {
		return ((priceFloat * (1 - 0.08)) / amount).toFixed(2)
	} else {
		return (priceFloat / amount).toFixed(2)
	}
}
