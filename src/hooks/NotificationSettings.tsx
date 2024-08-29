import { useEffect, useState } from "react";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";
import { AppState, Linking, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { usePermissions } from "./Permissions";
import { usePushNotifications } from "./Notifications";

type NotificationSettings = Notifications.NotificationPermissionsStatus;

type UseNotificationSettingsReturn = [
  { authorized: boolean | undefined },
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
  const [_, togglePermission] = usePermissions("notifications");

  useEffect(() => {
    const getSettings = async () => {
      const settings = await Notifications.getPermissionsAsync();
      setSettings(settings);
    };
    getSettings();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        getSettings();
      }
    });

    return () => subscription.remove();
  }, []);

  const authorized = settings
    ? settings?.granted ||
      settings?.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    : undefined;

  if (authorized) {
    registerForPushNotifications();
    togglePermission(true);
  }

  if (authorized === false) {
    unregisterForPushNotifications(expoPushToken);
  }

  const open = () => {
    // track: open notification settings
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      startActivityAsync(ActivityAction.NOTIFICATION_SETTINGS);
    }
  };

  return [{ authorized }, open, settings];
};
