import Block from "../../utils/block.ts";
import {Button} from "../../components/Button/Button.ts";
import {ButtonVariantEnum} from "../../components/Button/types.ts";
import {FormGroup} from "../../components/FormGroup/FormGroup.ts";
import '../../styles/form.scss'
import {PAGE_NAMES} from "../../App.ts";
import {getFormData} from "../../utils/logForm.ts";
import {TYPES_VALIDATION} from "../../types.ts";

export class AuthPage extends Block {
	constructor() {
		const FormLogin = new FormGroup({name: 'login', type: 'text', labelText: 'Логин', typeOfValidation: TYPES_VALIDATION.login});
		const FormPassword = new FormGroup({name: 'password', type: 'password', labelText: 'Пароль', typeOfValidation: TYPES_VALIDATION.password});
		const validateAll = () => {
			FormLogin.validate();
			FormPassword.validate();
		}
		const onClickButton = () => {
			validateAll();
			console.log(getFormData([
				FormLogin,
				FormPassword,
			]))
		}
		super({
			FormLogin,
			FormPassword,
			ButtonAuth: new Button({
				isFull: false,
				url: PAGE_NAMES.chats,
				variant: ButtonVariantEnum.PRIMARY,
				label: 'Авторизоваться',
				onClick: onClickButton,
			}),
			ButtonReg: new Button({
				isFull: false,
				isLink: true,
				url: PAGE_NAMES.registration,
				variant: ButtonVariantEnum.SECONDARY,
				label: 'Нет аккаунта?'
			}),
		});
	}

	override render() {
		return `
			<main class="form-container">
				<div class="form-title">
					<h1>Вход</h1>
				</div>
				<form action="#" method="POST">
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
