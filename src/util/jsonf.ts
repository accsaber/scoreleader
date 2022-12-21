const json = <T>(url: string, init?: RequestInit) => {
	const target = new URL(url, "https://api.beatleader.xyz").toString();
	console.log(target);
	return fetch(target, init).then((i) => {
		if (i.status === 200) {
			return i.json() as T;
		} else {
			throw i;
		}
	});
};

export default json;
