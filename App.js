import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [task, setTask] = useState("");

  const operations = ["+", "−", "×", "÷"];

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
      evalString = task.replace(/[+−×÷]/g, (m) => replaces[m]);
      const result = eval(evalString);
      setTask(result);
    } catch (e) {
      setTask("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>{task}</Text>

      <View style={styles.mainSection}>
        <View style={styles.leftSection}>
          {[
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ].map((l, i) => {
            return (
              <View style={styles.numberLine} key={i}>
                {l.map((n, i) => {
                  return (
                    <Pressable
                      style={styles.number}
                      key={n}
                      onPress={() => {
                        addInput(n);
                      }}
                    >
                      <Text style={styles.numberText}>{n}</Text>
                    </Pressable>
                  );
                })}
              </View>
            );
          })}
          <View style={styles.numberLine}>
            <Pressable
              style={styles.lastNumber}
              onPress={() => {
                addInput(0);
              }}
            >
              <Text style={styles.numberText}>0</Text>
            </Pressable>

            <Pressable
              style={styles.numberColored}
              onPress={() => {
                calculate();
              }}
            >
              <Text style={styles.numberText}>=</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.rightSection}>
          {operations.map((o, i) => {
            return (
              <Pressable
                style={styles.numberColored}
                key={i}
                onPress={() => {
                  addInput(o);
                }}
              >
                <Text style={styles.numberText}>{o}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },

  mainSection: {
    display: "flex",
    flexDirection: "row",
  },

  numberLine: {
    display: "flex",
    flexDirection: "row",
  },

  number: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    margin: 5,
    borderRadius: 40,
    borderWidth: 1,
    backgroundColor: "#111",
  },

  lastNumber: {
    paddingVertical: 15,
    paddingHorizontal: 62,
    margin: 5,
    borderRadius: 40,
    borderWidth: 1,
    backgroundColor: "#111",
  },

  numberColored: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    margin: 5,
    borderRadius: 40,
    borderWidth: 1,
    backgroundColor: "#7765E3",
  },

  numberText: {
    fontSize: 25,
    fontWeight: "500",
    color: "#fff",
  },

  resultText: {
    marginBottom: 15,
    color: "#fff",
    fontSize: 30,
    fontWeight: "500",
  },
});
