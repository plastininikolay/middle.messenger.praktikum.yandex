import { StringIndexed } from "../types";

function queryStringify(data: StringIndexed): string | never {
	// Проверка на объект
	if (typeof data !== "object" || data === null) {
		throw new Error("input must be an object");
	}

	const result: string[] = [];

	function buildQueryString(obj: StringIndexed, prefix: string = ""): void {
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				const value = obj[key];
				const encodedKey = prefix
					? `${prefix}[${encodeURIComponent(key)}]`
					: encodeURIComponent(key);

				if (value === null) {
					result.push(`${encodedKey}=`);
				} else if (typeof value === "object" && !Array.isArray(value)) {
					buildQueryString(value, encodedKey); // Рекурсивно обрабатываем вложенные объекты
				} else if (Array.isArray(value)) {
					value.forEach((item, index) => {
						const arrayKey = `${encodedKey}[${index}]`;
						result.push(`${arrayKey}=${encodeURIComponent(item)}`);
					});
				} else {
					result.push(`${encodedKey}=${encodeURIComponent(value)}`);
				}
			}
		}
	}

	buildQueryString(data);
	return '?' + result.join("&"); // Объединяем все части в строку
}

export default queryStringify;
