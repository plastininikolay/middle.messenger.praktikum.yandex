import { EventBus, EventCallback } from "./event-bus.ts";
import Handlebars from "handlebars";

export interface BlockProps {
	[key: string]: any;
}

export default class Block {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_CWU: "flow:component-will-unmount",
		FLOW_RENDER: "flow:render",
	};protected _element: HTMLElement | null = null;protected _id: string =
		Date.now().toString() + Math.floor(Math.random() * 1000).toString();protected props: BlockProps;protected children: Record<string, Block>;protected lists: Record<string, any[]>;protected eventBus: () => EventBus;constructor(propsWithChildren: BlockProps = {}) {
		const eventBus = new EventBus();
		const { props, children, lists } =
			this._getChildrenPropsAndProps(propsWithChildren);
		this.props = this._makePropsProxy({ ...props });
		this.children = children;
		this.lists = this._makePropsProxy({ ...lists });
		this.eventBus = () => eventBus;
		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}
	private _addEvents(): void {
		const { events = {}, eventsForInput = {} } = this.props;
		const inputElement = this._element?.querySelector("input");	Object.keys(events).forEach((eventName) => {
			if (this._element) {
				this._element.addEventListener(eventName, (e: Event) => {
					e.preventDefault();
					events[eventName](e);
				});
			}
		});
		Object.keys(eventsForInput).forEach((eventName) => {
			if (inputElement) {
				inputElement.addEventListener(eventName, (e: Event) => {
					e.preventDefault();
					eventsForInput[eventName](e);
				});
			}
		});
	}
	private _removeEvents(): void {
		const { events = {}, eventsForInput = {} } = this.props;
		const inputElement = this._element?.querySelector("input");	Object.keys(events).forEach((eventName) => {
			if (this._element) {
				this._element.removeEventListener(eventName, events[eventName]);
			}
		});
		Object.keys(eventsForInput).forEach((eventName) => {
			if (inputElement) {
				inputElement.removeEventListener(eventName, eventsForInput[eventName]);
			}
		});
	}
	public getProps() {
		return this.props;
	}
	private _registerEvents(eventBus: EventBus): void {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this) as EventCallback);
		eventBus.on(
			Block.EVENTS.FLOW_CDM,
			this._componentDidMount.bind(this) as EventCallback,
		);
		eventBus.on(
			Block.EVENTS.FLOW_CDU,
			this._componentDidUpdate.bind(this) as EventCallback,
		);
		eventBus.on(
			Block.EVENTS.FLOW_RENDER,
			this._render.bind(this) as EventCallback,
		);
		eventBus.on(
			Block.EVENTS.FLOW_CWU,
			this._componentWillUnmount.bind(this) as EventCallback,
		);
	}
	protected init(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}
	private _componentDidMount(): void {
		this.componentDidMount();
		Object.values(this.children).forEach((child) => {
			child.dispatchComponentDidMount();
		});
	}
	protected componentDidMount(): void {}
	public dispatchComponentDidMount(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
		Object.values(this.children).forEach((child) => {
			child.dispatchComponentDidMount();
		});
	}
	private _componentDidUpdate(): void {
		const response = this.componentDidUpdate();
		if (!response) {
			return;
		}	this._removeEvents();	this._render();
	}
	protected componentDidUpdate(): boolean {
		return true;
	}
	protected componentWillUnmount(): void {}

	private _componentWillUnmount(): void {
		this.componentWillUnmount();
		Object.values(this.children).forEach((child) => {
			child.dispatchComponentWillUnmount();
		});
		Object.values(this.lists).forEach((list) => {
			list.forEach((item) => {
				if (item instanceof Block) {
					item.dispatchComponentWillUnmount();
				}
			});
		});
	}
	public dispatchComponentWillUnmount(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_CWU);
	}
	private _getChildrenPropsAndProps(propsAndChildren: BlockProps): {
		children: Record<string, Block>;
		props: BlockProps;
		lists: Record<string, any[]>;
	} {
		const children: Record<string, Block> = {};
		const props: BlockProps = {};
		const lists: Record<string, any[]> = {};	Object.entries(propsAndChildren).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else if (
				Array.isArray(value) &&
				value.every((item) => item instanceof Block)
			) {
				lists[key] = value;
			} else {
				props[key] = value;
			}
		});
		return { children, props, lists };
	}
	protected addAttributes(): void {
		const { attr = {} } = this.props;	Object.entries(attr).forEach(([key, value]) => {
			if (this._element) {
				this._element.setAttribute(key, value as string);
			}
		});
	}
	protected setAttributes(attr: any): void {
		Object.entries(attr).forEach(([key, value]) => {
			if (this._element) {
				this._element.setAttribute(key, value as string);
			}
		});
	}
	public setProps = (nextProps: BlockProps): void => {
		if (!nextProps) {
			return;
		}	const { props, children, lists } = this._getChildrenPropsAndProps(nextProps);	Object.entries(children).forEach(([key, child]) => {
			if (this.children[key]) {
				this.children[key].setProps(child.getProps());
			} else {
				this.children[key] = child;
			}
		});	Object.entries(lists).forEach(([key, list]) => {
			this.lists[key] = list;
		});	Object.assign(this.props, props);
	};public setChild = (key: string, component: Block): void => {
		if (this.children[key]) {
			this.children[key].destroy();
		}	this.children[key] = component;	this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	};public setLists = (nextList: Record<string, any[]>): void => {
		if (!nextList) {
			return;
		}	Object.assign(this.lists, nextList);
	};get element(): HTMLElement | null {
		return this._element;
	}
