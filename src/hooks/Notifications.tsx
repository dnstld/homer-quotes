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
  registerForPushNotifications: () => void;
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

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const saveDeviceToken = async (token: string) => {
    setExpoPushToken(token);
    set(ref(db, "tokens/" + token.replace(/[^\w\s]/gi, "")), {
      token: token,
      createdAt: new Date().toISOString(),
      modelName,
      osName,
      osVersion,
      env: Constants?.expoConfig?.extra?.env ?? Constants?.appOwnership,
    });
  };

  const unregisterForPushNotifications = async (token: string) => {
    set(ref(db, "tokens/" + token.replace(/[^\w\s]/gi, "")), null);
  };

  const registerForPushNotifications = async () => {
    let token;
    if (isDevice) {
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

      token = await Notifications.getExpoPushTokenAsync({
        projectId:
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId,
      });

      saveDeviceToken(token.data);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      return token;
    } else {
      throw new Error("Must use physical device for push notifications");
    }
  };

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) =>
        setNotification(notification)
      );

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  return {
    expoPushToken,
    notification,
    registerForPushNotifications,
    unregisterForPushNotifications,
  };
};
