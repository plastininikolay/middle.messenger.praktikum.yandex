import Block from "../../utils/block";
import { InfoItem } from "../../components/InfoItem/infoItem";
import { Button } from "../../components/Button/Button";
import { ButtonVariantEnum } from "../../components/Button/types";
import "../../styles/profile.scss";
import { UserData } from "../../types";
import { PAGE_NAMES } from "../../types";
import { avatarUrl } from "../../mocks";

export class ProfilePage extends Block {
	constructor(user: UserData) {
		super({
			avatar: user.avatar,
			username: user.username || "Имя пользователя",
			InfoItems: [
				new InfoItem({
					labelText: "Почта",
					name: "email",
					value: user.email || "user@example.com",
				}),
				new InfoItem({
					labelText: "Логин",
					name: "login",
					value: user.login || "username123",
				}),
				new InfoItem({
					labelText: "Имя",
					name: "first_name",
					value: user.firstName || "User",
				}),
				new InfoItem({
					labelText: "Фамилия",
					name: "last_name",
					value: user.lastName || "Name",
				}),
				new InfoItem({
					labelText: "Имя в чате",
					name: "chat_name",
					value: user.chatName || "ChatName",
				}),
				new InfoItem({
					labelText: "Телефон",
					name: "phone",
					value: user.phone || "+7 (123) 456-78-90",
				}),
			],
			EditProfileButton: new Button({
				isLink: true,
				url: PAGE_NAMES.profileEdit,
				label: "Изменить данные",
				variant: ButtonVariantEnum.UNDERLINE,
			}),
			ChangePasswordButton: new Button({
				isLink: true,
				url: PAGE_NAMES.chagePassword,
				label: "Изменить пароль",
				variant: ButtonVariantEnum.UNDERLINE,
			}),
			LogoutButton: new Button({
				isLink: true,
				url: PAGE_NAMES.authentication,
				label: "Выйти",
				variant: ButtonVariantEnum.UNDERLINE,
				color: "#FF0000",
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
                    {{{ EditProfileButton }}}
                    {{{ ChangePasswordButton }}}
                    {{{ LogoutButton }}}
                </div>
            </main>`;
	}
}
