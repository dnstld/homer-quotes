import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Image,
} from "react-native";

import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Quote } from "../components/Quote";
import QuotesContext, { QuoteProps } from "../context/quotes-context";

const windowWidth = Dimensions.get("window").width;

export default function IndexScreen() {
  const { quotes, loading } = useContext(QuotesContext);
  const [currentQuote, setCurrentQuote] = useState<QuoteProps>();
  const [usedQuotes, setUsedQuotes] = useState<Set<number>>(new Set());
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!loading && quotes.length > 0) {
      showRandomQuote();
    }
  }, [loading, quotes]);

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
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.quoteContainer}>
          {loading ? <Text>Loading...</Text> : <Quote {...currentQuote!} />}
        </View>
        <View style={styles.episodeContainer}>
          <Text style={styles.name}>Homer J. Simpson</Text>
          <Text
            style={styles.ep}
          >{`Episode ${currentQuote?.episode} Season ${currentQuote?.season} Time ${currentQuote?.time}`}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.imageContainer}>
            <Image
              style={[
                styles.image,
                { width: size.width, height: undefined, aspectRatio: 0.92 },
              ]}
              source={require("../assets/images/HomerSimpson.png")}
            />
          </View>
          <View
            style={styles.actionsContainer}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              setSize({
                width: windowWidth - width,
                height,
              });
            }}
          >
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
  },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    resizeMode: "cover",
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
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  buttonText: {
    color: "white",
  },
  buttonTextPrimary: {
    color: "#F8659F",
    elevation: 3,
  },
  actionsContainer: {
    padding: 32,
    gap: 16,
    alignItems: "center",
  },
});
