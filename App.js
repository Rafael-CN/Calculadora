import Calculator from "./Calculator";
import { TaskContextProvider } from "./contexts/TaskContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";

export default function App() {
	return (
		<ThemeContextProvider>
			<TaskContextProvider>
				<Calculator></Calculator>
			</TaskContextProvider>
		</ThemeContextProvider>
	);
}
