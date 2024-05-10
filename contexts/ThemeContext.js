import { createContext, useState } from "react";
import { Themes } from "../utils/Themes";

export const ThemeContext = createContext();
export const ThemeContextProvider = ({ children }) => {
	const [theme, setTheme] = useState(Themes[0]);
	const colors = {
		DEFAULT: {
			fontColor: theme.defaultButton.color,
			backgroundColor: theme.defaultButton.background,
			highlightColor: theme.defaultButton.highlight,
		},
		INVERTED: {
			fontColor: theme.invertedButton.color,
			backgroundColor: theme.invertedButton.background,
			highlightColor: theme.invertedButton.highlight,
		},
	};

	const alternateTheme = () => {
		const othersThemes = Themes.filter((t) => t !== theme);
		const newTheme = Math.floor(Math.random() * othersThemes.length);
		setTheme(othersThemes[newTheme]);
	};

	return (
		<ThemeContext.Provider value={{ theme, colors, alternateTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