private _render(): void {
		console.log("Render");
		const propsAndStubs = { ...this.props };
		const tmpId =
			Date.now().toString() + Math.floor(Math.random() * 1000).toString();
		Object.entries(this.children).forEach(([key, child]) => {
			propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
		});	Object.entries(this.lists).forEach(([key]) => {
			propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
		});	const fragment = this._createDocumentElement("template");
		fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);	Object.values(this.children).forEach((child) => {
			const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
			if (stub) {
				stub.replaceWith(child.getContent());
			}
		});	Object.entries(this.lists).forEach(([, child]) => {
			const listCont = this._createDocumentElement("template");
			child.forEach((item) => {
				if (item instanceof Block) {
					listCont.content.append(item.getContent());
				} else {
					listCont.content.append(`${item}`);
				}
			});
			const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
			if (stub) {
				stub.replaceWith(listCont.content);
			}
		});	const newElement = fragment.content.firstElementChild as HTMLElement;
		if (this._element && newElement) {
			this._element.replaceWith(newElement);
		}
		this._element = newElement;
		this._addEvents();
		this.addAttributes();
		this.dispatchComponentDidMount();
	}
	protected render(): string {
		return "";
	}
	public getContent(): HTMLElement {
		if (!this._element) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);		if (!this._element) {
				throw new Error("Element is not created");
			}
		}
		return this._element;
	}
	private _makePropsProxy(props: any): any {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;	return new Proxy(props, {
			get(target: any, prop: string) {
				const value = target[prop];
				return typeof value === "function" ? value.bind(target) : value;
			},
			set(target: any, prop: string, value: any) {
				const oldTarget = { ...target };
				target[prop] = value;
				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty() {
				throw new Error("No access");
			},
		});
	}
	private _createDocumentElement(tagName: string): HTMLTemplateElement {
		return document.createElement(tagName) as HTMLTemplateElement;
	}
	public show(): void {
		const content = this.getContent();
		if (content) {
			content.style.display = "block";
		}
	}
	public hide(): void {
		const content = this.getContent();
		if (content) {
			content.style.display = "none";
		}
	}
	public destroy(): void {
		this.dispatchComponentWillUnmount();	this._removeEvents();
		Object.values(this.children).forEach((child) => {
			child.destroy();
		});
		Object.values(this.lists).forEach((list) => {
			list.forEach((item) => {
				if (item instanceof Block) {
					item.destroy();
				}
			});
		});
		if (this._element) {
			this._element.remove();
		}	this._element = null;
	}
}
