export enum ButtonVariantEnum  {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	UNDERLINE = 'underline'
}

export interface ButtonProps {
	label: string;
	onClick?: () => void;
	variant: ButtonVariantEnum;
	isDisabled?: boolean;
	isFull?: boolean;
	isLink?: boolean;
	url?: string;
	color?: string;
}
