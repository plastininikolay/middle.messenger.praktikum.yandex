import Route from "./route";
import Block from "./block";
import {PAGE_NAMES} from "../types.ts";

class Router {
	private static __instance: Router | null = null;
	private routes: Route[] = [];
	private history: History = window.history;
	private _currentRoute: Route | null = null;
	private readonly _rootQuery: string;

	private constructor(rootQuery: string) {
		this._rootQuery = rootQuery;
	}

	public static getInstance(rootQuery: string): Router {
		if (!Router.__instance) {
			Router.__instance = new Router(rootQuery);
		}
		return Router.__instance;
	}

	use(
		pathname: string,
		block: new (props?: Record<string, any>) => Block,
	): Router {
		const route = new Route(pathname, block, { rootQuery: this._rootQuery });
		this.routes.push(route);
		return this;
	}

	start(): void {
		window.onpopstate = (event) => {
			const target = event.currentTarget as Window;
			this._onRoute(target.location.pathname);
		};

		this._onRoute(window.location.pathname);
	}

	private _onRoute(pathname: string): void {
		const route = this.getRoute(pathname);
		if (!route) {
			// Если маршрут не найден, перенаправляем на страницу 404
			const notFoundRoute = this.getRoute(`/${PAGE_NAMES.notFound}`);
			if (notFoundRoute) {
				this._setCurrentRoute(notFoundRoute);
			}
			return;
		}

		this._setCurrentRoute(route);
	}

	// Выделяем логику установки текущего маршрута в отдельный метод
	private _setCurrentRoute(route: Route): void {
		// Если есть текущий маршрут и он отличается от нового,
		// вызываем leave() для корректного уничтожения компонентов
		if (this._currentRoute && this._currentRoute !== route) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route.render();
	}

	go(pathname: string): void {
		this.history.pushState({}, "", pathname);
		this._onRoute(pathname);
	}

	back(): void {
		this.history.back();
	}

	forward(): void {
		this.history.forward();
	}

	getRoute(pathname: string): Route | undefined {
		return this.routes.find((route) => route.match(pathname));
	}
}

export default Router;
