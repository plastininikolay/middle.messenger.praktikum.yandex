import Block from "./block";
import render from "./render";

class Route {
	private _pathname: string;
	private _blockClass: new (props?: Record<string, any>) => Block;
	private _block: Block | null;
	private _props: { rootQuery: string };

	constructor(
		pathname: string,
		view: new (props?: Record<string, any>) => Block,
		props: { rootQuery: string },
	) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
	}

	navigate(pathname: string): void {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave(): void {
		if (this._block) {
			this._block.destroy();
			this._block = null;
		}
	}

	match(pathname: string): boolean {
		return pathname === this._pathname;
	}

	render(): void {
		if (!this._block) {
			this._block = new this._blockClass({});
			render(this._props.rootQuery, this._block);
			return;
		}

		this._block.show();
	}
}

export default Route;
