import Block from "../../utils/block.ts";
import {InfoItem} from "../../components/InfoItem/infoItem.ts";
import {Button} from "../../components/Button/Button.ts";
import {ButtonVariantEnum} from "../../components/Button/types.ts";
import '../../styles/profile.scss'
import {TYPES_VALIDATION, UserData} from "../../types.ts";
import {avatarUrl} from "../../mocks.ts";
import {getFormData} from "../../utils/logForm.ts";

export class ProfileEditPage extends Block {
	constructor(user: UserData) {

			const FormEmail = new InfoItem({labelText: 'Почта', name: 'email', value: String(user.email), edit: true, typeOfValidation: TYPES_VALIDATION.email});
			const FormLogin = new InfoItem({labelText: 'Логин', name: 'login', value: String(user.login), edit: true, typeOfValidation: TYPES_VALIDATION.login});
			const FormFirstName = new InfoItem({labelText: 'Имя', name: 'first_name', value: String(user.firstName), edit: true, typeOfValidation: TYPES_VALIDATION.first_name});
			const FormSecondName = new InfoItem({labelText: 'Фамилия', name: 'last_name', value: String(user.lastName), edit: true, typeOfValidation: TYPES_VALIDATION.second_name});
			const FormChatName = new InfoItem({labelText: 'Имя в чате', name: 'chat_name', value: String(user.chatName), edit: true, typeOfValidation: TYPES_VALIDATION.first_name});
			const FormPhone = new InfoItem({labelText: 'Телефон', name: 'phone', value: String(user.phone), edit: true, typeOfValidation: TYPES_VALIDATION.phone});

		const validateAll = () => {
			FormFirstName.validate();
			FormSecondName.validate();
			FormLogin.validate();
			FormEmail.validate();
			FormPhone.validate();
			FormChatName.validate();
		}
		const onClickButton = () => {
			validateAll();
			console.log(getFormData([
				FormFirstName,
				FormSecondName,
				FormLogin,
				FormEmail,
				FormPhone,
				FormChatName,
			]))
		}
		super({
			avatar: user.avatar,
			username: user.username || 'User',
			InfoItems: [
				FormEmail,
				FormLogin,
				FormFirstName,
				FormSecondName,
				FormChatName,
				FormPhone
			],
			SaveButton: new Button({
				isFull: true,
				label: 'Сохранить',
				variant: ButtonVariantEnum.PRIMARY,
				onClick: onClickButton,
			}),
		});
	}

	override render() {
		return `
            <main class="profile-container">
                <div class="profile-header">
                    <img src="${this.props.avatar || avatarUrl}" alt="Аватар пользователя" class="avatar">
                    <h1 class="username">${this.props.username}</h1>
                </div>
                <div class="profile-info">
                    {{{ InfoItems }}}
                </div>
                <div class="profile-actions">
                    <div class="profile-buttons">
                        {{{ SaveButton }}}
                    </div>
                </div>
            </main>`;
	}
}
