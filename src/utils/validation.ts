import { BaseInputType, TYPES_VALIDATION } from "../types";

interface validateInputProps {
	value?: string;
	props: BaseInputType;
}

export const validateInput = ({ value = "", props }: validateInputProps) => {
	const { required, typeOfValidation } = props as BaseInputType;
	let isValid = true;
	let message = "";

	const namePattern = /^[A-Za-zА-Яа-яЁё][-A-Za-zА-Яа-яЁё]*$/;

	if (required && !value) {
		isValid = false;
		message = "Это поле обязательно для заполнения.";
	} else {
		switch (typeOfValidation) {
			case TYPES_VALIDATION.first_name:
				if (!namePattern.test(value)) {
					isValid = false;
					message = "Имя должно содержать только буквы и дефисы.";
				}
				break;
			case TYPES_VALIDATION.second_name:
				if (!namePattern.test(value)) {
					isValid = false;
					message = "Фамилия должна содержать только буквы и дефисы.";
				}
				break;

			case TYPES_VALIDATION.login: {
				const loginPattern = /^(?![0-9]*$)[A-Za-z0-9_-]{3,20}$/;
				if (!loginPattern.test(value)) {
					isValid = false;
					message =
						"Логин должен содержать от 3 до 20 символов, включать буквы и цифры, без пробелов и спецсимволов.";
				}
				break;
			}

			case TYPES_VALIDATION.email: {
				const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
				if (!emailPattern.test(value)) {
					isValid = false;
					message = "Введите корректный адрес электронной почты.";
				}
				break;
			}

			case TYPES_VALIDATION.phone: {
				const phonePattern = /\b\d{10,15}\b/g;
				if (!phonePattern.test(value)) {
					isValid = false;
					message = "Номер телефона должен содержать от 10 до 15 символов.";
				}
				break;
			}

			case TYPES_VALIDATION.message:
				if (!value) {
					isValid = false;
					message = "Сообщение не должно быть пустым.";
				}
				break;

			default:
				break;
		}
	}
	if (!isValid) {
		props.validationMessage = message;
	} else {
		props.validationMessage = "";
	}
	props.value = value;
	return isValid;
};
