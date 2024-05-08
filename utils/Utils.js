const isOperation = (e) => {
	return ["×", "÷", "+", "−"].includes(e);
};

const isSpecial = (e) => {
	return ["×", "÷", "+", "−", ","].includes(e);
};

const toOperation = (e) => {
	e = e.toString();
	e = e.replaceAll("×", "*");
	e = e.replaceAll("÷", "/");
	e = e.replaceAll("−", "-");
	e = e.replaceAll(",", ".");
	return e;
};

const toDisplay = (e) => {
	e = e.toString();
	e = e.replaceAll(".", ",");
	return e;
};

export { isOperation, isSpecial, toOperation, toDisplay };
