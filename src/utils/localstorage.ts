export function setWithExpiry(key: string, value: string, ttl: number) {
	const now = new Date()

	// `item` содержит значение и срок, через который значение будет недействительно
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

export function getWithExpiry(key: string) {
	const itemStr = localStorage.getItem(key)

	// если зачение нет, вернем null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()

	// сравнивем время истечения срока с текущим временем
	if (now.getTime() > item.expiry) {
		// если срок истек, удалим значение и вернем null
		localStorage.removeItem(key)

		return null
	}

	return item.value
}