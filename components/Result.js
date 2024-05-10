import { useContext, useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { TaskContext } from "../contexts/TaskContext";
import { FadeIn } from "../utils/Animations";

export default function Result() {
	const { theme, alternateTheme } = useContext(ThemeContext);
	const { task, didTask, lastTask } = useContext(TaskContext);

	const fadeAnim = useRef(new Animated.Value(1)).current;
	useEffect(() => {
		if (didTask) FadeIn(fadeAnim);
	}, [didTask]);

	const styles = StyleSheet.create({
		topSection: {
			width: "100%",
			height: "40%",
			marginBottom: 20,
			justifyContent: "flex-end",
			backgroundColor: theme.displayBackground,
			borderBottomLeftRadius: theme.borderRadius * 1.5,
		},

		result: {
			marginHorizontal: 30,
			marginBottom: 30,
		},

		lastResult: {
			marginHorizontal: 30,
			fontSize: 35,
			fontWeight: "300",
			textAlign: "right",
			color: theme.displayColor,
		},

		resultText: {
			fontSize: 100,
			fontWeight: "300",
			color: theme.displayColor,
			textAlign: "right",
		},
	});

	return (
		<View style={styles.topSection} onTouchStart={alternateTheme}>
			<View style={{ opacity: 0.6 }}>
				<Animated.Text
					style={[styles.lastResult, { opacity: fadeAnim }]}
					adjustsFontSizeToFit={true}
					numberOfLines={1}
				>
					{lastTask}
				</Animated.Text>
			</View>

			<Animated.View style={[styles.result, { opacity: fadeAnim }]}>
				<Text
					style={styles.resultText}
					adjustsFontSizeToFit={true}
					numberOfLines={1}
				>
					{task}
				</Text>
			</Animated.View>
		</View>
	);
}
