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
import HomerAvatarSvg from "../../components/HomerAvatarSvg";
import HomerSvg from "../../components/HomerSvg";

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
            <HomerAvatarSvg style={styles.avatar} />
            <View style={styles.profile}>
              <Text style={styles.title}>Homer Quotes</Text>
              <Text style={styles.subtitle}>@homerquotesapp</Text>
            </View>
          </View>

          <View style={styles.quoteContainer}>
            <Quote {...quote!} />
          </View>

          <View style={styles.footerContainer}>
            <HomerSvg style={styles.image} sm={true} />
            <View style={styles.footer}>
              <Text style={styles.footerName}>Homer J. Simpson</Text>
              <Text
                style={styles.footerText}
                numberOfLines={0}
              >{`S${quote?.season}:E${quote?.episode} ${quote?.name}`}</Text>
            </View>
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
    gap: 8,
  },
  avatar: {
    width: 48,
    height: 48,
  },
  profile: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#fff",
    marginTop: 2,
  },
  quoteContainer: {
    flex: 1,
    padding: 16,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 200,
    gap: 16,
  },
  imageContainer: {
    minHeight: 184,
  },
  image: {
    minHeight: 184,
  },
  footer: {
    paddingRight: 16,
  },
  footerName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  footerText: {
    fontSize: 10,
    color: "white",
  },
});
