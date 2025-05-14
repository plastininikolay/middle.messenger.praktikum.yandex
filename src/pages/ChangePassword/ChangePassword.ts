import Block from "../../utils/block";
import { InfoItem } from "../../components/InfoItem/infoItem";
import { Button } from "../../components/Button/Button";
import { ButtonVariantEnum } from "../../components/Button/types";
import "../../styles/profile.scss";
import { PAGE_NAMES, TYPES_VALIDATION, UserData } from "../../types";
import { avatarUrl } from "../../mocks";
import { getFormData } from "../../utils/logForm";
import { validateInput } from "../../utils/validation";
import { InfoItemProps } from "../../components/InfoItem/types";

export class ChangePasswordPage extends Block {
	constructor(user: UserData) {
		const OldPassword = new InfoItem({
			labelText: "Старый пароль",
			name: "password",
			value: user.password,
		});
		const NewPassword = new InfoItem({
			labelText: "Новый пароль",
			name: "new_password",
			value: "",
			edit: true,
			typeOfValidation: TYPES_VALIDATION.password,
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props: this.children.NewPassword.getProps() as InfoItemProps,
					});
				},
			},
		});
		const CheckNewPassword = new InfoItem({
			labelText: "Повторите новый пароль",
			name: "check_new_password",
			value: "",
			edit: true,
			typeOfValidation: TYPES_VALIDATION.password,
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props: this.children.CheckNewPassword.getProps() as InfoItemProps,
					});
				},
			},
		});

		const validateAll = () => {
			NewPassword.validate();
			CheckNewPassword.validate();
		};
		const onClickButton = () => {
			validateAll();
			console.log(getFormData([NewPassword, CheckNewPassword]));
		};
		super({
			avatar: user.avatar,
			username: user.username || "User",
			OldPassword,
			NewPassword,
			CheckNewPassword,
			SaveButton: new Button({
				isFull: true,
				url: PAGE_NAMES.profile,
				label: "Сохранить",
				variant: ButtonVariantEnum.PRIMARY,
				events: {
					click: onClickButton,
				},
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
                    {{{ OldPassword }}}
                    {{{ NewPassword }}}
                    {{{ CheckNewPassword }}}
                </div>
                <div class="profile-actions">
                    <div class="profile-buttons">
                        {{{ SaveButton }}}
                    </div>
                </div>
            </main>`;
	}
}
