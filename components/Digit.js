import { useContext, useMemo, useRef } from "react";
import {
	StyleSheet,
	Vibration,
	Animated,
	TouchableHighlight,
} from "react-native";
import { TaskContext } from "../contexts/TaskContext";
import { isSpecial } from "../utils/Utils";
import { Colors } from "../utils/Colors";
import { Pulse } from "../utils/Animations";

const defaultSize = 85;
const defaultFontSize = 30;

export default function Digit({
	text,
	onPress = null,
	theme = Colors.DEFAULT,
	size = 1,
}) {
	const margin = 3;
	let width = defaultSize * size;
	if (size > 1) width += margin * size;

	const styles = StyleSheet.create({
		number: {
			height: defaultSize,
			width: width,
			margin: margin,
			borderRadius: 30,
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

	const { task, setTask, didTask, setDidTask } = useContext(TaskContext);

	const fontSizeAnim = useRef(new Animated.Value(defaultFontSize)).current;

	const addDigit = (e) => {
		let newTask = task + e.toString();

		if ((task === "0" || didTask) && !isNaN(e)) newTask = e;
		if (isSpecial(task[task.length - 1]) && isSpecial(e)) {
			newTask = task.slice(0, -1) + e.toString();
		}
		if (e === ",") {
			const split = task.split(/[×÷+-]+/);
			let lastNumber = split[split.length - 1];
			if (lastNumber === "") lastNumber = split[split.length - 2];

			if (lastNumber.indexOf(",") > -1) newTask = task;
		}

		setDidTask(false);
		setTask(newTask.toString());
	};

	return (
		<TouchableHighlight
			style={styles.number}
			onPress={() => {
				Vibration.vibrate(50);
				Pulse(fontSizeAnim, defaultFontSize);

				onPress ? onPress() : addDigit(text);
			}}
			underlayColor={theme.highlightColor}
			delayPressOut={50}
		>
			<Animated.Text style={[styles.numberText, { fontSize: fontSizeAnim }]}>
				{text}
			</Animated.Text>
		</TouchableHighlight>
	);
}
