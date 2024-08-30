import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const useHomerAnimation = () => {
  const slideAnim = useRef(new Animated.Value(100)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Function to execute animations
  const startAnimations = () => {
    // Slide animation
    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 5,
      useNativeDriver: true,
    }).start();

    // Rotate animation
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: -5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(rotateAnim, {
        toValue: -3,
        friction: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Interpolate rotation animation
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 5, 10],
    outputRange: ["-3deg", "5deg", "8deg"],
  });

  return {
    slideAnim,
    rotateInterpolate,
    startAnimations,
  };
};

export default useHomerAnimation;
