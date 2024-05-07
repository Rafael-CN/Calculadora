import { TouchableHighlight, StyleSheet, Text, Vibration } from "react-native";

const defaultSize = 80;
const defaultFontSize = 30;

export default function Digit({
	text,
	value,
	colored = false,
	size = 1,
	onPress = null,
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
			backgroundColor: colored ? "#7765E3" : "#111111",
		},

		numberText: {
			fontSize: defaultFontSize,
			fontWeight: "300",
			color: colored ? "#fff" : "#eee",
			textAlign: "center",
		},
	});

	return (
		<TouchableHighlight
			style={styles.number}
			onPress={
				onPress
					? onPress
					: () => {
							Vibration.vibrate(50);
							console.log(value);
					  }
			}
			underlayColor={colored ? "#9485E9" : "#000"}
		>
			<Text style={styles.numberText}>{text}</Text>
		</TouchableHighlight>
	);
}
