import { Indexed } from "../types";

function merge(lhs: Indexed, rhs: Indexed): Indexed {
	const result: Indexed = { ...lhs }; // Начинаем с копии левого объекта

	for (const key in rhs) {
		if (Object.prototype.hasOwnProperty.call(rhs, key)) {
			// Проверяем, является ли значение по ключу объектом
			if (
				typeof rhs[key] === "object" &&
				rhs[key] !== null &&
				!Array.isArray(rhs[key])
			) {
				// Если это объект, проверяем, есть ли он в левом объекте
				if (
					key in result &&
					typeof result[key] === "object" &&
					result[key] !== null
				) {
					// Рекурсивно объединяем объекты
					result[key] = merge(result[key] as Indexed, rhs[key] as Indexed);
				} else {
					// Если ключа нет в левом объекте, просто добавляем его
					result[key] = rhs[key];
				}
			} else {
				// Если это не объект, просто присваиваем значение из правого объекта
				result[key] = rhs[key];
			}
		}
	}

	return result;
}

export default merge;
