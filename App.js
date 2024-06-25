import { TaskContextProvider } from "./contexts/TaskContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import Calculator from "./Calculator";

export default function App() {
	return (
		<ThemeContextProvider>
			<TaskContextProvider>
				<Calculator></Calculator>
			</TaskContextProvider>
		</ThemeContextProvider>
	);
}
