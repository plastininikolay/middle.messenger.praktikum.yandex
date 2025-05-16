import Block from "./block";

function render(query: string, block: Block): Element | null {
	const root = document.querySelector(query);
	if (root instanceof HTMLElement) {
		root.innerHTML = '';
		root.appendChild(block.getContent());
		return root;
	}
	return null;
}

export default render;
