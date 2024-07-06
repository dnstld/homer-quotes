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
import ViewShot from "react-native-view-shot";
import { Quote } from "../../components/Quote";
import {
  SetStateAction,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import QuotesContext from "../../context/quotes-context";

const windowWidth = Dimensions.get("window").width;

export default function ShareScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { quotes, loading } = useContext(QuotesContext);

  const [URI, setURI] = useState("");

  const viewShot = useRef(null);
  const quote = quotes.find((q) => q.id === id);

  const onImageLoad = useCallback(() => {
    onCapture();
  }, []);

  const onCapture = useCallback(() => {
    if (viewShot.current) {
      viewShot.current
        // @ts-ignore
        .capture()
        .then((uri: SetStateAction<string>) => setURI(uri));
    }
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
          })
          .catch((e) => console.warn(`Error: ${e.message} Code: ${e.code}`));
      } else {
        Sharing.shareAsync(URI, imageOptions)
          .then(() => console.log("Success"))
          .catch((e) => console.warn(`Error: ${e.message} Code: ${e.code}`));
      }
    } else {
      Sharing.shareAsync(URI, imageOptions)
        .then(() => console.log("Success"))
        .catch((e) => console.warn(`Error: ${e.message} Code: ${e.code}`));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Share" onPress={save} />,
    });
  }, [navigation, save]);

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}

      <ViewShot
        ref={viewShot}
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
              <Text style={styles.name}>Homer Quotes</Text>
              <Text style={styles.social}>@homerquotesapp</Text>
            </View>
          </View>
          <View style={styles.quoteContainer}>
            <Quote {...quote!} />
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerName}>Homer J. Simpson</Text>
            <Text
              style={styles.footerText}
            >{`Episode ${quote?.episode} Season ${quote?.season} Time ${quote?.time}`}</Text>
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
    padding: 16,
  },
  quoteContainer: {
    flex: 1,
    padding: 16,
  },
  avatar: {
    width: 48,
  },
  profile: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 8,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    padding: 16,
    alignItems: "center",
  },
  footerName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  footerText: {
    color: "white",
  },
  social: {
    color: "#fff",
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    padding: 16,
    gap: 32,
  },
});
