import Block from "../../utils/block.ts";
import {InfoItem} from "../../components/InfoItem/infoItem.ts";
import {Button} from "../../components/Button/Button.ts";
import {ButtonVariantEnum} from "../../components/Button/types.ts";
import '../../styles/profile.scss'
import {TYPES_VALIDATION, UserData} from "../../types.ts";
import {PAGE_NAMES} from "../../App.ts";
import {avatarUrl} from "../../mocks.ts";
import {getFormData} from "../../utils/logForm.ts";

export class ChangePasswordPage extends Block {
	constructor(user: UserData) {
			const OldPassword = new InfoItem({labelText: 'Старый пароль', name: 'password', value: user.password});
			const NewPassword = new InfoItem({labelText: 'Новый пароль', name: 'new_password', value: '', edit: true, typeOfValidation: TYPES_VALIDATION.password});
			const CheckNewPassword = new InfoItem({labelText: 'Повторите новый пароль', name: 'check_new_password', value: '', edit: true, typeOfValidation: TYPES_VALIDATION.password});

		const validateAll = () => {
			NewPassword.validate();
			CheckNewPassword.validate();
		}
		const onClickButton = () => {
			validateAll();
			console.log(getFormData([
				NewPassword,
				CheckNewPassword
			]))
		}
			super({
			avatar: user.avatar,
			username: user.username || 'User',
			InfoItems: [
				OldPassword,
				NewPassword,
				CheckNewPassword
			],
			SaveButton: new Button({
				isFull: true,
				url: PAGE_NAMES.profile,
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
