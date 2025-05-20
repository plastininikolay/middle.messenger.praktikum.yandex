import {EventBus} from './event-bus';
import Block, {BlockProps} from "./block.ts";

jest.mock('handlebars', () => ({
	compile: jest.fn().mockImplementation(() => () => '<div>Mocked template</div>')
}));

class TestBlock extends Block {
	constructor(props: BlockProps = {}) {
		super(props);
	}

	protected render(): string {
		return '<div>Test block</div>';
	}

	getTestProp(key: string): any {
		return this.getProps()[key];
	}
}

describe('Класс Block', () => {
	let block: TestBlock;
	let eventBusSpy: jest.SpyInstance;

	beforeEach(() => {
		document.body.innerHTML = '';

		eventBusSpy = jest.spyOn(EventBus.prototype, 'emit');

		block = new TestBlock();
	});

	afterEach(() => {
		jest.clearAllMocks();

		if (block) {
			block.destroy();
		}
	});

	it('должен создавать экземпляр с правильными свойствами', () => {
		expect(block).toBeInstanceOf(Block);
		expect(block.getProps()).toBeDefined();
		expect(block.getContent()).toBeInstanceOf(HTMLElement);
	});

	it('должен эмитить события в правильном порядке при инициализации', () => {
		expect(eventBusSpy).toHaveBeenCalledWith(Block.EVENTS.INIT);
		expect(eventBusSpy).toHaveBeenCalledWith(Block.EVENTS.FLOW_RENDER);
	});

	it('должен обновлять свойства при вызове setProps', () => {
		block.setProps({test: 'value'});

		expect(block.getTestProp('test')).toBe('value');
	});

	it('должен добавлять дочерний компонент при вызове setChild', () => {
		const childBlock = new TestBlock();

		block.setChild('child', childBlock);

		expect(eventBusSpy).toHaveBeenCalledWith(Block.EVENTS.FLOW_RENDER);
	});

	it('должен показывать и скрывать элемент при вызове show и hide', () => {
		const element = block.getContent();

		block.hide();

		expect(element.style.display).toBe('none');

		block.show();

		expect(element.style.display).toBe('block');
	});

	it('должен вызывать dispatchComponentWillUnmount при уничтожении', () => {
		const unmountSpy = jest.spyOn(block, 'dispatchComponentWillUnmount');

		block.destroy();

		expect(unmountSpy).toHaveBeenCalled();

		expect(block.element).toBeNull();
	});

	it('должен правильно обрабатывать вложенные компоненты', () => {
		const childBlock = new TestBlock();

		const parentBlock = new TestBlock({
			child: childBlock
		});

		const destroySpy = jest.spyOn(childBlock, 'destroy');

		parentBlock.destroy();

		expect(destroySpy).toHaveBeenCalled();
	});

	it('должен добавлять события к элементу', () => {
		const clickHandler = jest.fn();

		const blockWithEvents = new TestBlock({
			events: {
				click: clickHandler
			}
		});

		const element = blockWithEvents.getContent();

		const clickEvent = new MouseEvent('click', {
			bubbles: true,
			cancelable: true
		});
		element.dispatchEvent(clickEvent);

		expect(clickHandler).toHaveBeenCalled();
	});
})
