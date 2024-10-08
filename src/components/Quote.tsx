import React from "react";
import { StyleSheet, View } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

import { QuoteProps } from "../context/quotes-context";

export const Quote = ({ quote }: QuoteProps) => {
  return (
    <View style={styles.quoteContainer}>
      <AutoSizeText
        mode={ResizeTextMode.group}
        adjustsFontSizeToFit
        style={styles.quote}
      >
        {quote}
      </AutoSizeText>
    </View>
  );
};

const styles = StyleSheet.create({
  quoteContainer: {
    flex: 1,
    justifyContent: "center",
  },
  quote: {
    color: "white",
    textAlign: "center",
    fontFamily: "Acme_400Regular",
    gap: 8,
  },
});
