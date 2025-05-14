import Block from "../../utils/block";
import { Button } from "../../components/Button/Button";
import { ButtonVariantEnum } from "../../components/Button/types";
import { FormGroup } from "../../components/FormGroup/FormGroup";
import "../../styles/form.scss";
import { PAGE_NAMES } from "../../types";
import { getFormData } from "../../utils/logForm";
import { TYPES_VALIDATION } from "../../types";
import { validateInput } from "../../utils/validation";
import { FormGroupProps } from "../../components/FormGroup/types";

export class AuthPage extends Block {
	constructor() {
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
		const onClickButton = () => {
			validateAll();
			console.log(getFormData([FormLogin, FormPassword]));
		};
		super({
			FormLogin,
			FormPassword,
			ButtonAuth: new Button({
				isFull: false,
				url: PAGE_NAMES.chats,
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
			}),
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
						{{{ ButtonAuth }}}
						{{{ ButtonReg }}}
					</div>
				</form>
			</main>`;
	}
}
