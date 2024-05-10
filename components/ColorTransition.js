import {
	forwardRef,
	useContext,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { Animated } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";

const ColorTransition = (props, ref) => {
	const size = 1000;

	const [leftAnim] = useState(new Animated.Value(-size));
	const { theme } = useContext(ThemeContext);

	const [lastBg, setLastBg] = useState(theme.background);
	const nextBg = theme.background;

	const [bgAnim] = useState(new Animated.Value(0));
	const bgColor = bgAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [lastBg, nextBg],
	});

	useEffect(() => {
		Animated.timing(bgAnim, {
			toValue: 1,
			duration: 250,
			useNativeDriver: false,
		}).start(() => {
			setLastBg(nextBg);
			Animated.timing(bgAnim, {
				toValue: 0,
				duration: 0,
				useNativeDriver: false,
			}).start();
		});
	}, [theme]);

	useImperativeHandle(ref, () => ({
		doEffect: () => {
			doEffect();
		},
		available: available,
	}));

	const [available, setAvailable] = useState(true);

	const doEffect = () => {
		if (!available) return;

		setAvailable(false);
		Animated.sequence([
			Animated.timing(leftAnim, {
				toValue: 0,
				duration: 500,
				useNativeDriver: false,
			}),
			Animated.timing(leftAnim, {
				toValue: 400,
				duration: 350,
				useNativeDriver: false,
			}),
			Animated.timing(leftAnim, {
				toValue: -size,
				duration: 0,
				useNativeDriver: false,
			}),
		]).start(() => {
			setAvailable(true);
		});
	};

	return (
		<Animated.View
			style={{
				height: 1000,
				width: size,
				backgroundColor: bgColor,
				position: "absolute",
				top: 0,
				left: leftAnim,
				zIndex: 10,
				borderRadius: 50,
			}}
		></Animated.View>
	);
};
export default forwardRef(ColorTransition);
