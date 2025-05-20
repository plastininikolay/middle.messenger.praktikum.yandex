import { Indexed } from "../types";

/**
 * Функция объединения объектов с глубоким копированием
 * @param lhs Первый объект
 * @param rhs Второй объект, который будет объединен с первым
 * @returns Новый объект, содержащий объединенные свойства обоих объектов
 */
function merge(lhs: Indexed, rhs: Indexed): Indexed {
	if (!lhs || typeof lhs !== 'object') {
		return rhs;
	}
	
	if (!rhs || typeof rhs !== 'object') {
		return lhs;
	}
	
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
					result[key] = { ...(rhs[key] as object) };
				}
			} else if (Array.isArray(rhs[key])) {
				// Для массивов делаем копию массива
				result[key] = [...(rhs[key] as unknown[])];
			} else {
				// Если это не объект, просто присваиваем значение из правого объекта
				result[key] = rhs[key];
			}
		}
	}

	return result;
}

export default merge;
