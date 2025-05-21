import queryStringify from './queryStringify';
import {HTTPTransport} from "./httpTransport.ts";

jest.mock('./queryStringify', () => jest.fn().mockReturnValue('?mocked=query'));

describe('Класс HTTPTransport', () => {
	let http: HTTPTransport;
	let xhrMock: any;

	beforeEach(() => {
		http = new HTTPTransport();

		xhrMock = {
			open: jest.fn(),
			send: jest.fn(),
			setRequestHeader: jest.fn(),
			onload: null,
			onabort: null,
			onerror: null,
			ontimeout: null,
			timeout: 0,
			withCredentials: false
		};

		global.XMLHttpRequest = jest.fn(() => xhrMock) as any;

		jest.clearAllMocks();
	});

	it('метод get должен правильно вызывать request с методом GET', () => {
		const requestSpy = jest.spyOn(http, 'request').mockImplementation(() => Promise.resolve({} as XMLHttpRequest));

		http.get('/test', { headers: { 'Content-Type': 'application/json' } });

		expect(requestSpy).toHaveBeenCalledWith(
			'/test',
			{
				headers: { 'Content-Type': 'application/json' },
				method: 'GET'
			},
			undefined
		);
	});

	it('метод post должен правильно вызывать request с методом POST', () => {
		const requestSpy = jest.spyOn(http, 'request').mockImplementation(() => Promise.resolve({} as XMLHttpRequest));

		http.post('/test', { data: { foo: 'bar' } });

		expect(requestSpy).toHaveBeenCalledWith(
			'/test',
			{
				data: { foo: 'bar' },
				method: 'POST'
			},
			undefined
		);
	});

	it('метод request должен создавать XMLHttpRequest и настраивать его', () => {
		http.request('/test', { method: 'GET', withCredentials: false }, 1000);

		expect(global.XMLHttpRequest).toHaveBeenCalled();

		expect(xhrMock.open).toHaveBeenCalledWith('GET', '/test');

		expect(xhrMock.timeout).toBe(1000);
		expect(xhrMock.withCredentials).toBe(false);
	});

	it('метод request должен добавлять query параметры для GET запросов с данными', () => {
		http.request('/test', { method: 'GET', data: { foo: 'bar' } });

		expect(queryStringify).toHaveBeenCalledWith({ foo: 'bar' });

		expect(xhrMock.open).toHaveBeenCalledWith('GET', '/test?mocked=query');
	});

	it('метод request должен отправлять данные в формате JSON для не-GET запросов', () => {
		const data = { foo: 'bar' };

		http.request('/test', { method: 'POST', data });

		expect(xhrMock.send).toHaveBeenCalledWith(JSON.stringify(data));
	});

	it('метод request должен отправлять FormData как есть', () => {
		const formData = new FormData();

		http.request('/test', { method: 'POST', data: formData });

		expect(xhrMock.send).toHaveBeenCalledWith(formData);
	});
});
