import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Digit from "./Digit";

export default function App() {
	const [task, setTask] = useState("0");

	const addInput = (i) => {
		if (task.length === 0 && operations.includes(i)) return;
		if (
			task.length > 0 &&
			operations.includes(task[task.length - 1]) &&
			operations.includes(i)
		) {
			setTask(task.slice(0, -1) + i);
			return;
		}

		setTask(task.toString() + i.toString());
	};

	const calculate = () => {
		const replaces = {
			"+": "+",
			"−": "-",
			"×": "*",
			"÷": "/",
		};

		let evalString = task;
		try {
			const result = eval(evalString);
			setTask(result);
		} catch (e) {
			setTask("0");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.result}>
				<Text style={styles.resultText}>{task}</Text>
			</View>

			<View style={styles.mainSection}>
				<View style={styles.leftSection}>
					<View style={styles.numberLine}>
						<Digit text="C"></Digit>
						<Digit text="(" value="("></Digit>
						<Digit text=")" value=")"></Digit>
					</View>

					{[
						[7, 8, 9],
						[4, 5, 6],
						[1, 2, 3],
					].map((l, i) => {
						return (
							<View style={styles.numberLine} key={i}>
								{l.map((n, i) => {
									return <Digit key={i} text={n} value={n}></Digit>;
								})}
							</View>
						);
					})}

					<View style={styles.numberLine}>
						<Digit text={0} value={0} size={2}></Digit>
						<Digit text="." value="."></Digit>
					</View>
				</View>

				<View style={styles.rightSection}>
					<Digit text="÷" value="/" colored={true}></Digit>
					<Digit text="×" value="*" colored={true}></Digit>
					<Digit text="+" value="+" colored={true}></Digit>
					<Digit text="−" value="-" colored={true}></Digit>
					<Digit text="=" colored={true}></Digit>
				</View>
			</View>

			<StatusBar style="light" />
		</View>
	);
}

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
	},

	resultText: {
		fontSize: 80,
		fontWeight: "300",
		color: "#eee",
		marginBottom: 10,
		textAlign: "right",
	},
});
