import { AppState } from "../types";
import { EventBus } from "./event-bus";
import set from "./set";

export enum StoreEvents {
	Updated = "updated",
}

class Store extends EventBus {
	private state: AppState = {};

	constructor() {
		super();
	}

	public getState() {
		return this.state;
	}

	public set(path: string, value: unknown) {
		this.state = set(this.state, path, value);
		this.emit(StoreEvents.Updated);
	}
}

export default new Store();
