import Block from "../../utils/block";
import UserController from "../../controllers/user";
import "./Avatar.scss";
import {AvatarProps} from "./types.ts";

export class Avatar extends Block {
	private readonly fileInput: HTMLInputElement;constructor(props: AvatarProps) {
		super({
			...props,
			alt: props.alt || "User avatar",
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
		}	const file = input.files[0];	const maxSize = 5 * 1024 * 1024;
		if (file.size > maxSize) {
			alert('Файл слишком большой. Максимальный размер 5 МБ.');
			return;
		}	try {
			this.setProps({ loading: true });		await UserController.changeAvatar(file);		input.value = '';	} catch (error) {
			console.error('Ошибка при загрузке аватара:', error);
			alert('Не удалось загрузить аватар. Пожалуйста, попробуйте еще раз.');
		} finally {
			this.setProps({ loading: false });
		}
	}
	override componentWillUnmount(): void {
		if (this.fileInput && this.fileInput.parentNode) {
			this.fileInput.removeEventListener('change', this.handleFileChange.bind(this));
			this.fileInput.parentNode.removeChild(this.fileInput);
		}
	}
	override render(): string {
		const { avatarUrl, alt, size, editable, loading } = this.props;	const avatarClass = `avatar avatar-${size} ${editable ? 'avatar-editable' : ''}`;
		const baseUrl = 'https://ya-praktikum.tech/api/v2/resources';
		const fullAvatarUrl = avatarUrl ? `${baseUrl}${avatarUrl}` : '';	return `
            <div class="${avatarClass}">
                ${!fullAvatarUrl ? `
                    <div class="avatar-placeholder">
                        <span>${alt?.charAt(0) || 'U'}</span>
                    </div>
                ` : `
                    <img src="${fullAvatarUrl}" alt="${alt}" class="avatar-image" />
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
