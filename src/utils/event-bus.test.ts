import {EventBus} from "./event-bus.ts";

describe('Класс EventBus', () => {
	let eventBus: EventBus;

	beforeEach(() => {
		eventBus = new EventBus();
	});

	it('должен добавлять обработчик события при вызове on', () => {
		const mockCallback = jest.fn();

		eventBus.on('testEvent', mockCallback);

		// @ts-ignore: доступ к приватному свойству для тестирования
		expect(eventBus.listeners['testEvent']).toContain(mockCallback);
	});

	it('должен вызывать обработчик при эмите события', () => {
		const mockCallback = jest.fn();

		eventBus.on('testEvent', mockCallback);

		eventBus.emit('testEvent', 'arg1', 'arg2');

		expect(mockCallback).toHaveBeenCalledWith('arg1', 'arg2');
	});

	it('должен вызывать несколько обработчиков при эмите события', () => {
		const mockCallback1 = jest.fn();
		const mockCallback2 = jest.fn();

		eventBus.on('testEvent', mockCallback1);
		eventBus.on('testEvent', mockCallback2);

		eventBus.emit('testEvent', 'arg1', 'arg2');

		expect(mockCallback1).toHaveBeenCalledWith('arg1', 'arg2');
		expect(mockCallback2).toHaveBeenCalledWith('arg1', 'arg2');
	});

	it('должен удалять обработчик при вызове off', () => {
		const mockCallback = jest.fn();

		eventBus.on('testEvent', mockCallback);

		eventBus.off('testEvent', mockCallback);

		// @ts-ignore: доступ к приватному свойству для тестирования
		expect(eventBus.listeners['testEvent']).not.toContain(mockCallback);
	});

	it('должен выбрасывать ошибку при вызове off для несуществующего события', () => {
		const mockCallback = jest.fn();

		expect(() => {
			eventBus.off('nonExistentEvent', mockCallback);
		}).toThrow('Нет события: nonExistentEvent');
	});

	it('должен выбрасывать ошибку при эмите несуществующего события', () => {
		expect(() => {
			eventBus.emit('nonExistentEvent');
		}).toThrow('Нет события: nonExistentEvent');
	});

	it('должен правильно обрабатывать удаление обработчика во время эмита', () => {
		const mockCallback1 = jest.fn();

		const selfRemovingCallback = function() {
			eventBus.off('testEvent', selfRemovingCallback);
			mockCallback1();
		};

		eventBus.on('testEvent', selfRemovingCallback);

		eventBus.emit('testEvent');

		expect(mockCallback1).toHaveBeenCalled();

		// @ts-ignore: доступ к приватному свойству для тестирования
		expect(eventBus.listeners['testEvent']).not.toContain(selfRemovingCallback);
	});
});
