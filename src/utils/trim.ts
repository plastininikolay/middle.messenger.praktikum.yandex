function trim(...props: string[]) {
	return props
		.map((val) => {
			return val.replace(/[^a-zA-Z]+/g, "");
		})
		.join("");
}

export default trim;
