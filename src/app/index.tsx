import { StatusBar } from "expo-status-bar";
import { View, Text, Animated } from "react-native";
import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Fontisto from "@expo/vector-icons/Fontisto";

import { Quote } from "../components/Quote";
import { Homer } from "../components/Homer";
import { Button } from "../components/button";
import QuotesContext, { QuoteProps } from "../context/quotes-context";

import { useHomeAnimation } from "../hooks/HomeAnimation";
import { styles } from "./styles";

const MAGIC_NUMBER = 32;

export default function IndexScreen() {
  const { quotes } = useContext(QuotesContext);
  const [currentQuote, setCurrentQuote] = useState<QuoteProps>();
  const [usedQuotes, setUsedQuotes] = useState<Set<number>>(new Set());
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const {
    fadeAnim,
    slideAnim,
    slideFadeAnimation,
    scale,
    scaleOut,
    scaleAnimation,
  } = useHomeAnimation();

  useEffect(() => {
    if (quotes.length > 0) {
      if (isInitialLoad) {
        showRandomQuote();
        setIsInitialLoad(false);
      } else {
        slideFadeAnimation();
      }
    }
  }, [quotes]);

  const getRandomIndex = () => Math.floor(Math.random() * quotes.length + 1);

  const showRandomQuote = () => {
    let randomIndex;

    if (usedQuotes.size === quotes.length) {
      setUsedQuotes(new Set());
      randomIndex = getRandomIndex();
    } else {
      do {
        randomIndex = getRandomIndex();
      } while (usedQuotes.has(randomIndex));
    }

    setUsedQuotes((prevUsedQuotes) => new Set(prevUsedQuotes).add(randomIndex));
    setCurrentQuote(quotes[randomIndex - 1]);

    fadeAnim.setValue(0);
    slideAnim.setValue(30);
    scale.setValue(0);

    slideFadeAnimation();
    scaleAnimation();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.quoteContainer}>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Fontisto
              name="quote-a-right"
              size={MAGIC_NUMBER}
              color="white"
              style={{ position: "absolute", top: -MAGIC_NUMBER, left: 0 }}
            />
          </Animated.View>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              flex: 1,
            }}
          >
            <Quote {...currentQuote!} />
          </Animated.View>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Fontisto
              name="quote-a-left"
              size={MAGIC_NUMBER}
              color="white"
              style={{
                position: "absolute",
                bottom: -MAGIC_NUMBER,
                right: 0,
              }}
            />
          </Animated.View>
        </View>

        <View style={styles.episodeContainer}>
          <Text style={styles.name}>Homer J. Simpson</Text>
          <Text
            style={styles.ep}
          >{`S${currentQuote?.season}:E${currentQuote?.episode} ${currentQuote?.name} (${currentQuote?.time})`}</Text>
        </View>

        <View style={styles.footer}>
          <Animated.View style={[{ transform: [{ scale: scaleOut }] }]}>
            <Homer />
          </Animated.View>

          <View style={styles.actionsContainer}>
            <Link
              href={{
                pathname: "/share/[id]",
                params: { id: `${currentQuote?.id}` },
              }}
              asChild
            >
              <Button icon="share-outline" variant="secondary" />
            </Link>
            <Button icon="refresh-outline" onPress={showRandomQuote} />
            <Link href={"list"} asChild>
              <Button icon="list-outline" variant="secondary" />
            </Link>
            <Link href={"settings"} asChild>
              <Button icon="settings-outline" variant="secondary" />
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
