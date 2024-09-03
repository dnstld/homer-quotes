import { useEffect, useState, useCallback } from "react";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";
import { Alert, AppState, Linking, Platform } from "react-native";
import * as Notifications from "expo-notifications";

// import { usePushNotifications } from "./Notifications";

type NotificationSettings = Notifications.NotificationPermissionsStatus;

type UseNotificationSettingsReturn = [
  { authorized: boolean },
  () => void,
  NotificationSettings | undefined
];

export const useNotificationSettings = (): UseNotificationSettingsReturn => {
  const [settings, setSettings] = useState<NotificationSettings>();
  // const {
  //   expoPushToken,
  //   registerForPushNotifications,
  //   unregisterForPushNotifications,
  // } = usePushNotifications();

  useEffect(() => {
    const handleRegister = async () => {
      if (settings?.status === "denied") {
        Alert.alert("Settings status: denied");
        // if (expoPushToken) {
        //   unregisterForPushNotifications(expoPushToken);
        // }
      } else if (
        settings?.status === "granted" ||
        settings?.ios?.status ===
          Notifications.IosAuthorizationStatus.PROVISIONAL
      ) {
        // registerForPushNotifications();
        Alert.alert("Settings status: granted");
      }
    };

    const getSettings = async () => {
      try {
        const settings = await Notifications.getPermissionsAsync();
        Alert.alert("getSettings: settings ", JSON.stringify(settings));
        setSettings(settings);
      } catch (error) {
        // @ts-ignore
        Alert.alert("getSettings: error ", error.message);
        throw new Error(`Failed to get notification settings: ${error}`);
      } finally {
        handleRegister();
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

  const authorized =
    settings?.status === "granted" ||
    settings?.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;

  const open = useCallback(() => {
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
