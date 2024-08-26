import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Switch,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomerAvatarSvg from "../../components/HomerAvatarSvg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNotificationSettings } from "../../hooks/NotificationSettings";
import { usePushNotifications } from "../../hooks/Notifications";
import { usePermissions } from "../../hooks/Permissions";

export default function SettingsScreen() {
  const [{ authorized }, open] = useNotificationSettings();
  const { bottom } = useSafeAreaInsets();
  const { registerForPushNotifications } = usePushNotifications();
  const [granted] = usePermissions("notifications");

  const handleSettings = async () => {
    if (!granted && authorized === undefined) {
      registerForPushNotifications();
    } else {
      open();
    }
  };

  const openInstagram = async () => {
    const appUrl = "instagram://user?username=homerquotesapp";
    const webUrl = "https://www.instagram.com/homerquotesapp";

    try {
      const supportedApp = await Linking.canOpenURL(appUrl);

      if (supportedApp) {
        await Linking.openURL(appUrl);
      } else {
        const supportedWeb = await Linking.canOpenURL(webUrl);
        if (supportedWeb) {
          await Linking.openURL(webUrl);
        } else {
          Alert.alert(`Don't know how to open this URL: ${webUrl}`);
        }
      }
    } catch (error) {
      console.error("Error opening URL: ", error);
      Alert.alert("An error occurred", JSON.stringify(error));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.wrapper, { paddingBottom: bottom }]}>
        <TouchableOpacity style={styles.instagram} onPress={openInstagram}>
          <View style={styles.instagramContent}>
            <Text style={styles.instagramTitle}>
              Follow us at @homerquotesapp
            </Text>
            <Text>
              Enjoying our app? Stay connected and get more fun updates by
              following us on Instagram!
            </Text>
          </View>
          <Ionicons name="logo-instagram" size={32} />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>Controls</Text>

          {!authorized && (
            <TouchableOpacity onPress={handleSettings}>
              <View style={styles.notificationWarning}>
                <Ionicons name="warning-outline" size={48} color={"white"} />
                <View style={styles.notificationWarningContent}>
                  <Text style={styles.notificationWarningText}>
                    Enable push notifications for a dose of Homer’s humor. We’ll
                    send quotes occasionally to keep you smiling!
                  </Text>
                  <Text style={styles.notificationWarningButton}>
                    Tap to enable
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          <View style={styles.controls}>
            <View style={styles.control}>
              <View>
                <Text style={styles.controlTitle}>Push notifications</Text>
                <Text>Notifications designed to bring joy to your day</Text>
              </View>
              <Switch onValueChange={handleSettings} value={authorized} />
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.title}>About</Text>
          <View style={styles.about}>
            <Text>
              Explore funny Homer Simpson quotes from every season of The
              Simpsons. Share the fun and laughter with friends! D'oh!
            </Text>

            <View style={styles.note}>
              <HomerAvatarSvg style={styles.noteAvatar} />
              <View style={styles.noteContent}>
                <Text style={styles.noteText}>
                  This app is a fan-made project and is not affiliated with or
                  endorsed by the original creators or any associated companies.
                </Text>
              </View>
            </View>
            <Text>
              We've created this app to pay tribute to "The Simpsons,"
              celebrating its humor and heart. Although we don't own the rights
              to the characters or quotes, our app is dedicated to the show that
              has given us countless laughs and unforgettable moments. After
              watching 35 seasons and 768 episodes, spanning more than 1765
              hours of pure joy, we hope to bring the show's spirit to fans
              everywhere
            </Text>
            <Text>
              We thank Matt Groening, "The Simpsons" creators, and Disney Plus
              for keeping the series accessible. This app wouldn't be possible
              without "The Simpsons" inspiration and joy.
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Developed and maintained by Denis Toledo | 2024
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    padding: 16,
  },
  wrapper: {
    gap: 24,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  instagram: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  instagramContent: {
    flex: 1,
  },
  instagramTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  notificationWarning: {
    flexDirection: "row",
    gap: 16,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F8659F",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  notificationWarningContent: {
    flex: 1,
    gap: 8,
  },
  notificationWarningText: {
    color: "white",
  },
  notificationWarningButton: {
    color: "white",
    fontWeight: "bold",
  },
  controls: {
    gap: 8,
  },
  control: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  controlTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  about: {
    gap: 16,
  },
  note: {
    flex: 1,
    backgroundColor: "#00AAFF",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  noteAvatar: {
    width: 48,
    height: 48,
  },
  noteContent: {
    flex: 1,
  },
  noteText: {
    color: "white",
  },
  footer: {
    textAlign: "center",
    fontStyle: "italic",
  },
});
