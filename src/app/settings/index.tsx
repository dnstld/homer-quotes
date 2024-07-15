import { useState } from "react";
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
import { usePermissions } from "../../hooks/Permissions";
import HomerAvatarSvg from "../../components/HomerAvatarSvg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [granted, tooglePermission] = usePermissions("notifications");
  const { bottom } = useSafeAreaInsets();

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    tooglePermission();
  };

  const openInstagram = async () => {
    const appUrl = "instagram://user?username=homerquotesapp";
    const webUrl = "https://www.instagram.com/homerquotesapp";
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
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.wrapper, { paddingBottom: bottom }]}>
        <TouchableOpacity style={styles.control} onPress={openInstagram}>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemTitle}>Follow us at @homerquotesapp</Text>
            <Text>
              Love our app? Stay connected and get more fun updates by following
              us on Instagram!
            </Text>
          </View>
          <Ionicons name="logo-instagram" size={32} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Controls</Text>

          {granted && (
            <TouchableOpacity onPress={toggleSwitch}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 16,
                  flex: 1,
                  alignItems: "center",
                  backgroundColor: "#F8659F",
                  padding: 16,
                  borderRadius: 8,
                  marginBottom: 16,
                }}
              >
                <Ionicons name="warning-outline" size={48} color={"white"} />
                <View style={{ flex: 1, gap: 8 }}>
                  <Text style={{ color: "white" }}>
                    Enable push notifications for a dose of Homer’s humor. We’ll
                    send quotes occasionally to keep you smiling!
                  </Text>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Tap to enable
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          <View style={styles.controls}>
            <View style={styles.control}>
              <View>
                <Text style={styles.itemTitle}>Push notifications</Text>
                <Text>Notifications designed to bring joy to your day</Text>
              </View>
              <Switch onValueChange={toggleSwitch} value={isEnabled} />
            </View>
          </View>
        </View>

        <View>
          <View>
            <Text style={styles.title}>About</Text>
            <View
              style={{
                flex: 1,
                backgroundColor: "#00AAFF",
                padding: 16,
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 16,
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <HomerAvatarSvg style={styles.avatar} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "white" }}>
                    This app is a fan-made project and is not affiliated with or
                    endorsed by Matt Groening, Gracie Films, 20th Television, or
                    Disney Plus.
                  </Text>
                </View>
              </View>
            </View>
            <Text>
              Homer Quotes App, your go-to source for daily laughter and wisdom
              from everyone's favorite animated dad, Homer Simpson! As lifelong
              "The Simpsons" fans, we've poured our love for the show into this
              app to bring you the funniest and most memorable quotes from Homer
              J. Simpson.
            </Text>
          </View>

          <View style={styles.dashboard}>
            <View style={styles.dashboardItem}>
              <Text style={styles.dashboardData}>35</Text>
              <Text style={styles.dashboardName}>seasons</Text>
            </View>
            <View style={styles.dashboardItem}>
              <Text style={styles.dashboardData}>768</Text>
              <Text style={styles.dashboardName}>episodes</Text>
            </View>
            <View style={styles.dashboardItem}>
              <Text style={styles.dashboardData}>1765</Text>
              <Text style={styles.dashboardName}>quotes</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.title}>Our Vision</Text>
          <Text>
            As fans who have watched every episode of "The Simpsons" on Disney
            Plus, we wanted to create an app that celebrates the humor and heart
            of the series. While we don't own the rights to the characters or
            quotes, we've developed this app as a tribute to the show that has
            given us countless laughs and unforgettable moments.
          </Text>
        </View>

        <View>
          <Text style={styles.title}>Acknowledgments</Text>
          <Text>
            We extend our heartfelt thanks to Matt Groening, the creative minds
            behind "The Simpsons," and Disney Plus for keeping the series
            accessible to fans. This app wouldn't be possible without the
            inspiration and joy "The Simpsons" has brought into our lives.
          </Text>
        </View>

        <Text>Developed by Denis Toledo.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
  },
  dashboard: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 16,
  },
  dashboardItem: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    flex: 1,
  },
  dashboardData: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dashboardName: {
    fontSize: 12,
    color: "#767577",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    padding: 16,
  },
  wrapper: {
    gap: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemTitle: {
    fontWeight: "bold",
    marginBottom: 4,
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
});
