import { StyleSheet, View } from "react-native";
import { Colors } from "./utils/Colors";

import Result from "./components/Result";
import Digit from "./components/Digit";

export default function Calculator() {
	return (
		<View style={{ width: "100%" }}>
			<Result></Result>

			<View style={styles.mainSection} role="">
				<View style={styles.leftSection}>
					<View style={styles.numberLine}>
						<Digit text="C" theme={Colors.LIGHT} onPress={() => {}}></Digit>
						<Digit text="⌫" theme={Colors.LIGHT} onPress={() => {}}></Digit>
						<Digit text="( )" theme={Colors.LIGHT} onPress={() => {}}></Digit>
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
					<Digit text="=" theme={Colors.COLORED} onPress={() => {}}></Digit>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainSection: {
		display: "flex",
		flexDirection: "row",
	},

	numberLine: {
		display: "flex",
		flexDirection: "row",
	},
});
