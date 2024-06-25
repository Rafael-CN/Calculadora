import { useContext, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, Vibration, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import { TaskContext } from "../contexts/TaskContext";
import { FadeIn, Highlight } from "../utils/Animations";
import Entypo from "@expo/vector-icons/Entypo";
import ColorTransition from "../components/ColorTransition";

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
			marginBottom: 10,
			justifyContent: "flex-end",
			backgroundColor: theme.displayBackground,
			borderBottomLeftRadius: theme.borderRadius * 1.5,
		},

		themeButton: {
			position: "absolute",
			top: 70,
			left: 10,
			zIndex: 5,
			padding: 25,
			width: 75,
			borderRadius: theme.borderRadius,
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

		textEffect: theme.displayEffect || {},
	});

	const transitionRef = useRef();

	return (
		<View style={styles.topSection}>
			<ColorTransition ref={transitionRef} />

			<Animated.View
				style={styles.themeButton}
				underlayColor={theme.background}
				onTouchStart={() => {
					if (!transitionRef.current.available) return;
					transitionRef.current.doEffect();
					Vibration.vibrate(150);

					setTimeout(() => {
						alternateTheme();
					}, 250);
				}}
			>
				<Entypo
					name="light-bulb"
					style={[styles.themeIcon, styles.textEffect]}
				></Entypo>
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
					style={[styles.resultText, styles.textEffect]}
					adjustsFontSizeToFit={true}
					numberOfLines={1}
				>
					{task}
				</Text>
			</Animated.View>
		</View>
	);
}
