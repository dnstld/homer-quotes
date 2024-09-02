import { useEffect, useState, useCallback } from "react";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";
import { AppState, Linking, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { usePushNotifications } from "./Notifications";

type NotificationSettings = Notifications.NotificationPermissionsStatus;

type UseNotificationSettingsReturn = [
  { authorized: boolean },
  () => void,
  NotificationSettings | undefined
];

export const useNotificationSettings = (): UseNotificationSettingsReturn => {
  const [settings, setSettings] = useState<NotificationSettings>();
  const {
    expoPushToken,
    registerForPushNotifications,
    unregisterForPushNotifications,
  } = usePushNotifications();

  useEffect(() => {
    const getSettings = async () => {
      try {
        const settings = await Notifications.getPermissionsAsync();
        setSettings(settings);
      } catch (error) {
        throw new Error(`Failed to get notification settings: ${error}`);
      }
    };

    getSettings();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        getSettings();
      }
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (settings?.status === "denied") {
      if (expoPushToken) {
        unregisterForPushNotifications(expoPushToken);
      }
    } else if (
      settings?.status === "granted" ||
      settings?.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    ) {
      registerForPushNotifications();
    }
  }, [
    settings,
    expoPushToken,
    registerForPushNotifications,
    unregisterForPushNotifications,
  ]);

  const authorized =
    settings?.status === "granted" ||
    settings?.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;

  const open = useCallback(() => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      startActivityAsync(ActivityAction.NOTIFICATION_SETTINGS);
    }
  }, []);

  return [{ authorized }, open, settings];
};
