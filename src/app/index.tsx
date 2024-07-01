import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Image,
} from "react-native";

import { gql, useQuery } from "@apollo/client";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Quote } from "../components/quote";

const query = gql`
  query quotes {
    quotes @rest(type: "Quote", path: "/") {
      id
      data {
        id
        season
        episode
        time
        name
        quote
      }
    }
  }
`;

const windowWidth = Dimensions.get("window").width;

export default function IndexScreen() {
  const { data, loading, error } = useQuery(query);
  const [size, setSize] = useState({ width: 0, height: 0 });

  if (error) return <Text>Error</Text>;
  if (!data) return <Text>No data</Text>;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {loading && <Text>Loading...</Text>}

      <View style={styles.quoteContainer}>
        <Quote quote={data.quotes.data[2].quote} />
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
              params: { id: `${data.quotes.data[2].id}` },
            }}
            asChild
          >
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>
                <Ionicons name="share-outline" size={32} />
              </Text>
            </Pressable>
          </Link>
          <Pressable style={[styles.button, styles.buttonPrimary]}>
            <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
              <Ionicons name="refresh-outline" size={48} />
            </Text>
          </Pressable>
          <Link href={"quotes"} asChild>
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
