import { AppState } from "../types";
import Block from "./block";
import cloneDeep from "./cloneDeep";
import isEqual from "./isEqual";
import store, { StoreEvents } from "./store";

function connect(mapStateToProps: (state: AppState) => Partial<AppState>) {
	return function (Component: typeof Block) {
		return class extends Component {
			constructor(props: any) {
				let state = cloneDeep(mapStateToProps(store.getState()));
				super({ ...props, ...state });

				store.on(StoreEvents.Updated, () => {
					const newState = mapStateToProps(store.getState());
					if (!isEqual(state, newState)) {
						this.setProps({ ...newState });
					}

					state = cloneDeep(newState);
				});
			}
		};
	};
}

export default connect;
