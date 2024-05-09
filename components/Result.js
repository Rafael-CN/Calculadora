import { useContext, useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { TaskContext } from "../contexts/TaskContext";
import { FadeIn } from "../utils/Animations";
import { Theme } from "../utils/Colors";

export default function Result() {
	const { task, didTask, lastTask } = useContext(TaskContext);

	const fadeAnim = useRef(new Animated.Value(1)).current;
	useEffect(() => {
		if (didTask) FadeIn(fadeAnim);
	}, [didTask]);

	return (
		<View style={styles.topSection}>
			<Text
				style={styles.lastResult}
				adjustsFontSizeToFit={true}
				numberOfLines={1}
			>
				{lastTask}
			</Text>

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

const styles = StyleSheet.create({
	topSection: {
		width: "100%",
		height: "37%",
		marginBottom: 20,
		justifyContent: "flex-end",
		backgroundColor: Theme.dark,
		borderBottomLeftRadius: 60,
	},

	result: {
		marginHorizontal: 30,
		marginBottom: 30,
	},

	lastResult: {
		marginHorizontal: 30,
		fontSize: 30,
		fontWeight: "300",
		color: Theme.primary,
		textAlign: "right",
	},

	resultText: {
		fontSize: 100,
		fontWeight: "300",
		color: Theme.light,
		textAlign: "right",
	},
});
