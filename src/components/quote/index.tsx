import { RockSalt_400Regular, useFonts } from "@expo-google-fonts/rock-salt";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

type Props = {
  quote: string;
  group?: boolean;
};

export const Quote = ({ quote, group = true }: Props) => {
  const [fontsLoaded, fontError] = useFonts({
    RockSalt_400Regular,
  });

  return (
    <View style={styles.quoteContainer}>
      {!fontsLoaded && !fontError ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        // @ts-ignore
        <AutoSizeText
          mode={ResizeTextMode.group}
          adjustsFontSizeToFit
          style={styles.quote}
        >
          {`"${quote}"`}
        </AutoSizeText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  quoteContainer: {
    flex: 1,
    justifyContent: "center",
  },
  quote: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "RockSalt_400Regular",
  },
});
