import { Acme_400Regular, useFonts } from "@expo-google-fonts/acme";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { QuoteProps } from "../context/quotes-context";

export const Quote = ({ quote }: QuoteProps) => {
  const [fontsLoaded, fontError] = useFonts({
    Acme_400Regular,
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
          {quote}
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
    fontFamily: "Acme_400Regular",
  },
});
