const GrayTheme = {
	background: "#4E505F",
	defaultButton: {
		color: "#B0B1BE",
		background: "#3B3C4A",
		highlight: "#474859",
	},
	invertedButton: {
		color: "#3B3C4A",
		background: "#B0B1BE",
		highlight: "#A2A3B3",
	},
	displayBackground: "#3B3C4A",
	displayColor: "#B0B1BE",
	borderRadius: 30,
};
const PurpleTheme = {
	background: "#F0E8F7",
	defaultButton: {
		color: "#D3C1E2",
		background: "#604E73",
		highlight: "#6C5881",
	},
	invertedButton: {
		color: "#604E73",
		background: "#D3C1E2",
		highlight: "#C4ACD8",
	},
	displayBackground: "#D3C1E2",
	displayColor: "#604E73",
	borderRadius: 50,
};
const GreenTheme = {
	background: "#B8D5CA",
	defaultButton: {
		color: "#B8D5CA",
		background: "#187C5E",
		highlight: "#1C926F",
	},
	invertedButton: {
		color: "#B8D5CA",
		background: "#769E92",
		highlight: "#6A9589",
	},
	displayBackground: "#769E92",
	displayColor: "#B8D5CA",
	borderRadius: 20,
};
const IronManTheme = {
	background: "#6C1211",
	defaultButton: {
		color: "#F9E180",
		background: "#AE1B1B",
		highlight: "#FFF",
	},
	invertedButton: {
		color: "#6C1211",
		background: "#EBCC4F",
		highlight: "#FFF",
	},
	displayBackground: "#EBCC4F",
	displayColor: "#6C1211",
	borderRadius: 18,
};
const NeonTheme = {
	background: "#181F2A",
	defaultButton: {
		color: "#FF1178",
		background: "#1D2737",
		highlight: "#000",
		textEffect: {
			textShadowColor: "#FF4193",
			textShadowRadius: 25,
		},
	},
	invertedButton: {
		color: "#01FFF4",
		background: "#263346",
		highlight: "#000",
		textEffect: {
			textShadowColor: "#4BFFF7",
			textShadowRadius: 25,
		},
	},
	displayBackground: "#263346",
	displayColor: "#01FFF4",
	displayEffect: {
		textShadowColor: "#4BFFF7",
		textShadowRadius: 15,
	},
	borderRadius: 25,
};

export const Themes = [
	GrayTheme,
	PurpleTheme,
	GreenTheme,
	IronManTheme,
	NeonTheme,
];
