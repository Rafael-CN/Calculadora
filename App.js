import * as NavigationBar from "expo-navigation-bar";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Result from "./components/Result";
import Digit from "./components/Digit";

import { toOperation, toDisplay } from "./utils/Utils";
import { TaskContext, TaskContextProvider } from "./contexts/TaskContext";
import { Colors, Theme } from "./utils/Colors";
import { useState } from "react";

export default function App() {
	NavigationBar.setBackgroundColorAsync("#3A3C4A");

	const [task, setTask] = useState("0");
	const [didTask, setDidTask] = useState(false);
	const [lastTask, setLastTask] = useState("");

	const resetTask = () => {
		setTask("0");
		setLastTask("");
	};

	const removeLastDigit = () => {
		setTask(task.length > 1 ? task.slice(0, -1) : "0");
	};

	const doTask = () => {
		setLastTask(task);

		let evalString = task;
		evalString = toOperation(evalString);

		try {
			const result = eval(evalString);
			setTask(toDisplay(result));
		} catch (e) {
			setTask("0");
		}

		setDidTask(true);
	};

	return (
		<View style={styles.container}>
			<StatusBar style="light"></StatusBar>

			<TaskContext.Provider
				value={{ task, setTask, didTask, setDidTask, lastTask, setLastTask }}
			>
				<Result></Result>

				<View style={styles.mainSection} role="">
					<View style={styles.leftSection}>
						<View style={styles.numberLine}>
							<Digit
								text="C"
								theme={Colors.INVERTED}
								onPress={resetTask}
							></Digit>
							<Digit
								text="⌫"
								theme={Colors.INVERTED}
								onPress={removeLastDigit}
							></Digit>
							<Digit
								text="( )"
								theme={Colors.INVERTED}
								onPress={() => {}}
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
						<Digit text="÷" theme={Colors.INVERTED}></Digit>
						<Digit text="×" theme={Colors.INVERTED}></Digit>
						<Digit text="+" theme={Colors.INVERTED}></Digit>
						<Digit text="−" theme={Colors.INVERTED}></Digit>
						<Digit text="=" theme={Colors.INVERTED} onPress={doTask}></Digit>
					</View>
				</View>
			</TaskContext.Provider>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.primary,
		alignItems: "center",
		justifyContent: "flex-end",
		paddingBottom: 25,
	},

	mainSection: {
		display: "flex",
		flexDirection: "row",
	},

	numberLine: {
		display: "flex",
		flexDirection: "row",
	},
});
