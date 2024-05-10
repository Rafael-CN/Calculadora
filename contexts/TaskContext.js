import { createContext, useState } from "react";
import {
	hasOperation,
	isOperation,
	isSpecial,
	toDisplay,
	toOperation,
} from "../utils/Utils";

export const TaskContext = createContext();
export const TaskContextProvider = ({ children }) => {
	const [task, setTask] = useState("0");
	const [didTask, setDidTask] = useState(false);
	const [lastTask, setLastTask] = useState("");

	const resetTask = () => {
		setTask("0");
		setLastTask("");
	};

	const removeLastDigit = () => {
		setTask(task.length > 1 ? task.slice(0, -1) : "0");
	};

	const repeatTask = () => {
		const split = lastTask.split(/[×÷+−]+/);
		const lastNumber = split[split.length - 1];

		const repeatTask =
			lastTask[lastTask.length - (lastNumber.length + 1)] + lastNumber;

		return task + repeatTask;
	};

	const doTask = () => {
		let mainTask = task;
		if (didTask && hasOperation(lastTask)) mainTask = repeatTask();

		setLastTask(mainTask);

		let evalString = mainTask;
		evalString = toOperation(evalString);

		try {
			const result = eval(evalString);
			setTask(toDisplay(result));
		} catch (e) {
			setTask("0");
		}

		setDidTask(true);
	};

	const addDigit = (e) => {
		let newTask = task + e.toString();

		if ((task === "0" || didTask) && !isNaN(e)) newTask = e;
		if (isSpecial(task[task.length - 1]) && isSpecial(e)) {
			newTask = task.slice(0, -1) + e.toString();
		}
		if (e === ",") {
			const split = task.split(/[×÷+−]+/);
			let lastNumber = split[split.length - 1];
			if (lastNumber === "") lastNumber = split[split.length - 2];

			if (lastNumber.indexOf(",") > -1) newTask = task;
		}

		setDidTask(false);
		setTask(newTask.toString());
	};

	return (
		<TaskContext.Provider
			value={{
				task,
				didTask,
				lastTask,
				resetTask,
				removeLastDigit,
				doTask,
				addDigit,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};
