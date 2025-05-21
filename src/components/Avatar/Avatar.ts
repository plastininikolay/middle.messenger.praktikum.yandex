import Block from "../../utils/block";
import UserController from "../../controllers/user";
import "./Avatar.scss";
import {AvatarProps} from "./types.ts";
import {BASE_URL} from "../../constanst.ts";
import {AppState} from "../../types.ts";
import connect from "../../utils/connect.ts";
import {avatarUrl} from "../../mocks.ts";

export class AvatarBase extends Block {
	private readonly fileInput: HTMLInputElement;constructor(props: AvatarProps) {
		super({
			...props,
			size: props.size || "medium",
			editable: props.editable !== undefined ? props.editable : true,
			events: {
				click: (e: Event) => {
					if (this.props.editable) {
						this.handleAvatarClick(e);
					}
				},
				...props.events
			}
		});
		this.fileInput = document.createElement('input');
		this.fileInput.type = 'file';
		this.fileInput.accept = 'image/jpeg, image/jpg, image/png, image/gif, image/webp';
		this.fileInput.style.display = 'none';
		this.fileInput.addEventListener('change', this.handleFileChange.bind(this));	document.body.appendChild(this.fileInput);
	}
	private handleAvatarClick(e: Event): void {
		e.preventDefault();
		if (this.props.editable) {
			this.fileInput.click();
		}
	}
	private async handleFileChange(e: Event): Promise<void> {
		const input = e.target as HTMLInputElement;
		if (!input.files || input.files.length === 0) {
			return;
		}
		const file = input.files[0];
		const maxSize = 5 * 1024 * 1024;
		if (file.size > maxSize) {
			alert('Файл слишком большой. Максимальный размер 5 МБ.');
			return;
		}	try {
			await UserController.changeAvatar(file);		input.value = '';	} catch (error) {
			console.error('Ошибка при загрузке аватара:', error);
			alert('Не удалось загрузить аватар. Пожалуйста, попробуйте еще раз.');
		}
	}
	override componentWillUnmount(): void {
		if (this.fileInput && this.fileInput.parentNode) {
			this.fileInput.removeEventListener('change', this.handleFileChange.bind(this));
			this.fileInput.parentNode.removeChild(this.fileInput);
		}
	}
	override render(): string {
		const { user: {avatar, first_name, second_name}, size, editable, requestStatus: {loading} } = this.props;
		const avatarClass = `avatar avatar-${size} ${editable ? 'avatar-editable' : ''}`;
		const baseUrl = `${BASE_URL}/resources`;
		const fullAvatarUrl = avatar ? `${baseUrl}${avatar}` : avatarUrl;
		const username = `${first_name} ${second_name}`;

		return `
            <div class="${avatarClass}">
                ${!fullAvatarUrl ? `
                    <div class="avatar-placeholder">
                        <span>${username}</span>
                    </div>
                ` : `
                    <img src="${fullAvatarUrl}" alt="${username} avatar" class="avatar-image" />
                `}
                
                ${editable ? `
                    <div class="avatar-edit-overlay">
                        <div class="avatar-edit-icon">
                            Загрузить аватар
                        </div>
                    </div>
                ` : ''}
                ${loading ? `
                    <div class="avatar-loading">
                        Загрузка...
                    </div>
                ` : ''}
            </div>
        `;
	}
}

const mapStateToProps = (state: Partial<AppState>) => ({
	user: state.user,
	requestStatus: state.requestStatus
});

export const Avatar = connect(mapStateToProps)(AvatarBase);
