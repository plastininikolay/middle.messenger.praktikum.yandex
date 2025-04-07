export type EventCallback = (...args: any[]) => void;

export class EventBus {
	private listeners: { [key: string]: ((...args: any[]) => void)[] } = {};

	on(event: string, callback: (...args: any[]) => void): void {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	}

	off(event: string, callback: (...args: any[]) => void): void {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event].filter(
			listener => listener !== callback
		);
	}

	emit(event: string, ...args: any[]): void {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}
		this.listeners[event].forEach(listener => {
			listener(...args);
		});
	}
}
