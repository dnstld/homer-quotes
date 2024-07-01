import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  Button,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { gql, useQuery } from "@apollo/client";
import FlashMessage, { showMessage } from "react-native-flash-message";
import ViewShot from "react-native-view-shot";
import { Quote } from "../../components/quote";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

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

export default function ShareScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { data, loading, error } = useQuery(query);
  const quotes = data?.quotes?.data;

  const [URI, setURI] = useState("");

  const ref = useRef();

  const quote = quotes?.find(
    (quote: { id: string | undefined }) => quote.id === id
  );

  const onImageLoad = useCallback(() => {
    onCapture();
  }, []);

  const onCapture = useCallback(() => {
    // @ts-ignore
    ref.current.capture().then((uri) => setURI(uri));
  }, []);

  const imageOptions = {
    dialogTitle: "HomerQuotesApp",
    mimeType: "image/jpeg",
  };

  const save = async () => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(URI, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          imageOptions.dialogTitle,
          imageOptions.mimeType
        )
          .then(async (URI) => {
            await FileSystem.writeAsStringAsync(URI, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
            showMessage({
              message: `Success`,
              description: "This is the description",
              type: "default",
              backgroundColor: "#F8659F",
              color: "#fff",
            });
          })
          .catch((e) =>
            showMessage({
              message: `Error: ${e}`,
              description: "This is the description",
              type: "info",
            })
          );
      } else {
        Sharing.shareAsync(URI, imageOptions)
          .then(() =>
            showMessage({
              message: `Success`,
              description: "This is the description",
              type: "default",
              backgroundColor: "#F8659F",
              color: "#fff",
            })
          )
          .catch((e) =>
            showMessage({
              message: `Error: ${e}`,
              description: "This is the description",
              type: "info",
            })
          );
      }
    } else {
      Sharing.shareAsync(URI, imageOptions)
        .then(() =>
          showMessage({
            message: `Success`,
            description: "This is the description",
            type: "default",
            backgroundColor: "#F8659F",
            color: "#fff",
          })
        )
        .catch((e) =>
          showMessage({
            message: `Error: ${e}`,
            description: "This is the description",
            type: "info",
          })
        );
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Share" onPress={save} />,
    });
  }, [navigation, save]);

  if (error) return <Text>Error</Text>;

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}

      <ViewShot
        // @ts-ignore
        ref={ref}
        options={{
          fileName: imageOptions.dialogTitle,
          format: "jpg",
          quality: 1,
        }}
      >
        <View style={styles.frame}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.avatar}
              source={require("../../assets/images/HomerAvatar.png")}
              resizeMode="contain"
              onLoad={onImageLoad}
            />
            <View style={styles.profile}>
              <Text style={styles.name}>Homer J. Simpson</Text>
              <Text style={styles.social}>@homerquotesapp</Text>
            </View>
          </View>
          <View style={styles.quoteContainer}>
            <Quote quote={quote.quote} />
          </View>
        </View>
      </ViewShot>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
  },
  frame: {
    width: windowWidth,
    height: windowWidth,
    backgroundColor: "#00AAFF",
  },
  profileContainer: {
    flexDirection: "row",
    padding: 8,
  },
  quoteContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 32,
  },
  profile: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 8,
  },
  name: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  social: {
    color: "#fff",
    fontSize: 8,
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    padding: 16,
    gap: 32,
  },
});
