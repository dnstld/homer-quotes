import { useEffect, useState, useCallback } from "react";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";
import { Alert, AppState, Linking, Platform } from "react-native";
import * as Notifications from "expo-notifications";

import { usePushNotifications } from "./PushNotifications";

type NotificationSettings = Notifications.NotificationPermissionsStatus;

type UseNotificationSettingsReturn = [
  { authorized: boolean },
  () => void,
  NotificationSettings | undefined
];

export const useNotificationSettings = (): UseNotificationSettingsReturn => {
  const [settings, setSettings] = useState<NotificationSettings>();
  const [authorized, setAuthorized] = useState<boolean>(false);
  const { expoPushToken, registerAndSendNotification } = usePushNotifications();

  useEffect(() => {
    const getSettings = async () => {
      try {
        const settings = await Notifications.getPermissionsAsync();
        setSettings(settings);
      } catch (error) {
        throw new Error(`Failed to get notification settings: ${error}`);
      } finally {
        setAuthorized(!!settings?.granted);
      }
    };

    getSettings();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        getSettings();
      }
    });

    return () => {
      if (subscription && typeof subscription.remove === "function") {
        subscription.remove();
      }
    };
  }, []);

  // Alert.alert(
  //   "Notification Settings",
  //   `authorized : ${authorized} expoPushToken : ${expoPushToken}`
  // );

  // if (authorized && expoPushToken) {
  //   saveDeviceToken(expoPushToken);
  // }

  // if (!authorized && expoPushToken) {
  //   unregisterForPushNotifications(expoPushToken);
  // }

  const open = useCallback(() => {
    Alert.alert(
      "Open otification Settings",
      `status : ${settings?.status} - token : ${expoPushToken}`
    );
    if (!settings?.status) {
      registerAndSendNotification();
      return;
    }

    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      try {
        startActivityAsync(ActivityAction.NOTIFICATION_SETTINGS);
      } catch (error) {
        throw new Error(`Failed to open notification settings: ${error}`);
      }
    }
  }, []);

  return [{ authorized }, open, settings];
};
