import { useContext, useMemo, useRef } from "react";
import {
	StyleSheet,
	Vibration,
	Animated,
	TouchableHighlight,
} from "react-native";
import { TaskContext } from "../contexts/TaskContext";
import { Pulse } from "../utils/Animations";
import { ThemeContext } from "../contexts/ThemeContext";

const defaultSize = 85;
const defaultFontSize = 30;

export default function Digit({
	text,
	onPress = null,
	style = null,
	size = 1,
}) {
	const { addDigit } = useContext(TaskContext);
	const { theme, colors } = useContext(ThemeContext);

	const fontSizeAnim = useRef(new Animated.Value(defaultFontSize)).current;

	const marginH = 3;
	let width = defaultSize * size + (size > 1 ? marginH * size : 0);
	if (!style) style = colors.DEFAULT;

	const styles = StyleSheet.create({
		number: {
			height: defaultSize,
			width: width,
			marginHorizontal: marginH,
			marginVertical: 5,
			borderRadius: theme.borderRadius,
			justifyContent: "center",
			backgroundColor: style.backgroundColor,
		},

		numberText: {
			fontSize: defaultFontSize,
			fontWeight: "300",
			color: style.fontColor,
			textAlign: "center",
		},
	});

	return (
		<TouchableHighlight
			style={styles.number}
			onPress={() => {
				Vibration.vibrate(50);
				Pulse(fontSizeAnim, defaultFontSize);

				onPress ? onPress() : addDigit(text);
			}}
			underlayColor={style.highlightColor}
			delayPressOut={50}
		>
			<Animated.Text style={[styles.numberText, { fontSize: fontSizeAnim }]}>
				{text}
			</Animated.Text>
		</TouchableHighlight>
	);
}
