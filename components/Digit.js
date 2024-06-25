import { useContext, useRef, useState } from "react";
import { StyleSheet, Vibration, Animated } from "react-native";
import { TaskContext } from "../contexts/TaskContext";
import { Highlight, Pulse } from "../utils/Animations";
import { ThemeContext } from "../contexts/ThemeContext";

const defaultSize = 85;
const defaultFontSize = 30;

export default function Digit({
	text,
	value = null,
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

	const [bgAnim] = useState(new Animated.Value(0));
	const bgColor = bgAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [style.backgroundColor, style.highlightColor],
	});

	const styles = StyleSheet.create({
		number: {
			height: defaultSize,
			width: width,
			marginHorizontal: marginH,
			marginVertical: 5,
			borderRadius: theme.borderRadius,
			justifyContent: "center",
			backgroundColor: bgColor,
		},

		numberText: {
			fontSize: defaultFontSize,
			fontWeight: "300",
			fontFamily: "Stark",
			color: style.fontColor,
			textAlign: "center",
		},

		textEffect: style.textEffect,
	});

	return (
		<Animated.View
			style={styles.number}
			onTouchStart={() => {
				Vibration.vibrate(50);
				Pulse(fontSizeAnim, defaultFontSize);
				Highlight(bgAnim);

				onPress ? onPress() : addDigit(value || text);
			}}
			onTouchEnd={() => {}}
		>
			<Animated.Text
				style={[
					styles.numberText,
					styles.textEffect,
					{ fontSize: fontSizeAnim },
				]}
			>
				{text}
			</Animated.Text>
		</Animated.View>
	);
}
