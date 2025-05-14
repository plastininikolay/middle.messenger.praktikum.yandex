import Block from "../../utils/block";
import { InfoItem } from "../../components/InfoItem/infoItem";
import { Button } from "../../components/Button/Button";
import { ButtonVariantEnum } from "../../components/Button/types";
import "../../styles/profile.scss";
import { TYPES_VALIDATION, UserData } from "../../types";
import { avatarUrl } from "../../mocks";
import { getFormData } from "../../utils/logForm";
import { validateInput } from "../../utils/validation";
import { InfoItemProps } from "../../components/InfoItem/types";

export class ProfileEditPage extends Block {
	constructor(user: UserData) {
		const FormEmail = new InfoItem({
			labelText: "Почта",
			name: "email",
			value: String(user.email),
			edit: true,
			typeOfValidation: TYPES_VALIDATION.email,
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props: this.children.FormEmail.getProps() as InfoItemProps,
					});
				},
			},
		});
		const FormLogin = new InfoItem({
			labelText: "Логин",
			name: "login",
			value: String(user.login),
			edit: true,
			typeOfValidation: TYPES_VALIDATION.login,
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props: this.children.FormLogin.getProps() as InfoItemProps,
					});
				},
			},
		});
		const FormFirstName = new InfoItem({
			labelText: "Имя",
			name: "first_name",
			value: String(user.firstName),
			edit: true,
			typeOfValidation: TYPES_VALIDATION.first_name,
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props: this.children.FormFirstName.getProps() as InfoItemProps,
					});
				},
			},
		});
		const FormSecondName = new InfoItem({
			labelText: "Фамилия",
			name: "last_name",
			value: String(user.lastName),
			edit: true,
			typeOfValidation: TYPES_VALIDATION.second_name,
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props: this.children.FormSecondName.getProps() as InfoItemProps,
					});
				},
			},
		});
		const FormChatName = new InfoItem({
			labelText: "Имя в чате",
			name: "chat_name",
			value: String(user.chatName),
			edit: true,
			typeOfValidation: TYPES_VALIDATION.first_name,
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props: this.children.FormChatName.getProps() as InfoItemProps,
					});
				},
			},
		});
		const FormPhone = new InfoItem({
			labelText: "Телефон",
			name: "phone",
			value: String(user.phone),
			edit: true,
			typeOfValidation: TYPES_VALIDATION.phone,
			eventsForInput: {
				blur: (e) => {
					const element = e.currentTarget as HTMLInputElement;
					validateInput({
						value: element?.value,
						props: this.children.FormPhone.getProps() as InfoItemProps,
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
			FormChatName.validate();
		};
		const onClickButton = () => {
			validateAll();
			console.log(
				getFormData([
					FormFirstName,
					FormSecondName,
					FormLogin,
					FormEmail,
					FormPhone,
					FormChatName,
				]),
			);
		};
		super({
			avatar: user.avatar,
			username: user.username || "User",
			FormEmail,
			FormLogin,
			FormFirstName,
			FormSecondName,
			FormChatName,
			FormPhone,
			SaveButton: new Button({
				isFull: true,
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
                    {{{ FormEmail }}}
                    {{{ FormLogin }}}
                    {{{ FormFirstName }}}
                    {{{ FormSecondName }}}
                    {{{ FormChatName }}}
                    {{{ FormPhone }}}
                </div>
                <div class="profile-actions">
                    <div class="profile-buttons">
                        {{{ SaveButton }}}
                    </div>
                </div>
            </main>`;
	}
}
