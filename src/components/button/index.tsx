import React, { ComponentProps, forwardRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  Text,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useButtonAnimation } from "./hooks";
import { styles } from "./styles";

type Props = ComponentProps<typeof Pressable> & {
  icon: ComponentProps<typeof Ionicons>["name"];
  label?: string;
  loading?: boolean;
  onPress?: ComponentProps<typeof Pressable>["onPress"];
  variant?: "primary" | "secondary";
  border?: boolean;
};

export const Button = forwardRef<View, Props>(
  (
    {
      label,
      loading = false,
      icon,
      variant = "primary",
      border = false,
      ...rest
    },
    ref
  ) => {
    const { scale, onPressIn, onPressOut } = useButtonAnimation();
    const isPrimary = variant === "primary";

    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          ref={ref}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={styles.pressable}
          {...rest}
        >
          {label && <Text style={styles.buttonText}>{label}</Text>}
          <View
            style={[
              styles.button,
              isPrimary && styles.buttonPrimary,
              border && styles.buttonBordered,
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#F8659F" />
            ) : (
              <Text
                style={[
                  styles.buttonText,
                  isPrimary && styles.buttonTextPrimary,
                ]}
              >
                <Ionicons name={icon} size={isPrimary ? 48 : 32} />
              </Text>
            )}
          </View>
        </Pressable>
      </Animated.View>
    );
  }
);
