import { useRef } from "react";
import { Animated } from "react-native";

const useSettingsAnimation = () => {
  const slideAnim = useRef(new Animated.Value(100)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const startAnimations = () => {
    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 5,
      delay: 100,
      useNativeDriver: true,
    }).start();

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

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 10],
    outputRange: ["-5deg", "3deg"],
  });

  return {
    slideAnim,
    rotateInterpolate,
    startAnimations,
  };
};

export default useSettingsAnimation;
