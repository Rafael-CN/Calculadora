import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "./utils/Colors";
import Digit from "./components/Digit";

import { TaskContext } from "./contexts/TaskContext";
import { toOperation, toDisplay } from "./utils/Utils";
import { useEffect, useState } from "react";

export default function App() {
	const [task, setTask] = useState("0");

	const resetTask = () => {
		setTask("0");
	};

	const doTask = () => {
		let evalString = task;
		evalString = toOperation(evalString);

		try {
			const result = eval(evalString);
			setTask(toDisplay(result));
		} catch (e) {
			setTask("0");
		}
	};

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: "#000",
			alignItems: "center",
			justifyContent: "flex-end",
			paddingBottom: 30,
		},

		mainSection: {
			display: "flex",
			flexDirection: "row",
		},

		numberLine: {
			display: "flex",
			flexDirection: "row",
		},

		result: {
			width: "88%",
			height: 90,
			marginBottom: 30,
			alignContent: "flex-end",
		},

		resultText: {
			fontSize: 80,
			fontWeight: "200",
			color: "#eee",
			textAlign: "right",
		},
	});

	return (
		<View style={styles.container}>
			<TaskContext.Provider value={{ task, setTask }}>
				<View style={styles.result}>
					<Text style={styles.resultText}>{task}</Text>
				</View>

				<View style={styles.mainSection} role="">
					<View style={styles.leftSection}>
						<View style={styles.numberLine}>
							<Digit
								text="C"
								theme={Colors.INVERTED}
								onPress={resetTask}
							></Digit>
							<Digit
								text="("
								theme={Colors.INVERTED}
								onPress={() => {}}
							></Digit>
							<Digit
								text=")"
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
						<Digit text="÷" theme={Colors.COLORED}></Digit>
						<Digit text="×" theme={Colors.COLORED}></Digit>
						<Digit text="+" theme={Colors.COLORED}></Digit>
						<Digit text="−" theme={Colors.COLORED}></Digit>
						<Digit text="=" theme={Colors.COLORED} onPress={doTask}></Digit>
					</View>
				</View>
			</TaskContext.Provider>
		</View>
	);
}
