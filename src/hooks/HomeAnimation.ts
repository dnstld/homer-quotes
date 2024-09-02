import { useRef } from "react";
import { Animated } from "react-native";

export const useHomeAnimation = () => {
  const scale = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const scaleOut = scale.interpolate({
    inputRange: [0, 2],
    outputRange: [1, 1.1],
  });

  const scaleAnimation = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const slideFadeAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return {
    scale,
    scaleOut,
    fadeAnim,
    slideAnim,
    slideFadeAnimation,
    scaleAnimation,
  };
};
