import { Indexed } from "../types";

function cloneDeep<T extends Indexed>(obj: T): T {
	//@ts-expect-error невозможно правильно использовать типы
	return (function _cloneDeep(
		item: T,
	): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
		if (item === null || typeof item !== "object") {
			return item;
		}

		if (item instanceof Date) {
			return new Date((item as Date).valueOf());
		}

		if (item instanceof Array) {
			const copy: ReturnType<typeof _cloneDeep>[] = [];

			item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

			return copy;
		}

		if (item instanceof Set) {
			const copy = new Set();

			item.forEach((v) => copy.add(_cloneDeep(v)));

			return copy;
		}

		if (item instanceof Map) {
			const copy = new Map();

			item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

			return copy;
		}

		if (typeof item === "object") {
			const copy: Indexed = {};

			// Handle:
			// * Object.symbol
			Object.getOwnPropertySymbols(item).forEach(
				(s) => (copy[s.toString()] = _cloneDeep(item[s.toString()] as T)),
			);

			// Handle:
			// * Object.name (other)
			Object.keys(item).forEach((k) => (copy[k] = _cloneDeep(item[k] as T)));

			return copy as T;
		}

		throw new Error(`Unable to copy object: ${item}`);
	})(obj);
}

export default cloneDeep;
