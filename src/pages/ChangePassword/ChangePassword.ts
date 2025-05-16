import Block from "../../utils/block";
import { InfoItem } from "../../components/InfoItem/infoItem";
import { Button } from "../../components/Button/Button";
import { ButtonVariantEnum } from "../../components/Button/types";
import "../../styles/profile.scss";
import { AppState, PAGE_NAMES, TYPES_VALIDATION } from "../../types";
import { avatarUrl } from "../../mocks";
import { getFormData } from "../../utils/logForm";
import { validateInput } from "../../utils/validation";
import { InfoItemProps } from "../../components/InfoItem/types";
import connect from "../../utils/connect";
import UserController from "../../controllers/user"

class ChangePasswordPageBase extends Block {
	constructor(props: Record<string, any>) {
		const { user = {} } = props;

		const OldPassword = new InfoItem({
			labelText: "Старый пароль",
			name: "password",
			value: "",
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

		const onClickButton = async () => {
			validateAll();
			const formData = getFormData([NewPassword, CheckNewPassword, OldPassword]) as Record<
				string,
				string
			>;
			// Проверяем, что пароли совпадают
			if (formData.new_password === formData.check_new_password) {
				// Обновляем пароль в Store
				await UserController.changeUserPassword({
					oldPassword: formData.oldPassword,
					newPassword: formData.newPassword
				})
			} else {
				console.error("Пароли не совпадают");
				// Здесь можно добавить визуальное уведомление пользователя о несовпадении паролей
			}
		};

		super({
			...props,
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
                    ${this.props.requestStatus.loading ? '<div class="loader"></div>' : "{{{ SaveButton }}}"}
                    ${this.props.requestStatus.error ? `<div class="error-message">${this.props.requestStatus.error}</div>` : ""}

                    </div>
                </div>
            </main>`;
	}
}

const mapStateToProps = (state: Partial<AppState>) => ({
	user: state.user,
	requestStatus: state.requestStatus
});

export const ChangePasswordPage = connect(mapStateToProps)(
	ChangePasswordPageBase,
);
