import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Animated,
} from "react-native";

import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Quote } from "../components/Quote";
import QuotesContext, { QuoteProps } from "../context/quotes-context";
import HomerSvg from "../components/HomerSvg";

const windowWidth = Dimensions.get("window").width;
const initialFadeAnim = 0;
const initialSlideAnim = 30;

export default function IndexScreen() {
  const { quotes } = useContext(QuotesContext);
  const [currentQuote, setCurrentQuote] = useState<QuoteProps>();
  const [usedQuotes, setUsedQuotes] = useState<Set<number>>(new Set());

  const fadeAnim = useRef(new Animated.Value(initialFadeAnim)).current;
  const slideAnim = useRef(new Animated.Value(initialSlideAnim)).current;
  const imageSlideAnim = useRef(new Animated.Value(-windowWidth)).current;

  useEffect(() => {
    if (quotes.length > 0) {
      showRandomQuote();
      animateQuote();
    }
  }, [quotes]);

  const animateQuote = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(imageSlideAnim, {
        toValue: 0,
        duration: 300,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getRandomIndex = () => {
    return Math.floor(Math.random() * quotes.length + 1);
  };

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

    // Reset animation values
    fadeAnim.setValue(initialFadeAnim);
    slideAnim.setValue(initialSlideAnim);
    animateQuote();
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
              flex: 1,
            }}
          >
            <Quote {...currentQuote!} />
            <View style={styles.episodeContainer}>
              <Text style={styles.name}>Homer J. Simpson</Text>
              <Text
                style={styles.ep}
              >{`Episode ${currentQuote?.episode} Season ${currentQuote?.season} Time ${currentQuote?.time}`}</Text>
            </View>
          </Animated.View>
        </View>
        <View style={styles.footer}>
          <Animated.View
            style={{
              transform: [{ translateX: imageSlideAnim }],
            }}
          >
            <View style={styles.imageContainer}>
              <HomerSvg style={styles.image} />
            </View>
          </Animated.View>
          <View style={styles.actionsContainer}>
            <Link
              href={{
                pathname: "/share/[id]",
                params: { id: `${currentQuote?.id}` },
              }}
              asChild
            >
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>
                  <Ionicons name="share-outline" size={32} />
                </Text>
              </Pressable>
            </Link>
            <Pressable
              style={[styles.button, styles.buttonPrimary]}
              onPress={showRandomQuote}
            >
              <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
                <Ionicons name="refresh-outline" size={48} />
              </Text>
            </Pressable>
            <Link href={"list"} asChild>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>
                  <Ionicons name="list-outline" size={32} />
                </Text>
              </Pressable>
            </Link>
            <Link href={"settings"} asChild>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>
                  <Ionicons name="settings-outline" size={32} />
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00AAFF",
  },
  quoteContainer: {
    flex: 1,
    padding: 32,
  },
  episodeContainer: {
    padding: 16,
    alignItems: "center",
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  ep: {
    color: "white",
  },
  footer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  imageContainer: {
    height: 275,
    width: 300,
  },
  image: {
    position: "absolute",
    left: 16,
    bottom: 0,
  },
  actionsContainer: {
    gap: 16,
    alignItems: "center",
    elevation: 3,
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  buttonPrimary: {
    backgroundColor: "white",
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  buttonText: {
    color: "white",
  },
  buttonTextPrimary: {
    color: "#F8659F",
    elevation: 3,
  },
});
