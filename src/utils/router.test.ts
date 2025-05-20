import Router from './router';
import Route from './route';
import Block from './block';
import { checkAuthAndRedirect } from './authRedirect';

jest.mock('./route');
jest.mock('./block');
jest.mock('./authRedirect');

describe('Компонент Router', () => {
	const mockPushState = jest.fn();
	const mockBack = jest.fn();
	const mockForward = jest.fn();

	const mockCheckAuthAndRedirect = checkAuthAndRedirect as jest.MockedFunction<typeof checkAuthAndRedirect>;

	beforeEach(() => {
		jest.clearAllMocks();

		Object.defineProperty(window, 'history', {
			value: {
				pushState: mockPushState,
				back: mockBack,
				forward: mockForward
			},
			writable: true
		});

		Object.defineProperty(window, 'location', {
			value: {
				pathname: '/'
			},
			writable: true
		});

		mockCheckAuthAndRedirect.mockResolvedValue(false);

		// @ts-ignore: доступ к приватному свойству для тестирования
		Router.__instance = null;
	});

	it('getInstance должен возвращать один и тот же экземпляр', () => {
		const router1 = Router.getInstance('#app');
		const router2 = Router.getInstance('#app');

		expect(router1).toBe(router2);
	});

	it('метод use должен добавлять новый маршрут', () => {
		const router = Router.getInstance('#app');
		const mockBlockClass = jest.fn() as unknown as new (props?: Record<string, any>) => Block;

		(Route as jest.MockedClass<typeof Route>).mockImplementation(() => {
			return {
				match: jest.fn(),
				render: jest.fn(),
				leave: jest.fn()
			} as unknown as Route;
		});

		router.use('/test', mockBlockClass);

		expect(Route).toHaveBeenCalledWith('/test', mockBlockClass, {rootQuery: '#app'});

		// @ts-ignore: доступ к приватному свойству для тестирования
		expect(router.routes.length).toBe(1);
	});

	it('метод start должен установить обработчик onpopstate', () => {
		const router = Router.getInstance('#app');
		const spy = jest.spyOn(router as any, '_onRoute');

		router.start();

		expect(window.onpopstate).toBeDefined();

		if (window.onpopstate) {
			window.onpopstate({currentTarget: {location: {pathname: '/test'}}} as unknown as PopStateEvent);
		}

		expect(spy).toHaveBeenCalledWith('/test');
	});

	it('метод go должен вызывать pushState и _onRoute', async () => {
		const router = Router.getInstance('#app');
		const spy = jest.spyOn(router as any, '_onRoute');

		await router.go('/test');

		expect(mockPushState).toHaveBeenCalledWith({}, '', '/test');

		expect(spy).toHaveBeenCalledWith('/test');
	});

	it('метод back должен вызывать history.back', () => {
		const router = Router.getInstance('#app');

		router.back();

		expect(mockBack).toHaveBeenCalled();
	});

	it('метод forward должен вызывать history.forward', () => {
		const router = Router.getInstance('#app');

		router.forward();

		expect(mockForward).toHaveBeenCalled();
	});

	it('метод getRoute должен возвращать соответствующий маршрут', () => {
		const router = Router.getInstance('#app');
		const mockBlockClass = jest.fn() as unknown as new (props?: Record<string, any>) => Block;

		(Route as jest.MockedClass<typeof Route>).mockImplementationOnce(() => {
			return {
				match: (path: string) => path === '/test1',
				render: jest.fn(),
				leave: jest.fn()
			} as unknown as Route;
		});

		(Route as jest.MockedClass<typeof Route>).mockImplementationOnce(() => {
			return {
				match: (path: string) => path === '/test2',
				render: jest.fn(),
				leave: jest.fn()
			} as unknown as Route;
		});

		router.use('/test1', mockBlockClass);
		router.use('/test2', mockBlockClass);

		const route1 = router.getRoute('/test1');
		const route2 = router.getRoute('/test2');
		const routeNotFound = router.getRoute('/not-found');

		expect(route1).toBeDefined();
		expect(route2).toBeDefined();
		expect(routeNotFound).toBeUndefined();

		if (route1 && route2) {
			expect(route1.match('/test1')).toBe(true);
			expect(route2.match('/test2')).toBe(true);
		}
	});

	it('метод _onRoute должен вызывать checkAuthAndRedirect и обрабатывать редирект', async () => {
		const router = Router.getInstance('#app');
		const mockSetCurrentRoute = jest.spyOn(router as any, '_setCurrentRoute');

		mockCheckAuthAndRedirect.mockResolvedValueOnce(true);

		await (router as any)._onRoute('/test');

		expect(mockCheckAuthAndRedirect).toHaveBeenCalledWith('/test');

		expect(mockSetCurrentRoute).not.toHaveBeenCalled();
	});
});
