import { useContext } from "react";
import { TouchableHighlight, StyleSheet, Text, Vibration } from "react-native";
import { TaskContext } from "../contexts/TaskContext";
import { isSpecial } from "../utils/Utils";
import { Colors } from "../utils/Colors";

const defaultSize = 80;
const defaultFontSize = 30;

export default function Digit({
	text,
	onPress = null,
	theme = Colors.DEFAULT,
	size = 1,
}) {
	let width = defaultSize * size;
	if (size > 1) width += 5 * size;

	const styles = StyleSheet.create({
		number: {
			height: defaultSize,
			width: width,
			margin: 5,
			borderRadius: 40,
			borderWidth: 1,
			justifyContent: "center",
			backgroundColor: theme.backgroundColor,
		},

		numberText: {
			fontSize: defaultFontSize,
			fontWeight: "300",
			color: theme.fontColor,
			textAlign: "center",
		},
	});

	const { task, setTask } = useContext(TaskContext);

	const addDigit = (e) => {
		let newTask = task + e.toString();

		if (task === "0" && !isNaN(e)) newTask = e;
		if (isSpecial(task[task.length - 1]) && isSpecial(e)) {
			newTask = task.slice(0, -1) + e.toString();
		}
		if (e === ",") {
			const split = task.split(/[×÷+-]+/);
			let lastNumber = split[split.length - 1];
			if (lastNumber === "") lastNumber = split[split.length - 2];

			if (lastNumber.indexOf(",") > -1) newTask = task;
		}

		setTask(newTask.toString());
	};

	return (
		<TouchableHighlight
			style={styles.number}
			onPress={
				onPress
					? onPress
					: () => {
							Vibration.vibrate(50);
							addDigit(text);
					  }
			}
			underlayColor={theme.highlightColor}
		>
			<Text style={styles.numberText}>{text}</Text>
		</TouchableHighlight>
	);
}
