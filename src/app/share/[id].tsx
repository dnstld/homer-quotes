import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as Clipboard from "expo-clipboard";
import { Quote } from "../../components/Quote";
import { Homer } from "../../components/Homer";
import React, { useContext, useRef, useState } from "react";
import QuotesContext from "../../context/quotes-context";
import HomerAvatarSvg from "../../components/HomerAvatarSvg";
import { Button } from "../../components/button";

const windowWidth = Dimensions.get("window").width;

export default function ShareScreen() {
  const { id } = useLocalSearchParams();
  const { quotes } = useContext(QuotesContext);
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [loading, setLoading] = useState(false);
  const viewShot = useRef(null);
  const quote = quotes.find((q) => q.id === id);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(
      `"${quote?.quote}" - Homer J. Simpson - S${quote?.season}:E${quote?.episode} ${quote?.name}`
    );
    setCopiedQuote(true);
  };

  const imageOptions = {
    dialogTitle: "HomerQuotesApp",
    mimeType: "image/png",
  };

  const saveAndShare = async () => {
    setLoading(true);
    try {
      const uri = await captureRef(viewShot, {
        fileName: imageOptions.dialogTitle,
        format: "png",
        quality: 0.9,
      });

      if (Platform.OS === "android") {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const fileUri =
            await FileSystem.StorageAccessFramework.createFileAsync(
              permissions.directoryUri,
              imageOptions.dialogTitle,
              imageOptions.mimeType
            );
          await FileSystem.writeAsStringAsync(fileUri, base64, {
            encoding: FileSystem.EncodingType.Base64,
          });
          await Sharing.shareAsync(fileUri, imageOptions);
        } else {
          await Sharing.shareAsync(uri, imageOptions);
        }
      } else {
        await Sharing.shareAsync(uri, imageOptions);
      }
    } catch (error) {
      throw new Error(`Failed to share: ${error}`);
      // Show user-friendly message or perform actions if sharing fails
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ViewShot ref={viewShot} style={styles.frame}>
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
      </ViewShot>
      <View style={styles.actionsContainer}>
        <Button
          icon={copiedQuote ? "checkmark" : "copy-outline"}
          variant="secondary"
          onPress={copyToClipboard}
          label={copiedQuote ? "Copied!" : "Copy"}
          border
        />
        <Button
          icon="share-outline"
          label="Share"
          loading={loading}
          onPress={saveAndShare}
          border
        />
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
    gap: 16,
    alignItems: "flex-end",
    elevation: 3,
    position: "absolute",
    right: 32,
    bottom: 32,
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
