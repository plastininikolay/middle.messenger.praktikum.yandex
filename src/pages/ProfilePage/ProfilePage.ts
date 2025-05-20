import Block from "../../utils/block";
import { InfoItem } from "../../components/InfoItem/infoItem";
import { Button } from "../../components/Button/Button";
import { ButtonVariantEnum } from "../../components/Button/types";
import "../../styles/profile.scss";
import { AppState, PAGE_NAMES } from "../../types";
import Router from "../../utils/router";
import connect from "../../utils/connect";
import UserAuthController from "../../controllers/user-login"
import {Avatar} from "../../components/Avatar/Avatar.ts";

class ProfilePageBase extends Block {
	constructor(props: Record<string, any>) {
		const { user = {} } = props;	const onEditProfileClick = () => {
			Router.getInstance("#app").go(`/${PAGE_NAMES.profileEdit}`);
		};	const onChangePasswordClick = () => {
			Router.getInstance("#app").go(`/${PAGE_NAMES.chagePassword}`);
		};	const onLogoutClick = () => {
			void UserAuthController.logout()
		};
		const username = `${user.first_name} ${user.second_name}`;
		super({
			...props,
			UserAvatar: new Avatar({
				size: 'large',
				editable: false
			}),
			username: username || "-",
			InfoItems: [
				new InfoItem({
					labelText: "Почта",
					name: "email",
					value: user.email || "-",
				}),
				new InfoItem({
					labelText: "Логин",
					name: "login",
					value: user.login || "-",
				}),
				new InfoItem({
					labelText: "Имя",
					name: "first_name",
					value: user.first_name || "-",
				}),
				new InfoItem({
					labelText: "Фамилия",
					name: "second_name",
					value: user.second_name || "-",
				}),
				new InfoItem({
					labelText: "Имя в чате",
					name: "display_name",
					value: user.display_name || "-",
				}),
				new InfoItem({
					labelText: "Телефон",
					name: "phone",
					value: user.phone || "-",
				}),
			],
			EditProfileButton: new Button({
				isLink: true,
				url: PAGE_NAMES.profileEdit,
				label: "Изменить данные",
				variant: ButtonVariantEnum.UNDERLINE,
				events: {
					click: onEditProfileClick,
				},
			}),
			ChangePasswordButton: new Button({
				isLink: true,
				url: PAGE_NAMES.chagePassword,
				label: "Изменить пароль",
				variant: ButtonVariantEnum.UNDERLINE,
				events: {
					click: onChangePasswordClick,
				},
			}),
			LogoutButton: new Button({
				isLink: true,
				url: PAGE_NAMES.authentication,
				label: "Выйти",
				variant: ButtonVariantEnum.UNDERLINE,
				color: "#FF0000",
				events: {
					click: onLogoutClick,
				},
			}),
		});
	}
	override render() {
		return `
            <main class="profile-container">
                <div class="profile-header">
                     {{{ UserAvatar }}}
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

const mapStateToProps = (state: Partial<AppState>) => ({
	user: state.user,
});

export const ProfilePage = connect(mapStateToProps)(ProfilePageBase);
