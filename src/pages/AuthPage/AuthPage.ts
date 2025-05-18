import Block from "../../utils/block";
import { Button } from "../../components/Button/Button";
import { ButtonVariantEnum } from "../../components/Button/types";
import { FormGroup } from "../../components/FormGroup/FormGroup";
import "../../styles/form.scss";
import { AppState, PAGE_NAMES } from "../../types";
import { getFormData } from "../../utils/logForm";
import { TYPES_VALIDATION } from "../../types";
import { validateInput } from "../../utils/validation";
import { FormGroupProps } from "../../components/FormGroup/types";
import Router from "../../utils/router";
import userAuthController from "../../controllers/user-login";
import connect from "../../utils/connect";

class AuthPageBase extends Block {
	constructor(props: Record<string, any>) {
		const FormLogin = new FormGroup({
			name: "login",
			type: "text",
			labelText: "Логин",
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
		const FormPassword = new FormGroup({
			name: "password",
			type: "password",
			labelText: "Пароль",
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
		const validateAll = () => {
			FormLogin.validate();
			FormPassword.validate();
		};
		const onClickButton = async () => {
			validateAll();
			if (FormLogin.isValid() && FormPassword.isValid()) {
				const formData = getFormData([FormLogin, FormPassword]) as Record<
					string,
					string
				>;
				await userAuthController.login({
					login: formData.login,
					password: formData.password,
				});
			}
		};	const onRegisterClick = () => {
			Router.getInstance("#app").go(`/${PAGE_NAMES.registration}`);
		};	super({
			...props,
			FormLogin,
			FormPassword,
			ButtonAuth: new Button({
				isFull: false,
				variant: ButtonVariantEnum.PRIMARY,
				label: "Авторизоваться",
				events: {
					click: onClickButton,
				},
			}),
			ButtonReg: new Button({
				isFull: false,
				isLink: true,
				url: PAGE_NAMES.registration,
				variant: ButtonVariantEnum.SECONDARY,
				label: "Нет аккаунта?",
				events: {
					click: onRegisterClick,
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
					<h1>Вход</h1>
				</div>
				<form>
				   <div>
					   {{{ FormLogin }}}
					   {{{ FormPassword }}}
				   </div>
					<div class="form-button-container">
						${this.props.requestStatus.loading ? '<div class="loader"></div>' : "{{{ ButtonAuth }}}"}
						{{{ ButtonReg }}}
					</div>
					${this.props.requestStatus.error ? `<div class="error-message">${this.props.requestStatus.error}</div>` : ""}
				</form>
			</main>`;
	}
}

const mapStateToProps = (state: Partial<AppState>) => ({
	requestStatus: state.requestStatus,
});

export const AuthPage = connect(mapStateToProps)(AuthPageBase);
