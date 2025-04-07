import {FormGroup} from "../../components/FormGroup/FormGroup.ts";
import Block from "../../utils/block.ts";
import {Button} from "../../components/Button/Button.ts";
import {ButtonVariantEnum} from "../../components/Button/types.ts";
import {PAGE_NAMES} from "../../App.ts";
import {getFormData} from "../../utils/logForm.ts";
import {TYPES_VALIDATION} from "../../types.ts";

export class RegistrationPage extends Block {
	constructor() {
		const FormFirstName = new FormGroup({type: 'text', name: 'first_name', labelText: 'Имя', required: true, typeOfValidation: TYPES_VALIDATION.first_name});
		const FormSecondName = new FormGroup({type: 'text', name: 'second_name', labelText: 'Фамилия', required: true, typeOfValidation: TYPES_VALIDATION.second_name});
		const FormLogin = new FormGroup({type: 'text', name: 'login', labelText: 'Логин', required: true, typeOfValidation: TYPES_VALIDATION.login});
		const FormEmail = new FormGroup({type: 'email', name: 'email', labelText: 'Почта', required: true, typeOfValidation: TYPES_VALIDATION.email});
		const FormPhone = new FormGroup({type: 'phone', name: 'phone', labelText: 'Телефон', required: true, typeOfValidation: TYPES_VALIDATION.phone});
		const FormPassword = new FormGroup({type: 'password', name: 'password', labelText: 'Пароль', required: true, typeOfValidation: TYPES_VALIDATION.password});
		const FormConfirmPassword = new FormGroup({
			type: 'password',
			name: 'confirm-password',
			labelText: 'Пароль (ещё раз)'
		})
		const validateAll = () => {
			FormFirstName.validate();
			FormSecondName.validate();
			FormLogin.validate();
			FormEmail.validate();
			FormPhone.validate();
			FormPassword.validate();
			FormConfirmPassword.validate();
		}
		const onClickButton = () => {
			validateAll();
			console.log(getFormData([
				FormFirstName,
				FormSecondName,
				FormLogin,
				FormEmail,
				FormPhone,
				FormPassword,
				FormConfirmPassword
			]))
		}
		super({
			FormFirstName,
			FormSecondName,
			FormLogin,
			FormEmail,
			FormPhone,
			FormPassword,
			FormConfirmPassword,
			ButtonRegister: new Button({
				url: PAGE_NAMES.chats,
				label: 'Зарегистрироваться',
				variant: ButtonVariantEnum.PRIMARY,
				onClick: onClickButton,
			}),
			ButtonLogin: new Button({
				isLink: true,
				url: PAGE_NAMES.authentication,
				label: 'Войти',
				variant: ButtonVariantEnum.SECONDARY,
			}),
		});
	}

	override render() {
		return `
            <main class="form-container">
                <div class="form-title">
                    <h1>Регистрация</h1>
                </div>
                <form action="#" method="POST">
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
                        {{{ ButtonRegister }}}
                        {{{ ButtonLogin }}}
                    </div>
                </form>
            </main>`;
	}
}
