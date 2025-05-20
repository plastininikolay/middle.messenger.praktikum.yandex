import Block from "../../utils/block";
import {InfoItem} from "../../components/InfoItem/infoItem";
import {Button} from "../../components/Button/Button";
import {ButtonVariantEnum} from "../../components/Button/types";
import "../../styles/profile.scss";
import {AppState, TYPES_VALIDATION} from "../../types";
import {getFormData} from "../../utils/logForm";
import {validateInput} from "../../utils/validation";
import {InfoItemProps} from "../../components/InfoItem/types";
import connect from "../../utils/connect";
import userController from "../../controllers/user";
import {Avatar} from "../../components/Avatar/Avatar.ts";

class ProfileEditPageBase extends Block {
	constructor(props: Record<string, any>) {
		const {user = {}} = props;
		const username = `${user.first_name} ${user.second_name}`;
		const FormEmail = new InfoItem({
			labelText: "Почта",
			name: "email",
			value: String(user.email || ""),
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
			value: String(user.login || ""),
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
			value: String(user.first_name || ""),
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
			name: "second_name",
			value: String(user.second_name || ""),
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
			name: "display_name",
			value: String(user.display_name || ""),
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
			value: String(user.phone || ""),
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
		});	const validateAll = () => {
			FormFirstName.validate();
			FormSecondName.validate();
			FormLogin.validate();
			FormEmail.validate();
			FormPhone.validate();
			FormChatName.validate();
		};	const onClickButton = async () => {
			validateAll();
			const formData = getFormData([
				FormFirstName,
				FormSecondName,
				FormLogin,
				FormEmail,
				FormPhone,
				FormChatName,
			]) as Record<string, string>;		await userController.changeUserProfile({
				first_name: formData.first_name,
				second_name: formData.second_name,
				display_name: formData.display_name,
				login: formData.login,
				email: formData.email,
				phone: formData.phone,
			});
		};	super({
			...props,
			username,
			FormEmail,
			FormLogin,
			FormFirstName,
			FormSecondName,
			FormChatName,
			FormPhone,
			UserAvatar: new Avatar({
				size: 'large',
				editable: true
			}),
			SaveButton: new Button({
				isFull: true,
				label: "Сохранить",
				variant: ButtonVariantEnum.PRIMARY,
				events: {
					click: onClickButton,
				},
			}),
		});}
	override render() {
		return `
            <main class="profile-container">
                <div class="profile-header">
                     {{{ UserAvatar }}}
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
                    ${this.props.requestStatus.loading ? '<div class="loader"></div>' : "{{{ SaveButton }}}"}
                    </div>
                   	${this.props.requestStatus.error ? `<div class="error-message">${this.props.requestStatus.error}</div>` : ""}
                </div>
            </main>`;
	}
}

const mapStateToProps = (state: Partial<AppState>) => ({
	user: state.user,
	requestStatus: state.requestStatus
});

export const ProfileEditPage = connect(mapStateToProps)(ProfileEditPageBase);
