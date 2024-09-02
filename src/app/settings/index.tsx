import React, { useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Switch,
  Linking,
  Alert,
  TouchableOpacity,
  Animated,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomerAvatarSvg from "../../components/HomerAvatarSvg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNotificationSettings } from "../../hooks/NotificationSettings";
import HomerSvg from "../../components/HomerSvg";
import { useFocusEffect } from "@react-navigation/native";
import useSettingsAnimation from "./hooks";

export default function SettingsScreen() {
  const [{ authorized }, open] = useNotificationSettings();
  const { bottom } = useSafeAreaInsets();
  const { slideAnim, rotateInterpolate, startAnimations } =
    useSettingsAnimation();

  const openInstagram = async () => {
    const appUrl = "instagram://user?username=homerquotesapp";

    try {
      const supported = await Linking.canOpenURL(appUrl);
      if (supported) {
        await Linking.openURL(appUrl);
      } else {
        Alert.alert(
          "Instagram app is not installed or supported on this device."
        );
      }
    } catch (error) {
      throw new Error(`Failed to open Instagram: ${error}`);
    }
  };

  useFocusEffect(
    useCallback(() => {
      startAnimations();
    }, [startAnimations])
  );

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
            <TouchableOpacity onPress={open}>
              <View style={styles.notificationWarning}>
                <Ionicons name="warning-outline" size={48} color="white" />
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
            <Animated.View
              style={[
                styles.homer,
                {
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <HomerSvg />
            </Animated.View>
            <View style={styles.control}>
              <Animated.View
                style={[
                  styles.controlView,
                  {
                    transform: [
                      { rotate: rotateInterpolate },
                      { perspective: 1000 },
                    ],
                  },
                ]}
              >
                <View>
                  <Text style={styles.controlTitle}>Push notifications</Text>
                  <Text>Notifications designed to bring joy to your day</Text>
                </View>
              </Animated.View>
              <Switch onValueChange={open} value={authorized} />
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
              everywhere.
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
    paddingLeft: 109 + 24,
  },
  controlView: {
    flex: 1,
    marginRight: 16,
  },
  controlTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  about: {
    gap: 16,
  },
  note: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00AAFF",
    padding: 16,
    borderRadius: 8,
    gap: 16,
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
  homer: {
    position: "absolute",
    bottom: 0,
    left: 16,
    zIndex: 1,
  },
  footer: {
    textAlign: "center",
    fontStyle: "italic",
  },
});
