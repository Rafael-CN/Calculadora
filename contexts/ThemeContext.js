import { createContext, useState } from "react";
import { GrayTheme, PurpleTheme } from "../utils/Colors";

export const ThemeContext = createContext();
export const ThemeContextProvider = ({ children }) => {
	const [theme, setTheme] = useState(GrayTheme);
	const colors = {
		DEFAULT: {
			fontColor: theme.light,
			backgroundColor: theme.dark,
			highlightColor: theme.primary,
		},
		INVERTED: {
			fontColor: theme.dark,
			backgroundColor: theme.light,
			highlightColor: theme.primary,
		},
	};

	const alternateTheme = () => {
		setTheme(theme === GrayTheme ? PurpleTheme : GrayTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, colors, alternateTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
