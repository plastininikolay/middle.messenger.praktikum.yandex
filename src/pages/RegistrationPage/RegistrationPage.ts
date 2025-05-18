import { FormGroup } from "../../components/FormGroup/FormGroup";
import Block from "../../utils/block";
import { Button } from "../../components/Button/Button";
import { ButtonVariantEnum } from "../../components/Button/types";
import { AppState, PAGE_NAMES } from "../../types";
import { getFormData } from "../../utils/logForm";
import { TYPES_VALIDATION } from "../../types";
import { validateInput } from "../../utils/validation";
import { FormGroupProps } from "../../components/FormGroup/types";
import Router from "../../utils/router";
import userAuthController from "../../controllers/user-login";
import connect from "../../utils/connect";

class RegistrationPageBase extends Block {
	constructor(props: Record<string, any>) {
		const FormFirstName = new FormGroup({
			type: "text",
			name: "first_name",
			labelText: "Имя",
			required: true,
			typeOfValidation: TYPES_VALIDATION.first_name,
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props: this.children.FormFirstName.getProps() as FormGroupProps,
					});
				},
			},
		});
		const FormSecondName = new FormGroup({
			type: "text",
			name: "second_name",
			labelText: "Фамилия",
			required: true,
			typeOfValidation: TYPES_VALIDATION.second_name,
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props: this.children.FormSecondName.getProps() as FormGroupProps,
					});
				},
			},
		});
		const FormLogin = new FormGroup({
			type: "text",
			name: "login",
			labelText: "Логин",
			required: true,
			typeOfValidation: TYPES_VALIDATION.login,
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props: this.children.FormLogin.getProps() as FormGroupProps,
					});
				},
			},
		});
		const FormEmail = new FormGroup({
			type: "email",
			name: "email",
			labelText: "Почта",
			required: true,
			typeOfValidation: TYPES_VALIDATION.email,
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props: this.children.FormEmail.getProps() as FormGroupProps,
					});
				},
			},
		});
		const FormPhone = new FormGroup({
			type: "phone",
			name: "phone",
			labelText: "Телефон",
			required: true,
			typeOfValidation: TYPES_VALIDATION.phone,
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props: this.children.FormPhone.getProps() as FormGroupProps,
					});
				},
			},
		});
		const FormPassword = new FormGroup({
			type: "password",
			name: "password",
			labelText: "Пароль",
			required: true,
			typeOfValidation: TYPES_VALIDATION.password,
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props: this.children.FormPassword.getProps() as FormGroupProps,
					});
				},
			},
		});
		const FormConfirmPassword = new FormGroup({
			type: "password",
			name: "confirm-password",
			labelText: "Пароль (ещё раз)",
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props:
							this.children.FormConfirmPassword.getProps() as FormGroupProps,
					});
				},
			},
		});
		const validateAll = () => {
			FormFirstName.validate();
			FormSecondName.validate();
			FormLogin.validate();
			FormEmail.validate();
			FormPhone.validate();
			FormPassword.validate();
			FormConfirmPassword.validate();
		};
		const onClickButton = async () => {
			validateAll();		// Проверяем валидность всех форм перед отправкой
			if (
				FormFirstName.isValid() &&
				FormSecondName.isValid() &&
				FormLogin.isValid() &&
				FormEmail.isValid() &&
				FormPhone.isValid() &&
				FormPassword.isValid() &&
				FormConfirmPassword.isValid()
			) {
				const formData = getFormData([
					FormFirstName,
					FormSecondName,
					FormLogin,
					FormEmail,
					FormPhone,
					FormPassword,
					FormConfirmPassword,
				]) as Record<string, string>;			// Проверяем совпадение паролей
				if (formData.password !== formData["confirm-password"]) {
					// Устанавливаем ошибку для поля подтверждения пароля
					FormConfirmPassword.setProps({
						validationMessage: "Пароли не совпадают",
					});
					return;
				}			await userAuthController.signup({
					first_name: formData.first_name,
					second_name: formData.second_name,
					login: formData.login,
					email: formData.email,
					password: formData.password,
					phone: formData.phone,
				});
			}
		};	const onLoginClick = () => {
			Router.getInstance("#app").go(`/${PAGE_NAMES.authentication}`);
		};	super({
			...props,
			FormFirstName,
			FormSecondName,
			FormLogin,
			FormEmail,
			FormPhone,
			FormPassword,
			FormConfirmPassword,
			ButtonRegister: new Button({
				label: "Зарегистрироваться",
				variant: ButtonVariantEnum.PRIMARY,
				events: {
					click: onClickButton,
				},
			}),
			ButtonLogin: new Button({
				isLink: true,
				url: PAGE_NAMES.authentication,
				label: "Войти",
				variant: ButtonVariantEnum.SECONDARY,
				events: {
					click: onLoginClick,
				},
			}),
			errorText: "",
			isLoading: false,
		});
	}
	override render() {
		return `
            <main class="form-container">
                <div class="form-title">
                    <h1>Регистрация</h1>
                </div>
                <form>
                    <div>
                        {{{ FormFirstName }}}
                        {{{ FormSecondName }}}
                        {{{ FormLogin }}}
                        {{{ FormEmail }}}
                        {{{ FormPhone }}}
                        {{{ FormPassword }}}
                        {{{ FormConfirmPassword }}}
                    </div>
                    <div class="form-button-container">
                        ${this.props.requestStatus.loading ? '<div class="loader"></div>' : "{{{ ButtonRegister }}}"}
                        {{{ ButtonLogin }}}
                    </div>
                    ${this.props.requestStatus.error ? `<div class="error-message">${this.props.requestStatus.error}</div>` : ""}
                </form>
            </main>`;
	}
}

const mapStateToProps = (state: AppState) => ({
	requestStatus: state.requestStatus,
});

export const RegistrationPage = connect(mapStateToProps)(RegistrationPageBase);
