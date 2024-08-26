import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import ViewShot from "react-native-view-shot";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import { Quote } from "../../components/Quote";
import { Homer } from "../../components/Homer";
import {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import QuotesContext from "../../context/quotes-context";
import HomerAvatarSvg from "../../components/HomerAvatarSvg";

const windowWidth = Dimensions.get("window").width;

export default function ShareScreen() {
  const { id } = useLocalSearchParams();
  const { quotes } = useContext(QuotesContext);
  const [copiedQuote, setCopiedQuote] = useState(false);

  const [URI, setURI] = useState("");

  const viewShot = useRef(null);
  const quote = quotes.find((q) => q.id === id);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(
      `"${quote?.quote}" - Homer J. Simpson S${quote?.season}:E${quote?.episode} ${quote?.name}`
    );
    setCopiedQuote(true);
  };

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
    mimeType: "image/png",
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

  useEffect(() => {
    onCapture();
  }, []);

  return (
    <View style={styles.container}>
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
            <Homer share />
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
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={copyToClipboard}>
          <View style={styles.copyButton}>
            {copiedQuote ? (
              <>
                <Ionicons name="checkmark" size={24} />
                <Text>Copied!</Text>
              </>
            ) : (
              <>
                <Ionicons name="copy-outline" size={24} />
                <Text>Copy</Text>
              </>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={save}>
          <View style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="white" />
            <Text style={styles.shareButtonText}>Share</Text>
          </View>
        </TouchableOpacity>
      </View>
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
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    gap: 16,
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#00AAFF",
    borderRadius: 8,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    backgroundColor: "#F8659F",
    borderRadius: 8,
    flexGrow: 1,
  },
  shareButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
