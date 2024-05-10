import { Animated } from "react-native";

const Pulse = (animationValue, initialValue) => {
	Animated.sequence([
		Animated.timing(animationValue, {
			toValue: initialValue * 0.7,
			duration: 100,
			useNativeDriver: false,
		}),
		Animated.timing(animationValue, {
			toValue: initialValue,
			duration: 100,
			useNativeDriver: false,
		}),
		Animated.timing(animationValue, {
			toValue: initialValue * 1.1,
			duration: 50,
			useNativeDriver: false,
		}),
		Animated.timing(animationValue, {
			toValue: initialValue,
			duration: 200,
			useNativeDriver: false,
		}),
	]).start();
};

const FadeIn = (animationValue) => {
	Animated.sequence([
		Animated.timing(animationValue, {
			toValue: 0,
			duration: 0,
			useNativeDriver: true,
		}),
		Animated.timing(animationValue, {
			toValue: 1,
			duration: 650,
			useNativeDriver: true,
		}),
	]).start();
};

const Highlight = (animationValue) => {
	Animated.sequence([
		Animated.timing(animationValue, {
			toValue: 1,
			duration: 150,
			useNativeDriver: false,
		}),
		Animated.timing(animationValue, {
			toValue: 0,
			duration: 150,
			useNativeDriver: false,
		}),
	]).start();
};

export { Pulse, FadeIn, Highlight };
