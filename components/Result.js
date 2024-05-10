import { useContext, useEffect, useRef, useState } from "react";
import {
	Animated,
	StyleSheet,
	Text,
	TouchableHighlight,
	Vibration,
	View,
} from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { TaskContext } from "../contexts/TaskContext";
import { FadeIn, Highlight } from "../utils/Animations";
import Entypo from "@expo/vector-icons/Entypo";

export default function Result() {
	const { theme, alternateTheme } = useContext(ThemeContext);
	const { task, didTask, lastTask } = useContext(TaskContext);

	const fadeAnim = useRef(new Animated.Value(1)).current;
	useEffect(() => {
		if (didTask) FadeIn(fadeAnim);
	}, [didTask]);

	const [iconAnim] = useState(new Animated.Value(0));
	const iconBgColor = iconAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ["rgba(255,255,255,0)", "rgba(255,255,255,0.1)"],
	});

	const styles = StyleSheet.create({
		topSection: {
			width: "100%",
			height: "40%",
			marginBottom: 20,
			justifyContent: "flex-end",
			backgroundColor: theme.displayBackground,
			borderBottomLeftRadius: theme.borderRadius * 1.5,
		},

		themeButton: {
			position: "absolute",
			top: 70,
			left: 10,
			zIndex: 1,
			padding: 25,
			width: 75,
			borderRadius: theme.borderRadius,
			backgroundColor: iconBgColor,
		},

		themeIcon: {
			color: theme.displayColor,
			fontSize: 25,
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
		<View style={styles.topSection}>
			<Animated.View
				style={styles.themeButton}
				underlayColor={theme.background}
				onTouchStart={() => {
					Vibration.vibrate(150);
					Highlight(iconAnim);

					alternateTheme();
				}}
			>
				<Entypo name="light-bulb" style={styles.themeIcon}></Entypo>
			</Animated.View>

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
