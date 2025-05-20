import { BaseInputType } from "../../types";

export interface InfoItemProps extends BaseInputType {
	name: string;
	edit?: boolean;
	labelText: string;
}
