import * as NavigationBar from "expo-navigation-bar";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Result from "./components/Result";
import Digit from "./components/Digit";

import { TaskContext } from "./contexts/TaskContext";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

export default function Calculator() {
	const { theme, colors } = useContext(ThemeContext);
	NavigationBar.setBackgroundColorAsync(theme.background);

	const { resetTask, removeLastDigit, doTask } = useContext(TaskContext);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.background,
			alignItems: "center",
			justifyContent: "flex-end",
			paddingBottom: 10,
		},

		mainSection: {
			display: "flex",
			flexDirection: "row",
			zIndex: -1,
		},

		numberLine: {
			display: "flex",
			flexDirection: "row",
		},
	});

	return (
		<View style={styles.container}>
			<StatusBar style="light"></StatusBar>

			<Result></Result>

			<View style={styles.mainSection}>
				<View style={styles.leftSection}>
					<View style={styles.numberLine}>
						<Digit text="C" style={colors.INVERTED} onPress={resetTask}></Digit>
						<Digit
							text="E"
							style={colors.INVERTED}
							onPress={removeLastDigit}
						></Digit>
						<Digit
							text={<AntDesign name="up" size={24} />}
							value="^"
							style={colors.INVERTED}
						></Digit>
					</View>

					{[
						[7, 8, 9],
						[4, 5, 6],
						[1, 2, 3],
					].map((l, i) => {
						return (
							<View style={styles.numberLine} key={i}>
								{l.map((n, i) => {
									return <Digit key={i} text={n}></Digit>;
								})}
							</View>
						);
					})}

					<View style={styles.numberLine}>
						<Digit text="0" size={2}></Digit>
						<Digit text=","></Digit>
					</View>
				</View>

				<View style={styles.rightSection}>
					<Digit text="÷" style={colors.INVERTED}></Digit>
					<Digit text="×" style={colors.INVERTED}></Digit>
					<Digit text="+" style={colors.INVERTED}></Digit>
					<Digit text="−" style={colors.INVERTED}></Digit>
					<Digit text="=" style={colors.INVERTED} onPress={doTask}></Digit>
				</View>
			</View>
		</View>
	);
}
