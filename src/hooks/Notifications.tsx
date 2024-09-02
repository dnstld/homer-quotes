import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { isDevice, modelName, osName, osVersion } from "expo-device";
import { db } from "../../firebaseConfig";
import { ref, set } from "firebase/database";

export interface PushNotificationState {
  notification?: Notifications.Notification;
  expoPushToken?: string;
  registerForPushNotifications: () => Promise<void>;
  unregisterForPushNotifications: (token: string | undefined) => Promise<void>;
}

export const usePushNotifications = (): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const saveDeviceToken = async (token: string) => {
    try {
      await set(ref(db, "tokens/" + token.replace(/[^\w\s]/gi, "")), {
        token: token,
        createdAt: new Date().toISOString(),
        modelName,
        osName,
        osVersion,
        env: Constants?.expoConfig?.extra?.env ?? Constants?.appOwnership,
      });
      setExpoPushToken(token);
    } catch (error) {
      throw new Error("Failed to save device token: " + error);
    }
  };

  const unregisterForPushNotifications = async (token: string | undefined) => {
    if (!token) return;
    try {
      await set(ref(db, "tokens/" + token.replace(/[^\w\s]/gi, "")), null);
    } catch (error) {
      throw new Error("Failed to remove device token: " + error);
    }
  };

  const registerForPushNotifications = async () => {
    try {
      if (!isDevice) {
        throw new Error("Must use physical device for push notifications");
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.log("* Permission not granted!");
        return;
      }

      const token = await Notifications.getExpoPushTokenAsync({
        projectId:
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId,
      });

      if (token?.data) {
        await saveDeviceToken(token.data);
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
        });
      }
    } catch (error) {
      throw new Error("Failed to register for push notifications: " + error);
    }
  };

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return {
    expoPushToken,
    notification,
    registerForPushNotifications,
    unregisterForPushNotifications,
  };
};
