import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Pressable, Animated } from "react-native";

import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Fontisto from "@expo/vector-icons/Fontisto";

import { Quote } from "../components/Quote";
import QuotesContext, { QuoteProps } from "../context/quotes-context";
import HomerSvg from "../components/HomerSvg";
import { usePushNotifications } from "../hooks/Notifications";

const MAGIC_NUMBER = 32;
const initialFadeAnim = 0;
const initialSlideAnim = 30;

const useQuoteAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(initialFadeAnim)).current;
  const slideAnim = useRef(new Animated.Value(initialSlideAnim)).current;

  const quoteAnimation = () => {
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
    fadeAnim,
    slideAnim,
    quoteAnimation,
  };
};

const useButtonAnimation = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const inputRange = [0, 1];
  const outputRange = [1, 0.8];
  const scale = animation.interpolate({ inputRange, outputRange });

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return {
    scale,
    onPressIn,
    onPressOut,
  };
};

export default function IndexScreen() {
  const { quotes } = useContext(QuotesContext);
  const [currentQuote, setCurrentQuote] = useState<QuoteProps>();
  const [usedQuotes, setUsedQuotes] = useState<Set<number>>(new Set());

  const { fadeAnim, slideAnim, quoteAnimation } = useQuoteAnimation();
  const { scale, onPressIn, onPressOut } = useButtonAnimation();
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);

  console.log(data);
  console.log(expoPushToken?.data ?? "");

  useEffect(() => {
    if (quotes.length > 0) {
      showRandomQuote();
      quoteAnimation();
    }
  }, [quotes]);

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
    quoteAnimation();
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
              style={{ position: "absolute", bottom: -MAGIC_NUMBER, right: 0 }}
            />
          </Animated.View>
        </View>
        <View style={styles.episodeContainer}>
          <Text style={styles.name}>Homer J. Simpson</Text>
          {/* <Text style={styles.ep} selectable={true} selectionColor="orange">
            {expoPushToken}
          </Text> */}
          <Text
            style={styles.ep}
          >{`S${currentQuote?.season}:E${currentQuote?.episode} ${currentQuote?.name} (${currentQuote?.time})`}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.imageContainer}>
            <HomerSvg style={styles.image} />
          </View>
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
            <Animated.View
              style={[
                styles.button,
                styles.buttonPrimary,
                { transform: [{ scale }] },
              ]}
            >
              <Pressable
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={showRandomQuote}
                style={styles.button}
              >
                <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
                  <Ionicons name="refresh-outline" size={48} />
                </Text>
              </Pressable>
            </Animated.View>
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
    paddingVertical: MAGIC_NUMBER * 2,
    paddingHorizontal: MAGIC_NUMBER,
  },
  episodeContainer: {
    padding: 32,
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
    left: "-25%",
    bottom: 0,
  },
  actionsContainer: {
    gap: 16,
    alignItems: "center",
    elevation: 3,
    position: "absolute",
    right: 32,
    bottom: 32,
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
