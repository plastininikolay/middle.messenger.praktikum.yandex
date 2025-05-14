import { FormGroup } from "../components/FormGroup/FormGroup";
import { BaseInputType } from "../types";

export const getFormData = (formGroups: FormGroup[]) => {
	return formGroups.reduce((prevVal, val) => {
		const props = val.getProps() as BaseInputType;
		return { ...prevVal, [props.name]: props.value };
	}, {});
};
