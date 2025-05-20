import Router from "../utils/router";
import UserAuthController from "../controllers/user-login";
import { PAGE_NAMES } from "../types";

/**
 * Функция для проверки авторизации и выполнения редиректов
 * @param currentPage - текущий путь страницы
 * @returns Promise<boolean> - возвращает true, если редирект был выполнен
 */
export async function checkAuthAndRedirect(currentPage: string): Promise<boolean> {
	try {
		const isAuthenticated = await UserAuthController.checkAuth();

		const router = Router.getInstance("#app");

		const isAuthPage = currentPage === `/${PAGE_NAMES.authentication}` ||
			currentPage === `/${PAGE_NAMES.registration}` ||
			currentPage === '/';

		if (!isAuthenticated && !isAuthPage) {
			console.log('Пользователь не авторизован. Редирект на страницу входа.');
			router.go(`/${PAGE_NAMES.authentication}`);
			return true;
		}

		if (isAuthenticated && isAuthPage) {
			console.log('Пользователь уже авторизован. Редирект на страницу чатов.');
			router.go(`/${PAGE_NAMES.chats}`);
			return true;
		}

		return false;
	} catch (error) {
		console.error('Ошибка при проверке авторизации:', error);

		Router.getInstance("#app").go(`/${PAGE_NAMES.authentication}`);
		return true;
	}
}
